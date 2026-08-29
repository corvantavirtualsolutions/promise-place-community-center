import Link from "next/link";
import Reveal from "./Reveal";
import { StepsArt } from "./Illustrations";
import { ArrowRight, Chat } from "./Icons";

const STEPS = [
  { n: 1, tone: "teal", title: "Reach Out",
    body: "Contact Promise Place Community Center with your questions or your request for services." },
  { n: 2, tone: "sky",  title: "Tell Us What You Need",
    body: "Share a little information about yourself or your family and what type of support you're looking for." },
  { n: 3, tone: "sun",  title: "Find the Right Support",
    body: "Our team can provide information about available services and help you understand the next steps." },
];

export default function Process({ hideHead = false }) {
  return (
    <section className="section section--sky" id="get-started">
      <div className="container">
        {!hideHead && (
          <Reveal className="section-head">
            <span className="eyebrow eyebrow--sun">How to Get Started</span>
            <h2>Getting started is easy.</h2>
            <p>Three simple steps. No complicated paperwork to begin the conversation.</p>
          </Reveal>
        )}

        <Reveal dir="fade">
          <div style={{ maxWidth: 440, margin: "0 auto clamp(28px, 3.5vw, 44px)" }}>
            <StepsArt title="An illustration of three connected steps along a path" />
          </div>
        </Reveal>

        <div className="grid grid-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} dir="up" delay={i * 120}>
              <article className={`card card--hover card--center step step--${s.n} card--${s.tone}`}>
                <span className="step__num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal dir="up">
          <div className="btn-row btn-row--center" style={{ marginTop: "clamp(32px, 4vw, 46px)" }}>
            <Link className="btn btn-primary" href="/contact">Contact Promise Place <ArrowRight /></Link>
            <Link className="btn btn-secondary" href="/contact"><Chat /> Ask a Question</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
