import { cookies } from "next/headers";

/* Admin session handling, done against Supabase Auth's REST API directly so the
   project keeps its zero-dependency rule.

   Two separate keys are in play and mixing them up is the easy mistake:
     - ANON key  → used for /auth/v1/* (signing in, verifying a token)
     - SERVICE   → used for /rest/v1/* (reading the table, which RLS blocks)
   Neither is ever sent to the browser. */

export const AT_COOKIE = "pp_admin_at";
export const RT_COOKIE = "pp_admin_rt";

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export function supabaseBase() {
  return (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
}

export function allowedEmail() {
  return (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
}

/* The allowlist is the whole security model for who gets in, so it is checked
   at sign-in AND again on every page load. A Supabase project could gain
   another user later — through the dashboard, or an open sign-up setting — and
   that must never be enough to see these submissions. */
export function isAllowed(email) {
  const allow = allowedEmail();
  return !!allow && !!email && email.trim().toLowerCase() === allow;
}

/* Verifies an access token with Supabase and returns the user, or null.
   Never trust the cookie's contents alone — this asks Supabase every time. */
export async function userFromToken(accessToken) {
  const base = supabaseBase();
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!base || !anon || !accessToken) return null;

  const res = await fetch(`${base}/auth/v1/user`, {
    headers: { apikey: anon, Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const user = await res.json().catch(() => null);
  return user && user.email ? user : null;
}

/* The gate every admin page and admin API route runs through. */
export async function requireAdmin() {
  const jar = await cookies();
  const token = jar.get(AT_COOKIE)?.value;
  const user = await userFromToken(token);
  if (!user || !isAllowed(user.email)) return null;
  return user;
}
