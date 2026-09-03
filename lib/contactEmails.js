import { SITE } from "@/components/site";

/* The two messages sent after a contact form submission.

   The auto-reply deliberately does NOT quote back what the person wrote.
   Someone asking a mental health provider for help may have described symptoms,
   medication or a crisis in that box, and plain email is not a safe place to
   put it. It also means a mistyped address delivers nothing sensitive to a
   stranger — only a neutral note that a message was received.

   Both are plain text first. Every mail client renders it, it never lands in
   spam for being an image-heavy template, and it reads the same in a
   notification preview as it does when opened. */

export function autoReply({ firstName }) {
  const name = firstName ? ` ${firstName}` : "";
  const text = `Hi${name},

Thank you for reaching out to ${SITE.name}. We've received your message and someone from our team will get back to you as soon as we can.

If your situation is urgent and you need to speak to someone sooner, please email us directly at ${SITE.email}.

If you are experiencing an emergency, call 911 or contact your local emergency service. This inbox is not monitored as an emergency service.

Warm regards,
${SITE.name}
${SITE.address1}, ${SITE.address2}

— This is an automated confirmation. You do not need to reply to it.`;

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#16242D;max-width:520px">
  <p>Hi${escapeHtml(name)},</p>
  <p>Thank you for reaching out to ${escapeHtml(SITE.name)}. We&rsquo;ve received your message and someone from our team will get back to you as soon as we can.</p>
  <p>If your situation is urgent and you need to speak to someone sooner, please email us directly at <a href="mailto:${SITE.email}" style="color:#0C7267">${SITE.email}</a>.</p>
  <p style="background:#FFF5F4;border-left:4px solid #EE6A62;padding:12px 16px;margin:20px 0">
    <strong>If you are experiencing an emergency</strong>, call 911 or contact your local emergency service. This inbox is not monitored as an emergency service.
  </p>
  <p>Warm regards,<br><strong>${escapeHtml(SITE.name)}</strong><br>
     <span style="color:#5D6F7B">${escapeHtml(SITE.address1)}, ${escapeHtml(SITE.address2)}</span></p>
  <p style="color:#5D6F7B;font-size:13px;border-top:1px solid #E4EBEF;padding-top:14px">
    This is an automated confirmation. You do not need to reply to it.</p>
</div>`;

  return {
    subject: `We've received your message — ${SITE.name}`,
    text,
    html,
  };
}

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
