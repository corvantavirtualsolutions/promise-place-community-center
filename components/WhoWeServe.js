import Reveal from "./Reveal";
import { Smile, Users, Heart, School } from "./Icons";

const GROUPS = [
  {
    icon: Smile,
    tone: "teal",
    title: "Children",
    body: "Mental health and behavioral support designed to help children navigate challenges.",
  },
  {
    icon: Heart,
    tone: "coral",
    title: "Adults",
    body: "Mental health and supportive services for adults.",
  },
  {
    icon: Users,
    tone: "sun",
    title: "Families",
    body: "Services designed to support family well-being and address challenges together.",
  },
  {
    icon: School,
    tone: "grape",
    title: "Schools",
    body: "School-based mental health and behavioral support.",
  },
];

const CARD_TONE = { teal: "teal", coral: "sun", sun: "sky", grape: "grape" };

export default function WhoWeServe({ hideHead = false }) {
  return (
    <section className="section section--warm" id="who-we-serve">
      <div className="container">
        {!hideHead && (
        <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--coral">Who We Serve</span>
            <h2>Support for every member of the family.</h2>
            <p>
              Mental health looks different at every age. Promise Place works with
              children, adults, families, and schools across Indiana.
            </p>
          </Reveal>
        )}

        <div className="grid grid-4">
          {GROUPS.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.title} delay={i * 90}>
                <article className={`serve-card serve-card--${CARD_TONE[g.tone]}`} style={{ height: "100%" }}>
                  <span className={`chip chip--${g.tone}`}><Icon /></span>
                  <h3>{g.title}</h3>
                  <p>{g.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
