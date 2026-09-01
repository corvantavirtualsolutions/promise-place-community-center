"use client";

import { useState } from "react";
import { Mail, MapPin, Alert, Lock, ArrowRight } from "./Icons";
import { ContactArt, ThankYouArt } from "./Illustrations";
import { noteOfTheDay } from "./quotes";

import { SITE } from "./site";

const EMAIL = SITE.email;
const ADDRESS_LINE_1 = SITE.address1;
const ADDRESS_LINE_2 = SITE.address2;

const SEEKING = [
  "Myself",
  "My Child",
  "My Family",
  "Someone Else",
  "School / Organization",
];

const TOPICS = [
  "Therapy or counseling",
  "Telehealth therapy",
  "An assessment",
  "Behavior support for a child",
  "Case management or life skills",
  "School-based services",
  "Alternative to Explosion Program",
  "Insurance, Medicaid or sliding scale",
  "General question",
  "Not sure yet",
];

/* Builds the mailto: the form used before there was a backend. Still used as
   the escape hatch when the API call fails, so nobody who reached out is left
   with a dead end. */
function mailtoFor(get) {
  const subject = `Website inquiry from ${get("firstName")} ${get("lastName")}`.trim();
  const body = [
    `Name: ${get("firstName")} ${get("lastName")}`,
    `Email: ${get("email")}`,
    `Phone: ${get("phone") || "Not provided"}`,
    `Seeking services for: ${get("seekingFor")}`,
    `Topic: ${get("topic")}`,
    `Preferred contact method: ${get("preferred")}`,
    "",
    "Message:",
    get("message"),
  ].join("\n");
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Contact({ hideHead = false }) {
  // idle | sending | sent | error
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState("");
  /* Chosen at submit time rather than on render: this is a client component,
     but computing a date-derived value during the first render would still risk
     a server/client mismatch. By the time this runs, a person has clicked. */
  const [note, setNote] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    const f = new FormData(e.currentTarget);
    const get = (k) => (f.get(k) || "").toString().trim();
    const form = e.currentTarget;

    setStatus("sending");
    setError("");

    const payload = {
      firstName: get("firstName"),
      lastName: get("lastName"),
      email: get("email"),
      phone: get("phone"),
      seekingFor: get("seekingFor"),
      topic: get("topic"),
      preferred: get("preferred"),
      message: get("message"),
      company: get("company"),   // honeypot — see the hidden field below
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFallback(mailtoFor(get));
        setError(data.error || "Something went wrong sending your message.");
        setStatus("error");
        return;
      }

      form.reset();
      setNote(noteOfTheDay());
      setStatus("sent");
    } catch {
      setFallback(mailtoFor(get));
      setError("We couldn't reach the server. Your connection may be offline.");
      setStatus("error");
    }
  }

  return (
    <section className="section section--white" id="contact">
      <span className="blob blob--teal" style={{ width: 260, height: 260, top: "12%", right: "-100px", opacity: .4 }} aria-hidden="true" />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {!hideHead && (
          <div className="section-head">
          <span className="eyebrow">Contact Us</span>
          <h2>We&rsquo;re glad you reached out.</h2>
          <p>
            Send us a question or a request for services and our team will follow up
            with information about how we can help.
          </p>
        </div>
        )}

        <div className="contact__grid">
          <div>
            <div style={{ maxWidth: 320, margin: "0 auto 22px" }}>
              <ContactArt title="An illustration of an envelope with a message bubble above it" />
            </div>
            <div className="info-card">
              <div className="info-card__row">
                <span className="chip chip--teal"><MapPin /></span>
                <div>
                  <h4>Visit</h4>
                  <address>
                    {SITE.name}<br />
                    {ADDRESS_LINE_1}<br />
                    {ADDRESS_LINE_2}
                  </address>
                </div>
              </div>

              <div className="info-card__row">
                <span className="chip chip--sky"><Mail /></span>
                <div>
                  <h4>Email</h4>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </div>
              </div>

              <div className="info-card__row">
                <span className="chip chip--grape"><Lock /></span>
                <div>
                  <h4>Your Privacy</h4>
                  <p style={{ fontSize: ".94rem", margin: 0 }}>
                    Please do not include highly sensitive or emergency information
                    in this form.
                  </p>
                </div>
              </div>
            </div>

            <div className="emergency">
              <Alert />
              <p>
                <strong>In an emergency:</strong> If you are experiencing an
                emergency, call 911 or contact your local emergency service. This
                form is not monitored as an emergency service.
              </p>
            </div>
          </div>

          {status === "sent" ? (
            <div className="thanks" role="status">
              <div className="thanks__art"><ThankYouArt /></div>
              <h3>Thank you for reaching out.</h3>
              <p>
                We&rsquo;ve received your message and someone from our team will get
                back to you as soon as we can. If it&rsquo;s urgent, you can also
                email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>

              <blockquote className="thanks__note">{note}</blockquote>

              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => setStatus("idle")}
              >
                Send another message
              </button>
            </div>
          ) : (
          <form className="form" onSubmit={handleSubmit} noValidate={false}>
            <div aria-live="polite">
              {status === "error" && (
                <div className="form__error" role="alert">
                  <Alert />
                  <p>
                    {error}{" "}
                    {fallback ? (
                      <>
                        You can <a href={fallback}>send it by email instead</a> &mdash;
                        your message is already filled in.
                      </>
                    ) : (
                      <>Please email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</>
                    )}
                  </p>
                </div>
              )}
            </div>

            <div className="form__row">
              <div className="field">
                <label htmlFor="firstName">First Name <span className="req" aria-hidden="true">*</span></label>
                <input id="firstName" name="firstName" type="text" autoComplete="given-name" required />
              </div>
              <div className="field">
                <label htmlFor="lastName">Last Name <span className="req" aria-hidden="true">*</span></label>
                <input id="lastName" name="lastName" type="text" autoComplete="family-name" required />
              </div>
            </div>

            <div className="form__row">
              <div className="field">
                <label htmlFor="email">Email <span className="req" aria-hidden="true">*</span></label>
                <input id="email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="seekingFor">Who are you seeking services for?</label>
              <select id="seekingFor" name="seekingFor" defaultValue={SEEKING[0]}>
                {SEEKING.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="field">
              <label htmlFor="topic">What can we help you with?</label>
              <select id="topic" name="topic" defaultValue={TOPICS[TOPICS.length - 1]}>
                {TOPICS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            <fieldset className="field" style={{ border: 0, padding: 0, margin: "0 0 18px" }}>
              <legend style={{ fontSize: ".88rem", fontWeight: 700, color: "var(--ink)", marginBottom: 9, padding: 0 }}>
                Preferred contact method
              </legend>
              <div className="radio-row">
                <label className="radio-pill">
                  <input type="radio" name="preferred" value="Email" defaultChecked /> Email
                </label>
                <label className="radio-pill">
                  <input type="radio" name="preferred" value="Phone" /> Phone
                </label>
              </div>
            </fieldset>

            <div className="field">
              <label htmlFor="message">Message <span className="req" aria-hidden="true">*</span></label>
              <textarea
                id="message" name="message" required
                placeholder="Tell us a little about what kind of support you're looking for."
              />
            </div>

            <div className="form__note">
              <Lock />
              <p style={{ margin: 0 }}>
                Please do not include highly sensitive or emergency information in
                this form. Required fields are marked with an asterisk.
              </p>
            </div>

            {/* Honeypot. Off-screen, unlabelled to people, skipped by tab order
                and hidden from screen readers — only an automated form filler
                will ever put anything in it. */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <button className="btn btn-primary btn-block" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : <>Send Inquiry <ArrowRight /></>}
            </button>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}
