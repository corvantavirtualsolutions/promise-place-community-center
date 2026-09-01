import { requireAdmin, supabaseBase } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES = ["new", "in_progress", "closed"];

/* Updates one submission's status or staff notes. Gated by requireAdmin() —
   the same check the page uses — because a route that only *looks* like it sits
   behind a dashboard is not protected at all. */
export async function PATCH(req) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Not authorised." }, { status: 401 });

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const id = String(body.id || "").trim();
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return Response.json({ error: "Unknown submission." }, { status: 400 });
  }

  const patch = {};
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) {
      return Response.json({ error: "Unknown status." }, { status: 400 });
    }
    patch.status = body.status;
  }
  if (body.staffNotes !== undefined) {
    patch.staff_notes = String(body.staffNotes).slice(0, 4000) || null;
  }
  if (!Object.keys(patch).length) {
    return Response.json({ error: "Nothing to update." }, { status: 400 });
  }

  const base = supabaseBase();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const res = await fetch(
    `${base}/rest/v1/contact_submissions?id=eq.${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(patch),
      cache: "no-store",
    },
  );
  if (!res.ok) {
    console.error("[admin] update failed:", res.status, await res.text());
    return Response.json({ error: "Couldn't save that change." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
