import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import { GAMES } from "@/components/games/gamesData";
import { Balloon, Notes, Stones, Mandala, Heart } from "@/components/games/GameIcons";
import { Info, ArrowRight, Sparkle } from "@/components/Icons";

export const metadata = {
  title: "Mini Games",
  description:
    "Five calming mini activities from Promise Place Community Center — a breathing exercise, music, sand, drawing and one gentle game. Free, no sign-up, playable in your browser.",
};

const ART = {
  "balloon-breath": Balloon,
  "sound-garden": Notes,
  "zen-sand-garden": Stones,
  "mandala-maker": Mandala,
  "calm-catch": Heart,
};

export default function MiniGamesPage() {
  return (
    <>
      <PageHero
        eyebrow="Mini Games"
        title="Mini Games"
        lede="A few small things to do when you need a pause. Only one of them is really a game — the rest are for breathing, making music, or making something of your own."
        tone="grape"
      />

      <section className="section section--white">
        <div className="container">
          <div className="grid grid-3">
            {GAMES.map((g, i) => {
              const Art = ART[g.slug];
              return (
                <Reveal key={g.slug} dir="up" delay={i * 90}>
                  <article className={`gcard gcard--${g.tone}`}>
                    <div className="gcard__art"><Art /></div>
                    <span className="gcard__kind">{g.kind}</span>
                    <h3>{g.name}</h3>
                    <p>{g.blurb}</p>
                    <Link className="btn btn-primary" href={`/mini-games/${g.slug}`}>
                      {g.cta} <ArrowRight />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal dir="fade">
            <div className="more-games">
              <Sparkle />
              <h3>More mini games are on the way</h3>
              <p>
                We&rsquo;re adding new ones for you to enjoy and unwind with, so check back
                whenever you need a few quiet minutes.
              </p>
              <p className="more-games__offer">
                We can also create mini games for your kids or your students.
                If you have an idea, we&rsquo;d love to hear it &mdash;{" "}
                <Link href="/contact">get in touch with our team</Link>.
              </p>
            </div>
          </Reveal>

          <Reveal dir="fade">
            <div className="games-note">
              <Info />
              <p>
                These activities are provided for relaxation, engagement, and general
                wellness. They are not a substitute for professional mental health care
                or emergency services.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Looking for real support?"
        body="These are a nice pause, but if something heavier is going on, our team is here to talk."
        primary={{ href: "/contact", label: "Contact Promise Place" }}
        secondary={{ href: "/services", label: "See Our Services" }}
      />
    </>
  );
}
