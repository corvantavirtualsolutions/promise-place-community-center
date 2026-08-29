import Link from "next/link";
import Reveal from "./Reveal";
import { Chat, Clipboard, Sparkle, Shield, ArrowRight } from "./Icons";

const CATEGORIES = [
  {
    icon: Chat,
    tone: "teal",
    title: "Therapy & Counseling",
    body: "Talk-based support for individuals and families, in person or virtually.",
    items: ["Therapy", "Telehealth Therapy", "Grief & Loss Counseling", "Anger Management"],
  },
  {
    icon: Clipboard,
    tone: "sky",
    title: "Assessments",
    body: "Assessments that help identify needs and point toward the right support.",
    items: ["Mental Health Assessments", "Substance Abuse Assessment", "Parenting Assessments"],
  },
  {
    icon: Sparkle,
    tone: "sun",
    title: "Family & Child Support",
    body: "Practical, day-to-day support for children, parents, and households.",
    items: ["Case Management", "Life Skills", "Behavior Management", "Behavior Plans for Children"],
  },
  {
    icon: Shield,
    tone: "grape",
    title: "Specialized & Community",
    body: "Focused services for specific situations, including support in schools.",
    items: ["Domestic Violence Services", "School-Based Services", "Alternative to Explosion"],
  },
];

export default function ServicesTeaser() {
  return (
    <section className="section section--white">
      <span className="blob blob--teal" style={{ width: 280, height: 280, top: "10%", right: "-110px", opacity: .4 }} aria-hidden="true" />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <Reveal className="section-head">
          <span className="eyebrow">Our Services</span>
          <h2>Many kinds of support, one welcoming place.</h2>
          <p>
            Thirteen services across four areas of care &mdash; for children, adults,
            families, and schools.
          </p>
        </Reveal>

        <div className="grid grid-4">
          {CATEGORIES.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} dir="up" delay={i * 110}>
                <Link className={`teaser-card teaser-card--${c.tone}`} href="/services">
                  <span className={`chip chip--${c.tone}`}><Icon /></span>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                  <ul>
                    {c.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                  <span className="teaser-card__more">View services <ArrowRight /></span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
