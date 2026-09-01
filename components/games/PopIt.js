"use client";

import { useCallback, useMemo, useState } from "react";

/* A board of bubbles to press, and nothing else.

   The one rule this has to obey is that a press must register instantly and
   feel like it went in — that is the entire appeal of the physical toy. So the
   press is handled on POINTER DOWN, not click: waiting for the release adds a
   lag you can feel, and a real Pop It pops on the way down.

   Dragging across the board pops everything the finger crosses, which is how
   people actually use one. */

const COLS = 6;
const ROWS = 7;
const TOTAL = COLS * ROWS;

/* Rows cycle through the palette so a half-popped board still looks deliberate. */
const TINTS = ["#5FBFA8", "#7FB6EA", "#A78BE8", "#F0A0B4", "#F5CE63", "#8FB86B", "#EE8F88"];

export default function PopIt() {
  const [popped, setPopped] = useState(() => new Set());
  const [flips, setFlips] = useState(0);
  const [total, setTotal] = useState(0);

  const cells = useMemo(() => Array.from({ length: TOTAL }, (_, i) => i), []);

  const pop = useCallback((i) => {
    setPopped((prev) => {
      if (prev.has(i)) return prev;          // already in; don't re-count
      const next = new Set(prev);
      next.add(i);
      setTotal((t) => t + 1);
      /* A short buzz on phones that support it. Silent everywhere else, and
         wrapped because some browsers expose vibrate() but refuse to run it. */
      try { navigator.vibrate?.(12); } catch { /* not available */ }

      if (next.size === TOTAL) {
        // board finished — flip it and start over, like turning the real toy
        setTimeout(() => { setPopped(new Set()); setFlips((f) => f + 1); }, 480);
      }
      return next;
    });
  }, []);

  const reset = () => { setPopped(new Set()); };

  return (
    <div>
      <div className="ghud">
        <span>Popped <b>{total}</b></span>
        {flips > 0 && <span>Boards finished <b>{flips}</b></span>}
      </div>

      <div
        className="popit"
        role="group"
        aria-label={`Bubble board, ${TOTAL} bubbles. ${popped.size} popped.`}
        style={{ "--cols": COLS }}
      >
        {cells.map((i) => {
          const isPopped = popped.has(i);
          return (
            <button
              key={i}
              type="button"
              className={`popit__b ${isPopped ? "is-in" : ""}`}
              style={{ "--tint": TINTS[Math.floor(i / COLS) % TINTS.length] }}
              aria-pressed={isPopped}
              aria-label={`Bubble ${i + 1}`}
              // down, not click: a Pop It pops on the way in
              onPointerDown={() => pop(i)}
              // buttons already fire on Enter/Space for keyboard users
              onPointerEnter={(e) => { if (e.buttons) pop(i); }}
            />
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {popped.size} of {TOTAL} bubbles popped.
      </p>

      <div className="gactions">
        <button className="btn btn-secondary" type="button" onClick={reset}>
          Flip the board
        </button>
      </div>
    </div>
  );
}
