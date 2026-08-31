"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GameDone from "./GameDone";
import { Balloon } from "./GameIcons";

/* Press and hold to inflate, let go to exhale.

   The point of doing it this way: the old version animated a ring on a timer
   and asked you to follow along, which gave you nothing to do and no way to
   tell whether you were doing it right. Here your finger IS the breath — the
   balloon only grows while you are holding, so the in/out rhythm is obvious
   without reading a word of instruction. */

const INHALE_MS = 4000;   // hold this long to fill the balloon completely
const EXHALE_MS = 4200;   // how long the balloon takes to drift away
const TOTAL_BREATHS = 5;
const MIN_FILL = 0.3;     // below this it doesn't count — no penalty, just a nudge

const COLORS = ["#5FBFA8", "#7FB6EA", "#F0A0B4", "#F5CE63", "#A78BE8"];

const LABEL = {
  ready: "Press and hold",
  inflating: "Breathe in…",
  exhale: "Breathe out…",
  short: "Hold a little longer next time",
};

export default function BalloonBreath() {
  const [phase, setPhase] = useState("ready");
  const [fill, setFill] = useState(0);
  const [breaths, setBreaths] = useState(0);
  const [done, setDone] = useState(false);

  // mirrors of state that the rAF loop and the release handler need to read
  // without being re-created on every frame
  const fillRef = useRef(0);
  const phaseRef = useRef("ready");
  const raf = useRef(0);
  const timer = useRef(null);

  const setPhaseBoth = (p) => { phaseRef.current = p; setPhase(p); };
  const setFillBoth = (v) => { fillRef.current = v; setFill(v); };

  const clearTimer = () => { if (timer.current) { clearTimeout(timer.current); timer.current = null; } };

  useEffect(() => () => { cancelAnimationFrame(raf.current); clearTimer(); }, []);

  const beginHold = useCallback(() => {
    if (phaseRef.current !== "ready" && phaseRef.current !== "short") return;
    clearTimer();
    setFillBoth(0);
    setPhaseBoth("inflating");
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / INHALE_MS);
      setFillBoth(p);
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  const endHold = useCallback(() => {
    if (phaseRef.current !== "inflating") return;
    cancelAnimationFrame(raf.current);

    if (fillRef.current < MIN_FILL) {
      setPhaseBoth("short");
      timer.current = setTimeout(() => { setFillBoth(0); setPhaseBoth("ready"); }, 1100);
      return;
    }

    setPhaseBoth("exhale");
    const n = breaths + 1;
    setBreaths(n);
    timer.current = setTimeout(() => {
      setFillBoth(0);
      if (n >= TOTAL_BREATHS) setDone(true);
      else setPhaseBoth("ready");
    }, EXHALE_MS);
  }, [breaths]);

  // releasing outside the button still has to end the breath
  useEffect(() => {
    if (phase !== "inflating") return;
    const up = () => endHold();
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [phase, endHold]);

  const replay = () => {
    clearTimer();
    cancelAnimationFrame(raf.current);
    setBreaths(0); setFillBoth(0); setPhaseBoth("ready"); setDone(false);
  };

  if (done) {
    return (
      <GameDone
        art={<Balloon />}
        heading="Five slow breaths. That's the whole thing."
        message="You can come back to this any time — waiting rooms, before bed, or whenever the day gets loud."
        onReplay={replay}
      />
    );
  }

  const colour = COLORS[breaths % COLORS.length];
  const scale = 0.34 + fill * 0.66;
  const exhaling = phase === "exhale";

  return (
    <div>
      <div className="ghud">
        <span>Breaths <b>{breaths}/{TOTAL_BREATHS}</b></span>
      </div>

      <button
        type="button"
        className={`bb ${exhaling ? "is-exhale" : ""} ${phase === "inflating" ? "is-holding" : ""}`}
        onPointerDown={(e) => { e.preventDefault(); beginHold(); }}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") { e.preventDefault(); if (!e.repeat) beginHold(); }
        }}
        onKeyUp={(e) => {
          if (e.key === " " || e.key === "Enter") { e.preventDefault(); endHold(); }
        }}
        aria-label="Press and hold to breathe in, release to breathe out"
      >
        {/* the dotted outline shows how big a full breath is, so there is a target */}
        <span className="bb__target" aria-hidden="true" />

        <svg className="bb__balloon" viewBox="0 0 200 280" aria-hidden="true"
             style={{ transform: `scale(${exhaling ? scale : scale})` }}>
          <ellipse cx="100" cy="100" rx="68" ry="82" fill={colour} />
          <ellipse cx="74" cy="68" rx="15" ry="25" fill="#fff" opacity=".3"
                   transform="rotate(-20 74 68)" />
          <path d="M91 180h18l-9 13Z" fill="rgba(0,0,0,.16)" />
          <path d="M100 195c0 24-20 26-20 50" stroke="#9AAAB5" strokeWidth="3"
                fill="none" strokeLinecap="round" />
        </svg>

        <span className={`bb__label ${phase === "short" ? "is-hint" : ""}`}>{LABEL[phase]}</span>
      </button>

      <p className="sr-only" role="status" aria-live="polite">
        {breaths} of {TOTAL_BREATHS} breaths taken. {LABEL[phase]}.
      </p>
    </div>
  );
}
