import Link from "next/link";
import Reveal from "./Reveal";
import { Chat, Video, Leaf, Flame, Clipboard, Compass, Sparkle, Blocks, Shield, School, Sun, ArrowRight } from "./Icons";

const GROUPS = [
  {
    title: "Therapy & Counseling",
    tone: "teal",
    icon: Chat,
    items: [
      { icon: Chat,  title: "Therapy", body: "Mental health therapy services for individuals and families." },
      { icon: Video, title: "Telehealth Therapy", body: "Remote therapy services that allow clients to receive support virtually." },
      { icon: Leaf,  title: "Grief & Loss Counseling", body: "Support for individuals and families experiencing grief and loss." },
      { icon: Flame, title: "Anger Management", body: "Services designed to help individuals better understand and manage anger." },
    ],
  },
  {
    title: "Assessments",
    tone: "sky",
    icon: Clipboard,
    items: [
      { icon: Clipboard, title: "Mental Health Assessments", body: "Assessment services to help identify mental health needs." },
      { icon: Clipboard, title: "Substance Abuse Assessment", body: "Assessment services related to substance use concerns." },
      { icon: Clipboard, title: "Parenting Assessments", body: "Assessment services designed to support parenting and family needs." },
    ],
  },
  {
    title: "Family & Child Support",
    tone: "sun",
    icon: Sparkle,
    items: [
      { icon: Compass, title: "Case Management", body: "Support designed to help individuals and families navigate resources and services." },
      { icon: Sparkle, title: "Life Skills", body: "Services focused on helping individuals develop practical skills for everyday life." },
      { icon: Blocks,  title: "Behavior Management", body: "Behavior-focused services designed to support children and families." },
      { icon: Blocks,  title: "Behavior Plans for Children", body: "Individualized behavior planning and support for children." },
    ],
  },
  {
    title: "Specialized & Community Services",
    tone: "grape",
    icon: Shield,
    items: [
      { icon: Shield, title: "Domestic Violence Services", body: "Support related to domestic violence concerns." },
      { icon: School, title: "School-Based Mental Health Services", body: "Mental health and behavioral support provided within school environments." },
      { icon: Sun,    title: "Alternative to Explosion Program", body: "A specialized program offered to schools. Contact us to learn more." },
    ],
  },
];

const DOT_BG = {
  teal:  { background: "var(--teal-100)",  color: "var(--teal-800)" },
  sky:   { background: "var(--sky-100)",   color: "var(--sky-700)" },
  sun:   { background: "var(--sun-100)",   color: "var(--sun-700)" },
  grape: { background: "var(--grape-100)", color: "var(--grape-700)" },
};

export default function Services({ hideHead = false }) {
  return (
    <section className="section" id="services">
      <span className="blob blob--teal" style={{ width: 300, height: 300, top: "8%", right: "-120px", opacity: .4 }} aria-hidden="true" />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {!hideHead && (
        <Reveal className="section-head section-head--center">
            <span className="eyebrow">Our Services</span>
            <h2>Many kinds of support, one welcoming place.</h2>
            <p>
              Whether you&rsquo;re looking for therapy, an assessment, help with
              behavior at home or at school, or simply somewhere to start &mdash; there
              is likely a service here that fits.
            </p>
          </Reveal>
        )}

        {GROUPS.map((group, gi) => {
          const GroupIcon = group.icon;
          return (
            <div className="svc-group" key={group.title}>
              <Reveal className="svc-group__head">
                <span className="svc-group__dot" style={DOT_BG[group.tone]}><GroupIcon /></span>
                <h3>{group.title}</h3>
              </Reveal>

              <div className={`grid ${group.items.length === 3 ? "grid-3" : "grid-4"}`}>
                {group.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title} delay={i * 70}>
                      <article className={`svc-card svc-card--${group.tone}`} style={{ height: "100%" }}>
                        <span
                          className={`chip chip--${group.tone}`}
                          style={{ width: 42, height: 42, borderRadius: 13, marginBottom: 14 }}
                        >
                          <Icon style={{ width: 21, height: 21 }} />
                        </span>
                        <h4>{item.title}</h4>
                        <p>{item.body}</p>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          );
        })}

        <Reveal>
          <div className="svc-note">
            <p>Not sure which service is the right fit? That&rsquo;s okay &mdash; we can help you figure it out.</p>
            <Link className="btn btn-primary" href="/contact">Ask a Question <ArrowRight /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
