import Link from "next/link";
import Reveal from "./Reveal";
import { ArrowRight, Chat } from "./Icons";

/* Reusable closing call-to-action. Supportive tone, never salesy. */
export default function CTABand({
  title = "Ready when you are.",
  body = "Send us a question or a request for services and our team will help you understand the next steps.",
  primary = { href: "/contact", label: "Contact Promise Place" },
  secondary = { href: "/get-started", label: "See How to Get Started" },
}) {
  return (
    <section className="cta-band">
      <div className="container">
        <Reveal className="cta-band__inner">
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
          <div className="cta-band__actions">
            <Link className="btn btn-sun" href={primary.href}>
              {primary.label} <ArrowRight />
            </Link>
            {secondary && (
              <Link className="btn btn-ghost" href={secondary.href}>
                <Chat /> {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
