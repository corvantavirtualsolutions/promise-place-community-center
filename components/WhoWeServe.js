import Reveal from "./Reveal";
import { ChildArt, AdultArt, FamilyArt, SchoolCardArt } from "./Illustrations";

const GROUPS = [
  { art: ChildArt,      tone: "teal",  title: "Children",
    body: "Mental health and behavioral support designed to help children navigate challenges." },
  { art: AdultArt,      tone: "coral", title: "Adults",
    body: "Mental health and supportive services for adults." },
  { art: FamilyArt,     tone: "sun",   title: "Families",
    body: "Services designed to support family well-being and address challenges together." },
  { art: SchoolCardArt, tone: "grape", title: "Schools",
    body: "School-based mental health and behavioral support." },
];

export default function WhoWeServe({ hideHead = false }) {
  return (
    <section className="section section--blush" id="who-we-serve">
      <div className="container">
        {!hideHead && (
          <Reveal className="section-head">
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
            const Art = g.art;
            return (
              <Reveal key={g.title} dir="scale" delay={i * 100}>
                <article className={`card card--hover card--center serve-card card--${g.tone}`}>
                  <div className="serve-card__art"><Art /></div>
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
