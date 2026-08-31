import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { Gamepad, ArrowRight } from "@/components/Icons";

export const metadata = {
  title: "Mini Games",
  description:
    "Mini games from Promise Place Community Center — coming soon.",
  robots: { index: false, follow: true },
};

export default function MiniGamesPage() {
  return (
    <>
      <PageHero
        eyebrow="Mini Games"
        title="Something fun is on the way."
        lede="We're putting together a few simple games. Check back soon."
        tone="grape"
      />

      <section className="section section--white">
        <div className="container">
          <div className="soon">
            <span className="chip chip--grape" style={{ width: 72, height: 72, borderRadius: 22 }}>
              <Gamepad style={{ width: 34, height: 34 }} />
            </span>
            <h2>Coming soon</h2>
            <p>
              This page is a placeholder for now. When the games are ready
              they&rsquo;ll live here.
            </p>
            <div className="btn-row btn-row--center" style={{ marginTop: 26 }}>
              <Link className="btn btn-primary" href="/">Back to Home <ArrowRight /></Link>
              <Link className="btn btn-secondary" href="/services">Explore Our Services</Link>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Looking for support in the meantime?"
        body="Our team is here for questions about services for children, adults and families."
        primary={{ href: "/contact", label: "Contact Promise Place" }}
        secondary={{ href: "/services", label: "See Our Services" }}
      />
    </>
  );
}
