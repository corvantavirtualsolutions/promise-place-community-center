import { AT_COOKIE, RT_COOKIE, cookieOptions } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Answers with a redirect, not JSON: the sign-out control is a plain <form>
   POST so that it still works with JavaScript disabled, and a JSON body would
   leave the browser staring at `{"ok":true}`. */
export async function POST(req) {
  const out = new Response(null, {
    status: 303,
    headers: { Location: new URL("/admin", req.url).toString() },
  });
  for (const name of [AT_COOKIE, RT_COOKIE]) {
    const bits = [`${name}=`, `Path=${cookieOptions.path}`, "Max-Age=0", "SameSite=Lax", "HttpOnly"];
    if (cookieOptions.secure) bits.push("Secure");
    out.headers.append("Set-Cookie", bits.join("; "));
  }
  return out;
}
