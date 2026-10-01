import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import GamesBrowser from "@/components/games/GamesBrowser";
import { Info, Sparkle } from "@/components/Icons";

export const metadata = {
  title: "Mini Games",
  description:
    "Twelve calming mini activities from Promise Place Community Center — breathing, music, sand, drawing, colour, stars, fidgets, feelings and one gentle game. Free, no sign-up, playable in your browser.",
};


export default function MiniGamesPage() {
  return (
    <>
      <PageHero
        eyebrow="Mini Games"
        title="Mini Games"
        lede="A few small things to do when you need a pause. Only one of them is really a game — the rest are for breathing, fidgeting, making something, or putting a name to how you feel."
        tone="grape"
      />

      <section className="section section--white">
        <div className="container">
          <GamesBrowser />

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
