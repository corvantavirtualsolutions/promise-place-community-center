"use client";

import { useMemo, useState } from "react";

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

export default function AdminTable({ rows: initial }) {
  const [rows, setRows] = useState(initial);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [saving, setSaving] = useState("");
  const [error, setError] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!q) return true;
      return [r.first_name, r.last_name, r.email, r.phone, r.topic, r.message]
        .filter(Boolean).join(" ").toLowerCase().includes(q);
    });
  }, [rows, filter, query]);

  const counts = useMemo(() => {
    const c = { all: rows.length, new: 0, in_progress: 0, closed: 0 };
    rows.forEach((r) => { c[r.status] = (c[r.status] || 0) + 1; });
    return c;
  }, [rows]);

  async function patch(id, body) {
    setSaving(id);
    setError("");
    // optimistic: the list updates immediately and rolls back only on failure
    const before = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...body.local } : r)));
    try {
      const res = await fetch("/api/admin/submission", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...body.remote }),
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

  return (
    <div className="admin">
      <div className="admin__bar">
        <div className="admin__filters" role="group" aria-label="Filter by status">
          {[{ value: "all", label: "All" }, ...STATUSES].map((s) => (
            <button
              key={s.value}
              type="button"
              aria-pressed={filter === s.value}
              onClick={() => setFilter(s.value)}
            >
              {s.label} <b>{counts[s.value] || 0}</b>
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

      {error && <div className="form__error" role="alert"><p>{error}</p></div>}

      {shown.length === 0 ? (
        <p className="admin__empty">
          {rows.length === 0
            ? "No inquiries yet. Anything sent through the contact form will appear here."
            : "No inquiries match that filter."}
        </p>
      ) : (
        <ul className="admin__list">
          {shown.map((r) => {
            const open = openId === r.id;
            return (
              <li key={r.id} className={`arow arow--${r.status}`}>
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
                    </span>
                  </button>

                  <select
                    className="arow__status"
                    value={r.status}
                    disabled={saving === r.id}
                    aria-label={`Status for ${r.first_name} ${r.last_name}`}
                    onChange={(e) =>
                      patch(r.id, {
                        local: { status: e.target.value },
                        remote: { status: e.target.value },
                      })
                    }
                  >
                    {STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                {open && (
                  <div className="arow__body">
                    <dl>
                      <div><dt>Email</dt><dd><a href={`mailto:${r.email}`}>{r.email}</a></dd></div>
                      <div><dt>Phone</dt><dd>{r.phone ? <a href={`tel:${r.phone}`}>{r.phone}</a> : "Not provided"}</dd></div>
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
                          patch(r.id, { local: { staff_notes: v }, remote: { staffNotes: v } });
                        }}
                      />
                    </label>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
