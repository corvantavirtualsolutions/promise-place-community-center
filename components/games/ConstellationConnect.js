"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* A night sky you can join up however you like.

   SVG rather than canvas, deliberately. Every star is a real <button> in the
   document, so it can be reached with Tab, pressed with the keyboard, and
   announced by a screen reader — none of which a canvas gives you without
   rebuilding all three by hand. The sky is small enough that the DOM cost is
   nothing.

   There is no correct constellation. The activity is the joining. */

const STAR_COUNT = 26;
const VB = { w: 100, h: 68 };   // viewBox units; the SVG scales to its container

/* Seeded so a sky can be regenerated on demand but is stable across re-renders.
   Math.random() in the render path would reshuffle the stars every time React
   repainted, which would be unusable. */
function makeSky(seed) {
  let s = seed >>> 0;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const stars = [];
  let guard = 0;
  while (stars.length < STAR_COUNT && guard++ < 2000) {
    const x = 6 + rnd() * (VB.w - 12);
    const y = 6 + rnd() * (VB.h - 12);
    /* Keep them apart. Two stars a millimetre apart on a phone are one
       ambiguous tap target, and the sky looks like a smudge. */
    if (stars.some((p) => Math.hypot(p.x - x, p.y - y) < 9)) continue;
    stars.push({ id: stars.length, x, y, r: 0.9 + rnd() * 0.9, twinkle: rnd() * 4 });
  }
  return stars;
}

export default function ConstellationConnect() {
  const [seed, setSeed] = useState(7);
  const [lines, setLines] = useState([]);
  const [from, setFrom] = useState(null);
  const [title, setTitle] = useState("");
  const [reduced, setReduced] = useState(false);
  const live = useRef(null);

  const stars = useMemo(() => makeSky(seed), [seed]);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const tap = useCallback((star) => {
    if (from === null) { setFrom(star.id); return; }
    if (from === star.id) { setFrom(null); return; }          // tap again to let go
    const key = [from, star.id].sort((a, b) => a - b).join("-");
    setLines((ls) => (ls.some((l) => l.key === key) ? ls : [...ls, { key, a: from, b: star.id }]));
    /* Chaining: the star you just reached becomes the next starting point, so a
       long line is a run of single taps rather than pairs of them. */
    setFrom(star.id);
  }, [from]);

  const joined = useMemo(() => {
    const s = new Set();
    lines.forEach((l) => { s.add(l.a); s.add(l.b); });
    return s;
  }, [lines]);

  const byId = useMemo(() => Object.fromEntries(stars.map((s) => [s.id, s])), [stars]);

  return (
    <div>
      <div className="ghud">
        <span>Stars joined <b>{joined.size}</b></span>
        <span>Lines <b>{lines.length}</b></span>
      </div>

      <div className="sky">
        <svg className="sky__svg" viewBox={`0 0 ${VB.w} ${VB.h}`} role="group"
             aria-label="A night sky. Choose a star, then choose another to join them with a line.">
          <defs>
            <radialGradient id="skyglow" cx="50%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#2A3C6B" />
              <stop offset="100%" stopColor="#111C36" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width={VB.w} height={VB.h} fill="url(#skyglow)" />

          {lines.map((l) => (
            <line
              key={l.key}
              x1={byId[l.a].x} y1={byId[l.a].y}
              x2={byId[l.b].x} y2={byId[l.b].y}
              stroke="#BFD7FF" strokeWidth="0.45" strokeLinecap="round" opacity=".75"
            />
          ))}

          {stars.map((s) => {
            const isFrom = from === s.id;
            const isJoined = joined.has(s.id);
            return (
              <g key={s.id}>
                {(isFrom || isJoined) && (
                  <circle cx={s.x} cy={s.y} r={s.r + 1.7} fill="#8FB8FF"
                          opacity={isFrom ? ".45" : ".22"} />
                )}
                <circle
                  cx={s.x} cy={s.y} r={s.r}
                  fill={isFrom ? "#FFF3C4" : "#F4F8FF"}
                  style={reduced ? undefined : {
                    animation: `twinkle 3.6s ease-in-out ${s.twinkle}s infinite`,
                  }}
                />
                {/* A 3-unit invisible disc over each star: the drawn star is
                    under a millimetre wide, which no finger can hit. */}
                <circle
                  className="sky__hit"
                  cx={s.x} cy={s.y} r="3"
                  role="button" tabIndex={0}
                  aria-label={isFrom ? `Star ${s.id + 1}, chosen` : `Star ${s.id + 1}`}
                  aria-pressed={isFrom}
                  onClick={() => tap(s)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tap(s); }
                  }}
                />
              </g>
            );
          })}
        </svg>

        {title.trim() && <p className="sky__name">{title.trim()}</p>}
      </div>

      <div className="sky__namebox">
        <label htmlFor="cc-name">Name your constellation</label>
        <input
          id="cc-name"
          type="text"
          maxLength={40}
          value={title}
          placeholder="The Quiet Bear"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="sg__controls">
        <button
          className="btn btn-secondary" type="button"
          onClick={() => { setLines([]); setFrom(null); }}
        >
          Clear the lines
        </button>
        <button
          className="btn btn-secondary" type="button"
          onClick={() => {
            setSeed((s) => (s * 31 + 17) >>> 0);
            setLines([]); setFrom(null); setTitle("");
          }}
        >
          A different sky
        </button>
      </div>

      <p className="gnote" ref={live} role="status" aria-live="polite">
        {from === null
          ? "Choose any star to begin."
          : "Now choose another star to join it to."}
      </p>
    </div>
  );
}
