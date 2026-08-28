import Reveal from "./Reveal";

/* Banner at the top of every interior page. Carries the page's single h1. */
export default function PageHero({ eyebrow, title, lede, tone = "teal" }) {
  return (
    <section className={`page-hero page-hero--${tone}`}>
      <span className="blob blob--sun"   style={{ width: 210, height: 210, top: "-80px", right: "12%" }} aria-hidden="true" />
      <span className="blob blob--coral" style={{ width: 160, height: 160, bottom: "-70px", left: "-40px" }} aria-hidden="true" />

      <div className="container">
        <Reveal>
          {eyebrow && <span className={`eyebrow eyebrow--${tone}`}>{eyebrow}</span>}
          <h1>{title}</h1>
          {lede && <p className="page-hero__lede">{lede}</p>}
        </Reveal>
      </div>
    </section>
  );
}
