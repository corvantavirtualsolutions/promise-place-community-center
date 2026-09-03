import { SITE } from "@/components/site";

/* The two messages sent after a contact form submission.

   The auto-reply deliberately does NOT quote back what the person wrote.
   Someone asking a mental health provider for help may have described symptoms,
   medication or a crisis in that box, and plain email is not a safe place to
   put it. It also means a mistyped address delivers nothing sensitive to a
   stranger — only a neutral note that a message was received.

   Both carry a plain-text version. Every mail client renders it, it never lands
   in spam for being an image-heavy template, and it reads the same in a
   notification preview as it does when opened. */

/* --------------------------------------------------------------------------
   Why this template looks the way it does

   Email is not the web. Three rules shaped every decision here:

   1. NO IMAGES. Not one. Most inboxes block remote images until the reader
      clicks "display images", so an image-led design arrives as a wall of grey
      boxes. Hosting them on promiseplacecc.com would also mean the server logs
      a hit the moment a patient opens mail from their mental health provider —
      accidental open-tracking, which is exactly what we refused when we skipped
      Mailgun's tracking CNAME. The colour here is all background fills, and the
      "stickers" are emoji, drawn by the reader's own device: always in colour,
      never blocked, never phoning home.

   2. NO ANIMATION. CSS animation is stripped by every major client, and an
      animated GIF freezes on frame one in Outlook. Movement in email is a
      promise you cannot keep.

   3. TABLES, INLINE STYLES. Outlook renders through Word, which has no flexbox,
      no grid, and no float worth trusting. The <style> block in the head is
      progressive enhancement only — every rule that matters is also inline, so
      stripping the whole head still leaves the design intact.

   Warmth is the point, but this is still a clinical provider writing to someone
   who may be having a hard week. Colour, yes. Confetti, no.
   -------------------------------------------------------------------------- */

const C = {
  teal: "#0C7267", tealMid: "#31BFA8", tealDark: "#09443E", tealWash: "#F0FBF8", tealLine: "#D5F3EC", tealSoft: "#A9E7DA",
  sun: "#F5CE63", sunWash: "#FFFAEC", sunInk: "#8A5A08",
  coral: "#EE6A62", coralWash: "#FFF5F4", coralInk: "#A32D2A",
  sky: "#1B82C9", skyWash: "#F1F8FE",
  grape: "#8468E0", grapeWash: "#F8F6FF",
  ink: "#16242D", ink2: "#45586A", ink3: "#5D6F7B",
  line: "#E7EEF1", white: "#FFFFFF",
};

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

/* The three badges do double duty: they are the colour in the middle of the
   message, and they answer the only question the reader actually has, which is
   "what happens now". Decoration that carries information earns its space. */
const STEPS = [
  { emoji: "🌱", label: "You reached out",  bg: C.tealWash,  ink: C.teal,     edge: C.tealSoft },
  { emoji: "☀️", label: "We received it",   bg: C.sunWash,   ink: C.sunInk,   edge: C.sun },
  { emoji: "💬", label: "We'll reply soon", bg: C.skyWash,   ink: C.sky,      edge: "#BCDFFA" },
];

