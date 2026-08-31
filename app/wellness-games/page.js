import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import { GAMES } from "@/components/games/gamesData";
import { Balloon, Notes, Stones, Mandala, Heart } from "@/components/games/GameIcons";
import { Info, ArrowRight } from "@/components/Icons";

export const metadata = {
  title: "Wellness Games",
  description:
    "Five calming activities from Promise Place Community Center — breathing, music, sand, drawing and a gentle catching game. Free, no sign-up, playable in your browser.",
};

const ART = {
  "balloon-breath": Balloon,
  "sound-garden": Notes,
  "zen-sand-garden": Stones,
  "mandala-maker": Mandala,
  "calm-catch": Heart,
};

export default function WellnessGamesPage() {
  return (
    <>
      <PageHero
        eyebrow="Wellness Games"
        title="Wellness Games"
        lede="Take a moment for yourself. Play, breathe, create, and relax."
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
                    <h3>{g.name}</h3>
                    <p>{g.blurb}</p>
                    <Link className="btn btn-primary" href={`/wellness-games/${g.slug}`}>
                      Play Game <ArrowRight />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>

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
        body="Games are a nice pause, but if something heavier is going on, our team is here to talk."
        primary={{ href: "/contact", label: "Contact Promise Place" }}
        secondary={{ href: "/services", label: "See Our Services" }}
      />
    </>
  );
}
