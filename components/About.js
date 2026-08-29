import Link from "next/link";
import Reveal from "./Reveal";
import { AboutArt } from "./Illustrations";
import { Heart, Users, Handshake, Home, ArrowRight } from "./Icons";

const VALUES = [
  { icon: Heart,     tone: "coral", title: "Compassionate Care",
    body: "We create a welcoming environment where individuals and families can feel heard, supported, and respected." },
  { icon: Users,     tone: "teal",  title: "Family Focused",
    body: "Our services support children, adults, parents, and families through different stages of life." },
  { icon: Handshake, tone: "sky",   title: "Accessible Support",
    body: "We work to make mental health services more accessible through insurance options, Medicaid, commercial insurance, and sliding-scale services." },
  { icon: Home,      tone: "grape", title: "Community Based",
    body: "We provide services designed around the real needs of the communities and families we serve." },
];

export default function About({ hideHead = false, moreLink = false }) {
  return (
    <section className="section section--mint" id="about">
      <div className="container">
        <Reveal className="section-head">
          {!hideHead && (
            <>
              <span className="eyebrow">About Promise Place</span>
              <h2>A welcoming place to start.</h2>
            </>
          )}
          <p>
            Promise Place Community Center is a community-based outpatient mental
            health facility serving families throughout Indiana. We work with both
            adults and children, with the goal of addressing gaps in mental health
            care and providing quality, innovative, and accessible services to
            families in need.
          </p>
        </Reveal>

        <div className="about__grid" style={{ marginBottom: "clamp(34px, 4.5vw, 56px)" }}>
          <Reveal dir="left">
            <AboutArt title="An illustration of two people talking together in a bright, welcoming room" />
          </Reveal>

          <Reveal dir="right" delay={100}>
            <div className="about__quote" style={{ marginTop: 0 }}>
              <p>&ldquo;Addressing your mental health doesn&rsquo;t have to be difficult, intimidating, or overwhelming.&rdquo;</p>
              <p className="about__quote-sub">
                That belief shapes everything we do &mdash; from how we answer your
                first question to how we support your family over time.
              </p>
            </div>
            {moreLink && (
              <div className="btn-row" style={{ marginTop: 22 }}>
                <Link className="btn btn-secondary" href="/about">
                  More About Promise Place <ArrowRight />
                </Link>
              </div>
            )}
          </Reveal>
        </div>

        <div className="grid grid-4">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} dir="up" delay={i * 90}>
                <article className={`card card--hover card--center card--${v.tone}`}>
                  <span className={`chip chip--${v.tone}`}><Icon /></span>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
