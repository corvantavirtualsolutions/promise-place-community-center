"use client";

import { useState } from "react";
import { Mail, MapPin, Alert, Lock, CheckCircle, ArrowRight } from "./Icons";

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

export default function Contact({ hideHead = false }) {
  const [sent, setSent] = useState(false);

  /* No backend is connected yet, so the form opens the visitor's email app with
     their inquiry prefilled. To switch to a real endpoint later, replace the body
     of handleSubmit with a fetch() to your form handler. */
  function handleSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k) => (f.get(k) || "").toString().trim();

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

    window.location.href =
      `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section className="section" id="contact">
      <span className="blob blob--teal" style={{ width: 260, height: 260, top: "12%", right: "-100px", opacity: .4 }} aria-hidden="true" />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {!hideHead && (
          <div className="section-head section-head--center">
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

          <form className="form" onSubmit={handleSubmit} noValidate={false}>
            {sent && (
              <div className="form__success" role="status">
                <CheckCircle />
                <p>
                  Thanks &mdash; your email app should have opened with your inquiry
                  ready to send. If it didn&rsquo;t, you can email us directly at{" "}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                </p>
              </div>
            )}

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

            <button className="btn btn-primary btn-block" type="submit">
              Send Inquiry <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
