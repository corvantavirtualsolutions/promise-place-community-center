import Link from "next/link";
import Reveal from "./Reveal";
import { ArrowRight, Chat } from "./Icons";

const STEPS = [
  {
    n: 1,
    title: "Reach Out",
    body: "Contact Promise Place Community Center with your questions or your request for services.",
  },
  {
    n: 2,
    title: "Tell Us What You Need",
    body: "Share a little information about yourself or your family and what type of support you're looking for.",
  },
  {
    n: 3,
    title: "Find the Right Support",
    body: "Our team can provide information about available services and help you understand the next steps.",
  },
];

export default function Process({ hideHead = false }) {
  return (
    <section className="section section--soft" id="get-started">
      <div className="container">
        {!hideHead && (
        <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--sun">How to Get Started</span>
            <h2>Getting started is easy.</h2>
            <p>Three simple steps. No complicated paperwork to begin the conversation.</p>
          </Reveal>
        )}

        <div className="grid grid-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 110}>
              <article className={`step step--${s.n}`}>
                <span className="step__num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="steps-cta">
            <Link className="btn btn-primary" href="/contact">Contact Promise Place <ArrowRight /></Link>
            <Link className="btn btn-secondary" href="/contact"><Chat style={{ width: 19, height: 19 }} /> Ask a Question</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
