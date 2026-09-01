"use client";

import { useMemo, useState } from "react";
import LogoMark from "@/components/LogoMark";

const STATUSES = [
  { value: "new", label: "New" },
  { value: "in_progress", label: "In progress" },
  { value: "closed", label: "Closed" },
];

function when(iso) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: "numeric", month: "short", day: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}

export default function AdminTable({ rows: initial, email }) {
  const [rows, setRows] = useState(initial);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [saving, setSaving] = useState("");
  const [error, setError] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const archived = !!r.archived_at;
      // the archive is its own view; every other filter shows active inquiries
      if (filter === "archived" ? !archived : archived) return false;
      if (filter !== "all" && filter !== "archived" && r.status !== filter) return false;
      if (!q) return true;
      return [r.first_name, r.last_name, r.email, r.phone, r.topic, r.message]
        .filter(Boolean).join(" ").toLowerCase().includes(q);
    });
  }, [rows, filter, query]);

  const counts = useMemo(() => {
    const c = { all: 0, new: 0, in_progress: 0, closed: 0, archived: 0 };
    rows.forEach((r) => {
      if (r.archived_at) { c.archived += 1; return; }
      c.all += 1;
      c[r.status] = (c[r.status] || 0) + 1;
    });
    return c;
  }, [rows]);

  async function patch(id, local, remote) {
    setSaving(id);
    setError("");
    // optimistic: the list updates immediately and rolls back only on failure
    const before = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...local } : r)));
    try {
      const res = await fetch("/api/admin/submission", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...remote }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setRows(before);
        setError(d.error || "Couldn't save that change.");
      }
    } catch {
      setRows(before);
      setError("Couldn't reach the server.");
    } finally {
      setSaving("");
    }
  }

  const archive = (r) => {
    setOpenId(null);
    patch(r.id, { archived_at: new Date().toISOString() }, { archived: true });
  };
  const restore = (r) => patch(r.id, { archived_at: null }, { archived: false });

  const TABS = [
    { value: "all", label: "All" },
    ...STATUSES,
    { value: "archived", label: "Archived" },
  ];

  return (
    <>
      {/* Stays put while the list scrolls: with a long list, the filters and the
          way out are the two things you always want within reach. */}
      <header className="abar">
        <div className="abar__top">
          <div className="abar__brand">
            <LogoMark size={34} />
            <div>
              <strong>Website inquiries</strong>
              <span>{email}</span>
            </div>
          </div>
          <form action="/api/admin/logout" method="post">
            <button className="btn btn-secondary" type="submit">Sign out</button>
          </form>
        </div>

        <div className="abar__controls">
          <div className="admin__filters" role="group" aria-label="Filter inquiries">
            {TABS.map((t) => (
              <button
                key={t.value}
                type="button"
                aria-pressed={filter === t.value}
                onClick={() => setFilter(t.value)}
              >
                {t.label} <b>{counts[t.value] || 0}</b>
              </button>
            ))}
          </div>
          <input
            className="admin__search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email or message…"
            aria-label="Search inquiries"
          />
        </div>
      </header>

      <div className="admin">
        {error && <div className="form__error" role="alert"><p>{error}</p></div>}

        {shown.length === 0 ? (
          <p className="admin__empty">
            {filter === "archived"
              ? "Nothing archived."
              : rows.length === 0
                ? "No inquiries yet. Anything sent through the contact form will appear here."
                : "No inquiries match that filter."}
          </p>
        ) : (
          <ul className="admin__list">
            {shown.map((r) => {
              const open = openId === r.id;
              const archived = !!r.archived_at;
              return (
                <li key={r.id} className={`arow arow--${archived ? "archived" : r.status}`}>
                  <div className="arow__head">
                    <button
                      type="button"
                      className="arow__toggle"
                      aria-expanded={open}
                      onClick={() => setOpenId(open ? null : r.id)}
                    >
                      <span className="arow__name">{r.first_name} {r.last_name}</span>
                      <span className="arow__meta">
                        {r.topic || "General"} · {when(r.created_at)}
                        {archived && ` · archived ${when(r.archived_at)}`}
                      </span>
                    </button>

                    {archived ? (
                      <button
                        className="btn btn-secondary arow__action"
                        type="button"
                        disabled={saving === r.id}
                        onClick={() => restore(r)}
                      >
                        Unarchive
                      </button>
                    ) : (
                      <select
                        className="arow__status"
                        value={r.status}
                        disabled={saving === r.id}
                        aria-label={`Status for ${r.first_name} ${r.last_name}`}
                        onChange={(e) => patch(r.id, { status: e.target.value }, { status: e.target.value })}
                      >
                        {STATUSES.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  {open && (
                    <div className="arow__body">
                      <dl>
                        <div>
                          <dt>Email</dt>
                          <dd><a href={`mailto:${r.email}`}>{r.email}</a></dd>
                        </div>
                        <div>
                          <dt>Phone</dt>
                          <dd>{r.phone ? <a href={`tel:${r.phone}`}>{r.phone}</a> : "Not provided"}</dd>
                        </div>
                        <div><dt>Seeking for</dt><dd>{r.seeking_for || "—"}</dd></div>
                        <div><dt>Prefers</dt><dd>{r.preferred_contact || "—"}</dd></div>
                      </dl>

                      <h3>Message</h3>
                      <p className="arow__message">{r.message}</p>

                      <label className="arow__notes">
                        <span>Staff notes</span>
                        <textarea
                          defaultValue={r.staff_notes || ""}
                          rows={3}
                          placeholder="Notes for your team — saved when you click away."
                          onBlur={(e) => {
                            const v = e.target.value;
                            if (v === (r.staff_notes || "")) return;
                            patch(r.id, { staff_notes: v }, { staffNotes: v });
                          }}
                        />
                      </label>

                      <div className="arow__footer">
                        {archived ? (
                          <button className="btn btn-secondary" type="button" onClick={() => restore(r)}>
                            Unarchive
                          </button>
                        ) : (
                          <button className="arow__archive" type="button" onClick={() => archive(r)}>
                            Delete (moves to Archived)
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
