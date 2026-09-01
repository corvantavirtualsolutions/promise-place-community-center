"use client";

import { useState } from "react";

/* Fridge-magnet word tiles, arranged into a sentence.

   Tap to add, tap again in the sentence to take it back out. Deliberately NOT
   drag-and-drop: dragging is fiddly with a finger, near-impossible with a
   keyboard, and the fridge-magnet feel comes from the look of the tiles rather
   than from having to slide them.

   The word bank is the design. Every tile is warm or neutral, so a sentence
   built from them lands somewhere kind no matter how they are combined — the
   same idea as Sound Garden's scale, where you cannot play a wrong note. */

const BANK = {
  "Who": ["I", "You", "We", "My family", "Someone", "Everyone"],
  "Doing": ["am", "are", "is", "can be", "will be", "deserve", "deserves", "feel", "feels"],
  /* Every phrase here has to work after any subject in the "Who" row. An
     earlier draft had "doing my best", which produced "You are doing my best"
     — the tiles get combined freely, so nothing may assume who is speaking. */
  "Warm words": ["kind", "brave", "enough", "loved", "safe", "trying", "learning", "getting better", "worth it", "not alone", "allowed to rest", "doing okay"],
  "Little words": ["really", "always", "still", "today", "here", "and", "even on hard days", "more than enough"],
};

const STARTERS = [
  ["I", "am", "enough"],
  ["We", "are", "not alone"],
  ["You", "are", "doing okay"],
  ["I", "am", "still", "learning"],
];

export default function KindWords() {
  const [line, setLine] = useState(["I", "am", "still", "here"]);

  const add = (w) => setLine((l) => (l.length >= 12 ? l : [...l, w]));
  const removeAt = (i) => setLine((l) => l.filter((_, n) => n !== i));

  return (
    <div>
      <div className="ghud">
        <span>Words used <b>{line.length}</b></span>
      </div>

      {/* the fridge */}
      <div className="kw__strip" role="group" aria-label="Your sentence">
        {line.length === 0 ? (
          <p className="kw__empty">Tap words below to start your sentence.</p>
        ) : (
          line.map((w, i) => (
            <button
              key={`${w}-${i}`}
              type="button"
              className="kw__tile kw__tile--placed"
              onClick={() => removeAt(i)}
              aria-label={`Remove "${w}" from your sentence`}
            >
              {w}
            </button>
          ))
        )}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Your sentence: {line.join(" ") || "empty"}.
      </p>

      {Object.entries(BANK).map(([group, words]) => (
        <div className="kw__group" key={group}>
          <span className="kw__label">{group}</span>
          <div className="kw__bank">
            {words.map((w) => (
              <button
                key={w}
                type="button"
                className="kw__tile"
                onClick={() => add(w)}
                aria-label={`Add "${w}" to your sentence`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="sg__controls">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setLine(STARTERS[Math.floor(Math.random() * STARTERS.length)])}
        >
          Give me a start
        </button>
        <button className="btn btn-secondary" type="button" onClick={() => setLine([])}>
          Clear the fridge
        </button>
      </div>
    </div>
  );
}
