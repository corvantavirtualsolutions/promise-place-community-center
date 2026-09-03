/* Mailgun sending, over plain fetch.

   Mailgun's send API is a form POST with HTTP basic auth, so there is nothing
   an SDK would add here — and the project's rule is no dependency unless it
   earns its place.

     POST {base}/v3/{domain}/messages
     Authorization: Basic base64("api:" + API_KEY)
     body: application/x-www-form-urlencoded

   Region matters: a key issued in the EU will not authenticate against the US
   host. MAILGUN_BASE_URL carries it so switching is an env change, not a code
   change. */

const US = "https://api.mailgun.net";

export function mailgunConfig() {
  const key = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const from = process.env.MAILGUN_FROM;
  if (!key || !domain || !from) return null;
  return {
    key,
    domain,
    from,
    base: (process.env.MAILGUN_BASE_URL || US).replace(/\/+$/, ""),
  };
}

/* Addresses that must never receive an automated reply: replying to them either
   bounces or, worse, starts a loop between two robots. */
const NO_AUTO_REPLY = /^(no-?reply|donotreply|mailer-daemon|postmaster|bounce|abuse)@/i;

export function canAutoReplyTo(email) {
  const addr = String(email || "").trim().toLowerCase();
  if (!addr || !addr.includes("@")) return false;
  if (NO_AUTO_REPLY.test(addr)) return false;
  // never auto-reply to our own inbox — that is a loop waiting to happen
  const ours = (process.env.CONTACT_TO_EMAIL || "").trim().toLowerCase();
  if (ours && addr === ours) return false;
  return true;
}

/**
 * Sends one message. Throws on failure so the caller can log it; callers should
 * NOT let a send failure fail the visitor's request — the inquiry is already
 * saved by the time we get here.
 *
 * `auto` marks the message as machine-generated. Mail systems use these headers
 * to suppress their own out-of-office replies, which is what stops two
 * autoresponders talking to each other forever.
 */
export async function sendMail({ to, subject, text, html, replyTo, auto = false }) {
  const cfg = mailgunConfig();
  if (!cfg) throw new Error("Mailgun is not configured");

  const form = new URLSearchParams();
  form.set("from", cfg.from);
  form.set("to", to);
  form.set("subject", subject);
  form.set("text", text);
  if (html) form.set("html", html);
  if (replyTo) form.set("h:Reply-To", replyTo);
  if (auto) {
    form.set("h:Auto-Submitted", "auto-replied");
    form.set("h:X-Auto-Response-Suppress", "All");
    form.set("h:Precedence", "auto_reply");
  }

  const res = await fetch(`${cfg.base}/v3/${encodeURIComponent(cfg.domain)}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${cfg.key}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Mailgun ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  return true;
}
