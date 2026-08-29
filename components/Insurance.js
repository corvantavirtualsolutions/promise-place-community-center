import Link from "next/link";
import Reveal from "./Reveal";
import { InsuranceArt } from "./Illustrations";
import { Shield, Handshake, Heart, Info, ArrowRight } from "./Icons";

const OPTIONS = [
  { icon: Shield,    tone: "teal", title: "Medicaid Accepted",             body: "We accept Medicaid for our services." },
  { icon: Handshake, tone: "sky",  title: "Commercial Insurance Accepted", body: "We accept commercial insurance plans." },
  { icon: Heart,     tone: "sun",  title: "Sliding Scale Available",       body: "Sliding-scale services are available to help cover costs." },
];

export default function Insurance({ hideHead = false }) {
  return (
    <section className="section section--cream" id="insurance">
      <span className="blob blob--sky" style={{ width: 260, height: 260, bottom: "-90px", left: "-80px" }} aria-hidden="true" />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {!hideHead && (
          <Reveal className="section-head">
            <span className="eyebrow eyebrow--sky">Insurance &amp; Payment</span>
            <h2>Care that works with your needs.</h2>
            <p>
              We believe getting mental health support should be as accessible as
              possible. Promise Place Community Center accepts Medicaid and
              commercial insurance, and offers sliding-scale services to help make
              care more accessible.
            </p>
          </Reveal>
        )}

        <Reveal dir="scale">
          <div style={{ maxWidth: 420, margin: "0 auto clamp(30px, 4vw, 46px)" }}>
            <InsuranceArt title="An illustration of a shield with a heart, alongside two insurance cards" />
          </div>
        </Reveal>

        <div className="grid grid-3">
          {OPTIONS.map((o, i) => {
            const Icon = o.icon;
            return (
              <Reveal key={o.title} dir="up" delay={i * 110}>
                <article className={`card card--hover card--center card--${o.tone}`}>
                  <span className={`chip chip--${o.tone}`}><Icon /></span>
                  <h3>{o.title}</h3>
                  <p>{o.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal dir="fade">
          <div className="disclaimer">
            <Info />
            <p style={{ margin: 0 }}>
              Coverage and eligibility may vary. Contact us to discuss your
              individual situation.
            </p>
          </div>
        </Reveal>

        <Reveal dir="up">
          <div className="btn-row btn-row--center" style={{ marginTop: 32 }}>
            <Link className="btn btn-primary" href="/contact">Talk With Our Team <ArrowRight /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
