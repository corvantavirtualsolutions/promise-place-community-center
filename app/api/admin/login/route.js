import { AT_COOKIE, RT_COOKIE, cookieOptions, supabaseBase, isAllowed } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Deliberately one generic message for every failure — wrong password, unknown
   address, or an address that exists but isn't the allowed one. Distinguishing
   them would tell an attacker which half they got right. */
const GENERIC = "That email and password combination isn't right.";

function serialize(name, value, maxAge) {
  const bits = [
    `${name}=${encodeURIComponent(value)}`,
    `Path=${cookieOptions.path}`,
    `Max-Age=${maxAge}`,
    "SameSite=Lax",
    "HttpOnly",
  ];
  if (cookieOptions.secure) bits.push("Secure");
  return bits.join("; ");
}

export async function POST(req) {
  const base = supabaseBase();
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!base || !anon || !process.env.ADMIN_EMAIL) {
    return Response.json({ error: "Admin sign-in isn't configured yet." }, { status: 503 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: GENERIC }, { status: 400 });
  }

  const email = String(body.email || "").trim().slice(0, 254);
  const password = String(body.password || "").slice(0, 200);
  if (!email || !password) return Response.json({ error: GENERIC }, { status: 400 });

  /* Checked before the request even goes out, so a wrong address can't be used
     to probe Supabase for which accounts exist. */
  if (!isAllowed(email)) return Response.json({ error: GENERIC }, { status: 401 });

  const res = await fetch(`${base}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: anon, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data.access_token) {
    return Response.json({ error: GENERIC }, { status: 401 });
  }
  // belt and braces: confirm the account Supabase returned is the allowed one
  if (!isAllowed(data.user?.email)) {
    return Response.json({ error: GENERIC }, { status: 401 });
  }

  const out = Response.json({ ok: true });
  out.headers.append("Set-Cookie", serialize(AT_COOKIE, data.access_token, data.expires_in || 3600));
  if (data.refresh_token) {
    out.headers.append("Set-Cookie", serialize(RT_COOKIE, data.refresh_token, 60 * 60 * 24 * 30));
  }
  return out;
}