export function autoReply({ firstName }) {
  const name = firstName ? ` ${firstName}` : "";

  const text = `Hi${name},

Thank you for reaching out to ${SITE.name}. We've received your message and someone from our team will get back to you as soon as we can.

What happens next:
  1. You reached out
  2. We received it
  3. We'll reply soon

If your situation is urgent and you need to speak to someone sooner, please email us directly at ${SITE.email}.

If you are experiencing an emergency, call 911 or contact your local emergency service. This inbox is not monitored as an emergency service.

Warm regards,
${SITE.name}
${SITE.address1}, ${SITE.address2}

— This is an automated confirmation. You do not need to reply to it.`;

  const safeName = escapeHtml(name);

  const steps = STEPS.map(
    (s) => `<td width="33.33%" align="center" valign="top" style="padding:0 5px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr><td align="center" valign="middle" height="98" style="height:98px;background-color:${s.bg};border:1px solid ${s.edge};border-radius:14px;padding:14px 6px">
          <div style="font-size:30px;line-height:34px;margin:0 0 6px">${s.emoji}</div>
          <div style="font-family:${FONT};font-size:12px;line-height:16px;font-weight:700;color:${s.ink}">${s.label}</div>
        </td></tr>
      </table>
    </td>`,
  ).join("");

  const html = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>We&rsquo;ve received your message</title>
<style>
  /* Progressive enhancement only. Everything below is also set inline. */
  body{margin:0;padding:0;width:100%!important}
  img{border:0;line-height:100%;outline:none;text-decoration:none}
  table{border-collapse:collapse!important}
  a{color:${C.teal}}
  @media only screen and (max-width:600px){
    .px{padding-left:22px!important;padding-right:22px!important}
    .h1{font-size:23px!important;line-height:30px!important}
    .stepwrap{padding-left:16px!important;padding-right:16px!important}
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${C.tealWash}">

<div style="display:none;font-size:1px;color:${C.tealWash};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden">
  We&rsquo;ve received your message and someone from our team will get back to you as soon as we can.
  &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${C.tealWash}">
<tr><td align="center" style="padding:28px 12px 36px">

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background-color:${C.white};border:1px solid ${C.line};border-radius:20px;overflow:hidden">

    <!-- masthead -->
    <tr><td align="center" style="background-color:${C.teal};padding:26px 24px 22px">
      <div style="font-family:${FONT};font-size:19px;line-height:25px;font-weight:800;color:${C.white};letter-spacing:.2px">
        ${escapeHtml(SITE.name)}
      </div>
      <div style="font-family:${FONT};font-size:12px;line-height:18px;color:${C.tealSoft};padding-top:5px">
        ${escapeHtml(SITE.tagline)}
      </div>
    </td></tr>

    <!-- a thin ribbon of the full palette: the whole brand in 5px, no images -->
    <tr><td style="font-size:0;line-height:0">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
        <td width="20%" height="5" style="background-color:${C.tealMid};font-size:0;line-height:0">&nbsp;</td>
        <td width="20%" height="5" style="background-color:${C.sun};font-size:0;line-height:0">&nbsp;</td>
        <td width="20%" height="5" style="background-color:${C.coral};font-size:0;line-height:0">&nbsp;</td>
        <td width="20%" height="5" style="background-color:${C.sky};font-size:0;line-height:0">&nbsp;</td>
        <td width="20%" height="5" style="background-color:${C.grape};font-size:0;line-height:0">&nbsp;</td>
      </tr></table>
    </td></tr>

    <!-- greeting -->
    <tr><td class="px" align="center" style="padding:32px 40px 0">
      <div style="font-size:42px;line-height:46px">💛</div>
      <h1 class="h1" style="margin:14px 0 0;font-family:${FONT};font-size:26px;line-height:33px;font-weight:800;color:${C.ink}">
        Thank you for reaching out
      </h1>
    </td></tr>

    <tr><td class="px" style="padding:16px 40px 0;font-family:${FONT};font-size:15px;line-height:25px;color:${C.ink2}">
      <p style="margin:0 0 14px">Hi${safeName},</p>
      <p style="margin:0">
        We&rsquo;ve received your message at <strong style="color:${C.ink}">${escapeHtml(SITE.name)}</strong>,
        and someone from our team will get back to you as soon as we can.
      </p>
    </td></tr>

    <!-- what happens next -->
    <tr><td class="stepwrap" style="padding:26px 35px 4px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>${steps}</tr></table>
    </td></tr>

    <!-- reach us sooner -->
    <tr><td class="px" style="padding:26px 40px 0">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr><td style="background-color:${C.sunWash};border-left:4px solid ${C.sun};border-radius:0 12px 12px 0;padding:16px 18px;font-family:${FONT};font-size:14px;line-height:22px;color:${C.ink2}">
          <strong style="color:${C.sunInk}">Need us sooner?</strong><br>
          Email us directly at
          <a href="mailto:${SITE.email}" style="color:${C.teal};font-weight:700;text-decoration:underline">${SITE.email}</a>.
        </td></tr>
      </table>
    </td></tr>

    <!-- emergency -->
    <tr><td class="px" style="padding:12px 40px 0">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr><td style="background-color:${C.coralWash};border-left:4px solid ${C.coral};border-radius:0 12px 12px 0;padding:16px 18px;font-family:${FONT};font-size:14px;line-height:22px;color:${C.ink2}">
          <strong style="color:${C.coralInk}">If you are experiencing an emergency</strong>, call
          <a href="tel:911" style="color:${C.coralInk};font-weight:700;text-decoration:underline">911</a>
          or contact your local emergency service. This inbox is not monitored as an emergency service.
        </td></tr>
      </table>
    </td></tr>

    <!-- sign-off -->
    <tr><td class="px" style="padding:26px 40px 0;font-family:${FONT};font-size:15px;line-height:24px;color:${C.ink2}">
      Warm regards,<br>
      <strong style="color:${C.ink}">${escapeHtml(SITE.name)}</strong>
    </td></tr>

    <tr><td class="px" style="padding:22px 40px 30px">
      <div style="height:1px;background-color:${C.line};font-size:0;line-height:0">&nbsp;</div>
    </td></tr>

    <!-- footer -->
    <tr><td align="center" style="background-color:${C.tealWash};border-top:1px solid ${C.tealLine};padding:22px 32px 26px;font-family:${FONT};font-size:12px;line-height:19px;color:${C.ink3}">
      <div style="font-weight:700;color:${C.ink2}">${escapeHtml(SITE.name)}</div>
      <div style="padding-top:3px">${escapeHtml(SITE.address1)}, ${escapeHtml(SITE.address2)}</div>
      <div style="padding-top:12px">This is an automated confirmation. You do not need to reply to it.</div>
    </td></tr>

  </table>

</td></tr></table>
</body></html>`;

  return {
    subject: `We've received your message — ${SITE.name}`,
    text,
    html,
  };
}

/* Deliberately plain text. This one goes to staff, who need to read it fast on
   a phone and reply — not admire it. */
export function staffNotification(row) {
  const text = `New website inquiry.

Name:      ${row.first_name} ${row.last_name}
Email:     ${row.email}
Phone:     ${row.phone || "Not provided"}
Seeking:   ${row.seeking_for || "—"}
Topic:     ${row.topic || "—"}
Prefers:   ${row.preferred_contact || "—"}

Message:
${row.message}

---
Reply to this email to answer them directly.
Manage it in the dashboard: https://www.promiseplacecc.com/admin`;

  return {
    subject: `Website inquiry — ${row.first_name} ${row.last_name}`,
    text,
  };
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}
