import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { SITE } from "@/components/site";
import { Alert, Info } from "@/components/Icons";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Promise Place Community Center's website handles information, what it collects, and what it does not.",
};

const UPDATED = "August 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="How this website handles your information."
        lede="Written in plain language, because you shouldn't need a lawyer to understand what happens to your details."
      />

      <section className="section section--white">
        <div className="container">
          <div className="prose">
            <p className="prose__meta">Last updated: {UPDATED}</p>

            <div className="prose__note">
              <Alert />
              <p>
                <strong>For the organization:</strong> this is a starting draft based on how
                the website actually works today. It has not been reviewed by a lawyer.
                Because Promise Place provides health services, a qualified attorney should
                review it &mdash; particularly around HIPAA and protected health information
                &mdash; before it is treated as your official policy.
              </p>
            </div>

            <h2>The short version</h2>
            <p>
              This website does not create an account for you, does not track you,
              and does not store anything you type into it. There is no database
              behind it. The only way we receive your information is if you choose
              to email us.
            </p>

            <h2>What the contact form actually does</h2>
            <p>
              The form on our contact page does not send anything to a server. When
              you press <em>Send Inquiry</em>, it opens your own email program with the
              details you entered already filled in. Nothing is transmitted until you
              press send in your own email program, and at that point the message
              travels through your email provider to{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a> like any ordinary email.
            </p>
            <p>
              This means we never see anything you type unless you deliberately send it.
              It also means the form offers no special security &mdash; it is ordinary
              email, which is not encrypted end to end.
            </p>

            <div className="prose__note">
              <Info />
              <p>
                Please do not include highly sensitive details, medical history, or
                emergency information in an email to us. If you are experiencing an
                emergency, call 911 or your local emergency service.
              </p>
            </div>

            <h2>Information we receive by email</h2>
            <p>
              If you email us, we receive whatever you chose to write: typically your
              name, your email address, a phone number if you provided one, and a
              description of the support you are looking for. We use it only to reply
              to you and to help you understand what services may fit.
            </p>

            <h2>Cookies and tracking</h2>
            <p>
              This website sets no cookies of its own, uses no advertising trackers,
              and has no analytics installed at the time of writing. Nothing follows
              you between websites.
            </p>
            <p>
              If analytics are added later, this policy should be updated to say what
              is collected and why.
            </p>

            <h2>Our hosting provider</h2>
            <p>
              The website is hosted by Vercel. Like any web host, their servers keep
              standard technical logs of requests &mdash; things like IP addresses,
              browser type, and which pages were requested. We do not control the
              contents of those logs and do not use them to identify individuals.
            </p>

            <h2>Links to other websites</h2>
            <p>
              Our website links to Facebook. Once you follow a link away from this
              site, the privacy policy of that other service applies, not this one.
            </p>

            <h2>Children</h2>
            <p>
              We provide services for children, but this website is written for the
              adults arranging that support. It is not designed for children to use
              on their own and does not knowingly collect information from them.
            </p>

            <h2>Your clinical records are separate</h2>
            <p>
              This policy covers the website only. Any records created when you
              actually receive services from Promise Place Community Center are
              handled under our clinical privacy practices, which are a separate
              document governed by health privacy law.
            </p>

            <h2>Changes</h2>
            <p>
              If this policy changes, the date at the top of this page changes with it.
            </p>

            <h2>Questions</h2>
            <p>
              Email us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, or write to
              us at {SITE.address1}, {SITE.address2}.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        title="Still have a question?"
        body="If anything here is unclear, just ask. We're glad to explain."
        primary={{ href: "/contact", label: "Contact Promise Place" }}
        secondary={{ href: "/faq", label: "Read the FAQ" }}
      />
    </>
  );
}
