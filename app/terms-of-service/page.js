import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { SITE } from "@/components/site";
import { Alert } from "@/components/Icons";

export const metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply to using the Promise Place Community Center website.",
};

const UPDATED = "August 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms of Service"
        title="The terms for using this website."
        lede="What this website is for, what it isn't, and what you can expect from it."
        tone="sky"
      />

      <section className="section section--white">
        <div className="container">
          <div className="prose">
            <p className="prose__meta">Last updated: {UPDATED}</p>

            <div className="prose__note">
              <Alert />
              <p>
                <strong>For the organization:</strong> this is a starting draft, not
                legal advice, and it has not been reviewed by an attorney. Have a
                lawyer licensed in Indiana review it before treating it as your
                official terms.
              </p>
            </div>

            <h2>This website is information, not treatment</h2>
            <p>
              Everything on this website is general information about the services
              Promise Place Community Center offers. It is not medical advice, not a
              diagnosis, and not a substitute for speaking with a qualified
              professional about your own situation.
            </p>
            <p>
              Reading this website, or sending us a message through it, does not make
              you a client and does not create a therapeutic or clinical relationship.
              That begins only when services are formally arranged with our team.
            </p>

            <h2>In an emergency</h2>
            <p>
              This website is not monitored for emergencies. If you or someone else is
              in immediate danger, call 911 or contact your local emergency service.
              Do not use our contact form or email to report an emergency &mdash; nobody
              may see it in time.
            </p>

            <h2>Contacting us</h2>
            <p>
              You are welcome to email us with questions or a request for services. We
              try to respond, but we cannot guarantee a reply within any particular
              time, and sending a message does not guarantee that services are
              available to you.
            </p>
            <p>
              Please send accurate information and only information you have the right
              to share. If you are writing on behalf of someone else, please make sure
              you are permitted to do so.
            </p>

            <h2>Services, insurance and coverage</h2>
            <p>
              We describe the services we offer and the payment options we accept,
              including Medicaid, commercial insurance, and sliding-scale services.
              Coverage and eligibility vary from person to person. Nothing on this
              website is a promise that a particular service will be available to you
              or that a particular cost will be covered. Contact us to discuss your
              individual situation.
            </p>

            <h2>Using this website properly</h2>
            <ul>
              <li>Don&rsquo;t attempt to disrupt, overload, or gain unauthorized access to the site.</li>
              <li>Don&rsquo;t use it to send unlawful, harassing, or misleading material.</li>
              <li>Don&rsquo;t copy our content and present it as your own.</li>
            </ul>

            <h2>Our content</h2>
            <p>
              The text, illustrations, logo, and design of this website belong to
              Promise Place Community Center. You&rsquo;re welcome to read and share
              links to it. Reusing the content or the logo elsewhere requires our
              permission.
            </p>

            <h2>Links to other websites</h2>
            <p>
              Where we link to another website, such as our Facebook page, we don&rsquo;t
              control what is published there and are not responsible for it.
            </p>

            <h2>Availability and accuracy</h2>
            <p>
              We keep this website as accurate and available as we reasonably can, but
              we can&rsquo;t promise it will always be online or entirely free of errors.
              Details may change, and the site may be unavailable at times.
            </p>

            <h2>Changes to these terms</h2>
            <p>
              We may update these terms. When we do, the date at the top of this page
              changes. Continuing to use the website after a change means the updated
              terms apply.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of the State of Indiana.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms? Email{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or write to{" "}
              {SITE.address1}, {SITE.address2}.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to talk?"
        body="Send us a question or a request for services and our team will help you understand the next steps."
        primary={{ href: "/contact", label: "Contact Promise Place" }}
        secondary={{ href: "/get-started", label: "How to Get Started" }}
      />
    </>
  );
}
