"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GameDone from "./GameDone";

const TOTAL_BREATHS = 5;
const PHASE_MS = 4000;

/* A flower built from parts that appear as breaths are completed, so the
   drawing grows with the exercise rather than just scaling up. */
function Flower({ breaths }) {
  const grow = Math.min(breaths, TOTAL_BREATHS);
  const stemTop = 150 - grow * 18;         // stem lengthens each breath
  const petal = (angle) => (
    <ellipse
      key={angle}
      cx="80" cy="46" rx="13" ry="22"
      fill="#EE6A62"
      transform={`rotate(${angle} 80 68)`}
    />
  );
  const petals = [0, 72, 144, 216, 288].slice(0, grow);

  return (
    <svg viewBox="0 0 160 170" className="breathe__flower" role="img"
         aria-label={`Flower with ${grow} of ${TOTAL_BREATHS} petals`}>
      <ellipse cx="80" cy="160" rx="46" ry="8" fill="#A9E7DA" opacity=".6" />
      <path d={`M80 160 L80 ${stemTop}`} stroke="#0C7267" strokeWidth="6" strokeLinecap="round" />
      {grow >= 2 && (
        <path d={`M80 ${stemTop + 44} C58 ${stemTop + 38} 50 ${stemTop + 20} 52 ${stemTop + 8}
                  C68 ${stemTop + 12} 78 ${stemTop + 28} 80 ${stemTop + 44}Z`} fill="#14A894" />
      )}
      {grow >= 3 && (
        <path d={`M80 ${stemTop + 62} C102 ${stemTop + 56} 110 ${stemTop + 38} 108 ${stemTop + 26}
                  C92 ${stemTop + 30} 82 ${stemTop + 46} 80 ${stemTop + 62}Z`} fill="#3ECFB6" />
      )}
      <g transform={`translate(0 ${stemTop - 68})`}>
        {petals.map(petal)}
        <circle cx="80" cy="68" r={grow ? 15 : 9} fill={grow ? "#F5CE63" : "#0C7267"} />
      </g>
    </svg>
  );
}

export default function BreatheAndGrow() {
  const [phase, setPhase] = useState("idle");   // idle | in | out | done
  const [breaths, setBreaths] = useState(0);
  const timer = useRef(null);

  const clear = () => { if (timer.current) { clearTimeout(timer.current); timer.current = null; } };

  useEffect(() => clear, []);

  // Drive the cycle: inhale -> exhale -> count a breath -> repeat or finish.
  useEffect(() => {
    if (phase === "in") {
      timer.current = setTimeout(() => setPhase("out"), PHASE_MS);
    } else if (phase === "out") {
      timer.current = setTimeout(() => {
        setBreaths((n) => {
          const next = n + 1;
          setPhase(next >= TOTAL_BREATHS ? "done" : "in");
          return next;
        });
      }, PHASE_MS);
    }
    return clear;
  }, [phase]);

  const start = useCallback(() => { setBreaths(0); setPhase("in"); }, []);
  const reset = useCallback(() => { clear(); setBreaths(0); setPhase("idle"); }, []);

  if (phase === "done") {
    return (
      <GameDone
        art={<Flower breaths={TOTAL_BREATHS} />}
        heading="You took a moment for yourself. Well done."
        message="That was five slow breaths. You can come back to this whenever you need to."
        onReplay={start}
      />
    );
  }

  const cue = phase === "in" ? "Breathe in" : phase === "out" ? "Breathe out" : "Ready when you are";

  return (
    <div className="breathe">
      <div className="ghud">
        <span>Breaths completed <b>{breaths}/{TOTAL_BREATHS}</b></span>
      </div>

      <div
        className={`breathe__ring ${phase === "in" ? "is-in" : phase === "out" ? "is-out" : ""}`}
        aria-hidden="true"
      >
        <div className="breathe__cue">
          {cue}
          {phase !== "idle" && <span className="breathe__count">4 seconds</span>}
        </div>
      </div>

      {/* Announced to screen readers without relying on the animation */}
      <p className="sr-only" role="status" aria-live="polite">
        {phase === "idle" ? "Not started" : `${cue}. Breath ${breaths + 1} of ${TOTAL_BREATHS}.`}
      </p>

      <Flower breaths={breaths} />

      <div className="gactions" style={{ marginTop: 6 }}>
        {phase === "idle" ? (
          <button className="btn btn-primary" type="button" onClick={start}>Start Breathing</button>
        ) : (
          <button className="btn btn-secondary" type="button" onClick={reset}>Restart</button>
        )}
      </div>
    </div>
  );
}
