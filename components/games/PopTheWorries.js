"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import GameDone from "./GameDone";
import { Cloud } from "./GameIcons";

const WORRIES = [
  "Stress", "Worry", "Fear", "Pressure", "Doubt",
  "Overthinking", "Frustration", "Tension", "Restlessness", "Self-doubt",
];

const TINTS = [
  "#D5F3EC", "#DCEEFC", "#FDF0CC", "#FFE3E0", "#EAE5FD",
  "#A9E7DA", "#BCDFFA", "#FAE3A3", "#FFC7C2", "#D6CDFB",
];

/* Bubbles sit on a loose grid with a little jitter so they scatter naturally.

   Two things here are deliberate and easy to break:

   1. Positions are FRACTIONS of the FREE space (container minus the bubble's
      own size), not plain percentages of the container. A percentage ignores
      the bubble's width, so on a phone the right-hand bubbles ran past the
      edge and got clipped by the container's overflow:hidden.

   2. The column count is responsive. Five columns need ~60px per bubble on a
      375px screen, which is too small to read a word like "Restlessness" and
      made the bubbles pile on top of each other. Narrow screens get three
      columns and a taller field instead (see .bubbles in games.css). */
const WIDE_COLS = 5;
const NARROW_COLS = 3;

function layout(cols) {
  const rows = Math.ceil(WORRIES.length / cols);
  return WORRIES.map((word, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    // a final row may be short; spread whatever it holds across the full width
    const inRow = Math.min(cols, WORRIES.length - row * cols);
    return {
      id: `${word}-${i}`,
      word,
      size: 92 + ((i * 13) % 34),                 // 92-126px, deterministic
      tint: TINTS[i % TINTS.length],
      // 0 = flush left/top of the free space, 1 = flush right/bottom.
      // Kept inside 0.07-0.94 rather than 0-1: the idle float (bfloat) shifts a
      // bubble up to 12px, and a bubble sitting flush against an edge would
      // drift past it and get clipped by the container's overflow:hidden.
      leftF: 0.07 + (inRow === 1 ? 0.42 : (col / (inRow - 1)) * 0.84) + ((i * 7) % 4) / 100,
      topF: 0.07 + (rows === 1 ? 0.42 : (row / (rows - 1)) * 0.84) + ((i * 3) % 4) / 100,
      delay: -(i * 0.8),
      dur: 6.5 + (i % 4) * 0.9,
    };
  });
}

export default function PopTheWorries() {
  const [cols, setCols] = useState(0);            // 0 = not measured yet
  const [popped, setPopped] = useState([]);
  const [popping, setPopping] = useState([]);

  // Positions are derived from `cols`, and which bubbles are gone is tracked
  // separately, so rotating the phone re-flows the field without losing progress.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 620px)");
    const apply = () => setCols(mq.matches ? NARROW_COLS : WIDE_COLS);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const all = useMemo(() => (cols ? layout(cols) : []), [cols]);
  const visible = all.filter((b) => !popped.includes(b.id));
  const released = popped.length;

  const reset = useCallback(() => { setPopped([]); setPopping([]); }, []);

  const pop = (id) => {
    if (popping.includes(id) || popped.includes(id)) return;
    setPopping((p) => [...p, id]);
    // remove after the pop animation so the count updates with the visual
    setTimeout(() => {
      setPopped((p) => (p.includes(id) ? p : [...p, id]));
      setPopping((p) => p.filter((x) => x !== id));
    }, 340);
  };

  if (released === WORRIES.length) {
    return (
      <GameDone
        art={<Cloud />}
        heading="You don't have to carry everything at once."
        message="Setting something down for a moment is allowed — even if it's only for a minute."
        onReplay={reset}
        replayLabel="Start Again"
      />
    );
  }

  return (
    <div>
      <div className="ghud">
        <span>Worries released <b>{released}/{WORRIES.length}</b></span>
      </div>

      <div className="bubbles">
        {visible.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`bubble ${popping.includes(b.id) ? "is-pop" : ""}`}
            onClick={() => pop(b.id)}
            aria-label={`Pop the bubble labelled ${b.word}`}
            style={{
              "--bs": `min(${b.size}px, 24vw)`,
              width: "var(--bs)", height: "var(--bs)",
              left: `calc((100% - var(--bs)) * ${b.leftF.toFixed(3)})`,
              top: `calc((100% - var(--bs)) * ${b.topF.toFixed(3)})`,
              background: b.tint,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.dur}s`,
            }}
          >
            {b.word}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {released} of {WORRIES.length} bubbles popped.
      </p>

      <div className="gactions">
        <button className="btn btn-secondary" type="button" onClick={reset}>Restart</button>
      </div>
    </div>
  );
}
