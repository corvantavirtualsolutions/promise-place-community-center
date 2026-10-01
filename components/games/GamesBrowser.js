"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { GAMES } from "@/components/games/gamesData";
import {
  Balloon, Notes, Stones, Mandala, Heart, Bubbles, Ripple, Face, Words,
  Cairn, Palette, Constellation,
} from "@/components/games/GameIcons";
import { ArrowRight, Search, Close } from "@/components/Icons";

/* Search and filter over the activity list.

   Only this part of the page is a client component. The hero, the notes and the
   call to action below stay on the server, so the page still arrives as HTML
   with all twelve activities in it — which matters both for anyone whose
   JavaScript has not loaded yet and for a search engine reading the page. */

const ART = {
  "balloon-breath": Balloon,
  "sound-garden": Notes,
  "zen-sand-garden": Stones,
  "mandala-maker": Mandala,
  "pop-it": Bubbles,
  "ripple-pond": Ripple,
  "how-am-i-feeling": Face,
  "kind-words": Words,
  "calm-catch": Heart,
  "balance-stones": Cairn,
  "colour-mixer": Palette,
  "constellation-connect": Constellation,
};

/* Read off the data rather than written out by hand, so adding an activity with
   a new kind puts a new filter on the page by itself. First-appearance order
   keeps Breathing first and the one real Game last, which is the order the
   cards are already in. */
const KINDS = [...new Set(GAMES.map((g) => g.kind))];

/* Lowercase, strip accents and punctuation. Someone typing "how am i feeling?"
   or "colour mixer!" should not be punished for it. */
const norm = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/* American spellings, so someone in Indiana typing "color" finds the Colour
   Mixer. Genuine spelling variants only — mapping "anxious" to the breathing
   exercise would be this page pretending to know something about the person
   that it does not. */
const SPELLING = {
  color: "colour", colors: "colour", coloring: "colour", colored: "colour",
  gray: "grey", grey: "gray",
};

export default function GamesBrowser() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");

  const filtered = useMemo(() => {
    const q = norm(query);
    const words = q ? q.split(" ").map((w) => SPELLING[w] || w) : [];
    return GAMES.filter((g) => {
      if (kind !== "all" && g.kind !== kind) return false;
      if (!words.length) return true;
      /* The kind goes into the searchable text too, so typing "breathing"
         finds Balloon Breath even though the word is not in its name. Every
         word has to match somewhere — "sand garden" should not return
         everything with "garden" in it. */
      const hay = norm(`${g.name} ${g.kind} ${g.blurb} ${g.tagline}`);
      return words.every((w) => hay.includes(w));
    });
  }, [query, kind]);

  const isFiltering = kind !== "all" || norm(query).length > 0;
  const clear = () => { setQuery(""); setKind("all"); };

  return (
    <>
      <div className="gfind">
        <div className="gfind__search">
          <Search />
          <label className="sr-only" htmlFor="game-search">Search the activities</label>
          <input
            id="game-search"
            type="search"
            value={query}
            placeholder="Search — try breathing, music, colour&hellip;"
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button type="button" aria-label="Clear the search" onClick={() => setQuery("")}>
              <Close />
            </button>
          )}
        </div>

        <div className="gfind__chips" role="group" aria-label="Filter by kind of activity">
          <button
            type="button"
            className={`gchip ${kind === "all" ? "is-on" : ""}`}
            aria-pressed={kind === "all"}
            onClick={() => setKind("all")}
          >
            Everything
          </button>
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              className={`gchip ${kind === k ? "is-on" : ""}`}
              aria-pressed={kind === k}
              onClick={() => setKind(kind === k ? "all" : k)}
            >
              {k}
            </button>
          ))}
        </div>

        <p className="gfind__count" role="status" aria-live="polite">
          {filtered.length === GAMES.length
            ? `All ${GAMES.length} activities`
            : `${filtered.length} of ${GAMES.length} ${filtered.length === 1 ? "activity" : "activities"}`}
          {isFiltering && (
            <button type="button" className="gfind__clear" onClick={clear}>
              Show everything
            </button>
          )}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="gempty">
          <h3>Nothing matched that</h3>
          <p>
            Try a different word, or browse everything &mdash; there are only twelve,
            so it is no trouble to look through them all.
          </p>
          <button type="button" className="btn btn-secondary" onClick={clear}>
            Show everything
          </button>
        </div>
      ) : (
        <div className="grid grid-3">
          {filtered.map((g, i) => {
            const Art = ART[g.slug];
            const card = (
              <article className={`gcard gcard--${g.tone}`}>
                <div className="gcard__art"><Art /></div>
                <span className="gcard__kind">{g.kind}</span>
                <h3>{g.name}</h3>
                <p>{g.blurb}</p>
                <Link className="btn btn-primary" href={`/mini-games/${g.slug}`}>
                  {g.cta} <ArrowRight />
                </Link>
              </article>
            );
            /* The staggered entrance is lovely once, on arrival. Replaying it on
               every keystroke would mean the results you are trying to read
               fade in and out under you, so once you are searching the cards
               simply appear. */
            return isFiltering ? (
              <div key={g.slug}>{card}</div>
            ) : (
              <Reveal key={g.slug} dir="up" delay={i * 90}>{card}</Reveal>
            );
          })}
        </div>
      )}
    </>
  );
}
