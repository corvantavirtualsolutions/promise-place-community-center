import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ArrowRight } from "@/components/Icons";

/* Shared frame for every game: page banner, the game panel, instructions and
   the two buttons every game needs. Keeps the five games visually identical. */
export default function GameShell({
  eyebrow = "Wellness Games",
  title,
  blurb,
  tone = "teal",
  instructions,
  wide = false,
  children,
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lede={blurb} tone={tone} />

      <section className="section section--white">
        <div className="container">
          <div className={`gpanel ${wide ? "gpanel--wide" : ""}`}>{children}</div>

          {instructions && (
            <p className="ghelp">{instructions}</p>
          )}

          <div className="gactions">
            <Link className="btn btn-secondary" href="/wellness-games">
              Back to Wellness Games
            </Link>
            <Link className="btn btn-primary" href="/contact">
              Talk With Our Team <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
