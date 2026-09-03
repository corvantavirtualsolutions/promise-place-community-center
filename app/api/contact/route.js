import { createHash } from "node:crypto";
import { mailgunConfig, canAutoReplyTo, sendMail } from "@/lib/mailgun";
import { autoReply, staffNotification } from "@/lib/contactEmails";

/* Contact form endpoint.

   Everything here runs on the server so the Supabase service role key — which
   bypasses row-level security — never reaches the browser. The client posts
   JSON; this route validates it, saves it, and emails the clinic.

   After a successful save two emails go out through Mailgun: a confirmation to
   the visitor, and a copy to the clinic. Both are BEST EFFORT and deliberately
   cannot fail the request — the inquiry is already in the database by then, and
   telling someone their message failed when it did not would be worse than a
   missed email. If Mailgun is not configured, nothing is attempted.

   The mailto: fallback on the client still matters: it is the only safety net
   when the database itself is unreachable, which is what the 502 below drives. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TABLE = "contact_submissions";
const RATE_WINDOW_MIN = 10;
const RATE_MAX = 3;             // submissions per IP per window

const LIMITS = {
  firstName: 100, lastName: 100, email: 254, phone: 40,
  seekingFor: 120, topic: 160, preferred: 40, message: 5000,
};

const clean = (v, max) => String(v ?? "").trim().slice(0, max);
const looksLikeEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function clientIp(req) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function hashIp(ip) {
  const salt = process.env.IP_HASH_SALT || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function supabaseHeaders(key) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

/* Counts recent submissions from the same hashed IP. Done in the database
   rather than in memory because each serverless invocation may be a fresh
   instance — an in-memory counter would reset constantly and catch nothing. */
async function overRateLimit(base, key, ipHash) {
  const since = new Date(Date.now() - RATE_WINDOW_MIN * 60_000).toISOString();
  const url =
    `${base}/rest/v1/${TABLE}?select=id&ip_hash=eq.${encodeURIComponent(ipHash)}` +
    `&created_at=gte.${encodeURIComponent(since)}&limit=${RATE_MAX}`;
  const res = await fetch(url, { headers: supabaseHeaders(key), cache: "no-store" });
  if (!res.ok) return false;              // never block a real person on a lookup failure
  const rows = await res.json();
  return Array.isArray(rows) && rows.length >= RATE_MAX;
}

async function saveToSupabase(base, key, row) {
  const res = await fetch(`${base}/rest/v1/${TABLE}`, {
    method: "POST",
    headers: { ...supabaseHeaders(key), Prefer: "return=minimal" },
    body: JSON.stringify(row),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  /* Honeypot: a field positioned off-screen that no person can see or tab to.
     Bots fill every input they find, so anything in here is automated. Answer
     200 rather than an error — a bot that gets an error retries. */
  if (clean(body.company, 100)) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const first = clean(body.firstName, LIMITS.firstName);
  const last = clean(body.lastName, LIMITS.lastName);
  const email = clean(body.email, LIMITS.email);
  const message = clean(body.message, LIMITS.message);

  const missing = [];
  if (!first) missing.push("first name");
  if (!last) missing.push("last name");
  if (!email) missing.push("email");
  if (!message) missing.push("message");
  if (missing.length) {
    return Response.json(
      { error: `Please fill in your ${missing.join(", ")}.` },
      { status: 400 },
    );
  }
  if (!looksLikeEmail(email)) {
    return Response.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  const base = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const ipHash = hashIp(clientIp(req));

  const row = {
    first_name: first,
    last_name: last,
    email,
    phone: clean(body.phone, LIMITS.phone) || null,
    seeking_for: clean(body.seekingFor, LIMITS.seekingFor) || null,
    topic: clean(body.topic, LIMITS.topic) || null,
    preferred_contact: clean(body.preferred, LIMITS.preferred) || null,
    message,
    ip_hash: ipHash,
    user_agent: clean(req.headers.get("user-agent"), 400) || null,
  };

  if (base && key && (await overRateLimit(base, key, ipHash))) {
    return Response.json(
      { error: "You've sent a few messages already. Please email us directly instead." },
      { status: 429 },
    );
  }

  if (!base || !key) {
    console.error("[contact] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set");
    return Response.json(
      { error: "We couldn't send that just now. Please email us directly." },
      { status: 502 },
    );
  }

  try {
    await saveToSupabase(base, key, row);
  } catch (err) {
    console.error("[contact] save failed:", err);
    return Response.json(
      { error: "We couldn't send that just now. Please email us directly." },
      { status: 502 },
    );
  }

  await sendEmails(row);
  return Response.json({ ok: true }, { status: 200 });
}

/* Fire-and-report. Every failure is logged and swallowed: the visitor has
   already been told their message went through, because it did. */
async function sendEmails(row) {
  if (!mailgunConfig()) return;

  const jobs = [];

  if (canAutoReplyTo(row.email)) {
    const msg = autoReply({ firstName: row.first_name });
    jobs.push(
      sendMail({
        to: row.email,
        subject: msg.subject,
        text: msg.text,
        html: msg.html,
        replyTo: process.env.CONTACT_TO_EMAIL,
        auto: true,          // marks it machine-generated, so no reply loops
      }).catch((e) => console.error("[contact] auto-reply failed:", e)),
    );
  }

  const to = process.env.CONTACT_TO_EMAIL;
  if (to) {
    const msg = staffNotification(row);
    jobs.push(
      sendMail({
        to,
        subject: msg.subject,
        text: msg.text,
        replyTo: row.email,  // hitting reply answers the person, not the robot
      }).catch((e) => console.error("[contact] staff notification failed:", e)),
    );
  }

  await Promise.allSettled(jobs);
}

export function GET() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}
