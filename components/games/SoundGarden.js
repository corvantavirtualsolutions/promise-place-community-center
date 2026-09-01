"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Tap squares to plant notes; a playhead sweeps across and plays them back.

   Every row is a note from the C major pentatonic scale, which has no semitone
   clashes in it — so any combination of squares sounds consonant. That is the
   whole design: a visitor cannot make this sound bad, so there is nothing to
   get wrong and nothing to explain.

   Sound is generated with the Web Audio API (oscillators), so there are no
   audio files, no network requests and no dependencies. Nothing plays until
   the visitor presses Play. */

const ROWS = [
  { name: "A", freq: 440.0 },
  { name: "G", freq: 392.0 },
  { name: "E", freq: 329.63 },
  { name: "D", freq: 293.66 },
  { name: "C", freq: 261.63 },
];
const STEPS = 8;
const STEP_MS = 380;

const TINTS = ["#A78BE8", "#7FB6EA", "#5FBFA8", "#F5CE63", "#F0A0B4"];

/* 0.05s of silence, 8kHz mono. Inlined so there is no audio file to fetch.
   See unlockPhoneAudio() below for why a silent clip is needed at all. */
const SILENT_WAV =
  "data:audio/wav;base64,UklGRrQBAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YZABAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA";

const emptyGrid = () => ROWS.map(() => Array(STEPS).fill(false));

/* A few starting patterns, so the grid is never blank and staring at you. */
const SEEDS = [
  [[0,4],[1,2],[2,0],[2,6],[3,3],[4,0],[4,5]],
  [[0,2],[0,6],[1,4],[2,1],[2,5],[3,7],[4,0],[4,3]],
  [[0,0],[1,3],[1,7],[2,2],[3,5],[4,1],[4,6]],
];

function seededGrid(which) {
  const g = emptyGrid();
  SEEDS[which % SEEDS.length].forEach(([r, c]) => { g[r][c] = true; });
  return g;
}

export default function SoundGarden() {
  const [grid, setGrid] = useState(() => seededGrid(0));
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(-1);
  const [muted, setMuted] = useState(false);
  const [seed, setSeed] = useState(0);

  const ac = useRef(null);
  const master = useRef(null);
  const silent = useRef(null);
  const gridRef = useRef(grid);
  const timer = useRef(null);
  gridRef.current = grid;

  /* Why the grid was silent on phones.

     iOS classes Web Audio as "ambient" sound, so the handset's side switch
     silences it — while <audio> and <video> elements play regardless. Everything
     on screen worked, the playhead swept, and nothing errored; there was just no
     sound, which is exactly what that switch does.

     Two layers, because one alone doesn't cover every handset:
       1. navigator.audioSession.type = "playback" tells iOS this is deliberate
          playback rather than background ambience. Safari 16.4 and later.
       2. Older iOS: playing a silent <audio> clip during the same tap flips the
          audio session, after which Web Audio is no longer treated as ambient.

     Both are wrapped in try/catch and both are no-ops elsewhere — no other
     browser needs any of this. */
  const unlockPhoneAudio = useCallback(() => {
    try {
      if (typeof navigator !== "undefined" && navigator.audioSession) {
        navigator.audioSession.type = "playback";
      }
    } catch { /* not supported here; layer 2 covers it */ }

    try {
      if (!silent.current) {
        const el = new Audio(SILENT_WAV);
        el.loop = true;
        el.volume = 0;
        el.setAttribute("playsinline", "");
        silent.current = el;
      }
      // must happen inside the user gesture, so no await
      const p = silent.current.play();
      if (p && p.catch) p.catch(() => {});
    } catch { /* nothing to recover; the grid still works, just quietly */ }
  }, []);

  /* Created on the first tap, never before: browsers block audio that isn't
     started by a user gesture, and creating it earlier would leave a suspended
     context sitting there on every visit. */
  const audio = useCallback(() => {
    if (typeof window === "undefined") return null;
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    if (!ac.current) {
      ac.current = new Ctor();
      master.current = ac.current.createGain();
      master.current.gain.value = 0.9;
      master.current.connect(ac.current.destination);
    }
    if (ac.current.state === "suspended") ac.current.resume();
    return ac.current;
  }, []);

  const playNote = useCallback((freq) => {
    const context = audio();
    if (!context || muted) return;
    // a hair ahead of "now": an envelope scheduled exactly at currentTime is
    // sometimes dropped on mobile, which loses the first note of the loop
    const t = context.currentTime + 0.015;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.value = freq;
    filter.type = "lowpass";
    filter.frequency.value = 1600;

    // soft bell envelope: quick in, long tail, never a click
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.16, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master.current);
    osc.start(t);
    osc.stop(t + 1.2);
  }, [audio, muted]);

  // the playhead
  useEffect(() => {
    if (!playing) { setStep(-1); return; }
    let i = 0;
    const tick = () => {
      setStep(i);
      gridRef.current.forEach((row, r) => { if (row[i]) playNote(ROWS[r].freq); });
      i = (i + 1) % STEPS;
    };
    tick();
    timer.current = setInterval(tick, STEP_MS);
    return () => clearInterval(timer.current);
  }, [playing, playNote]);

  useEffect(() => () => {
    clearInterval(timer.current);
    if (ac.current && ac.current.state !== "closed") ac.current.close();
    // stop holding the audio session once the visitor leaves the page
    if (silent.current) { try { silent.current.pause(); } catch {} silent.current = null; }
  }, []);

  useEffect(() => {
    if (master.current) master.current.gain.value = muted ? 0 : 0.9;
  }, [muted]);

  const toggle = (r, c) => {
    const on = !grid[r][c];
    setGrid((g) => g.map((row, ri) => (ri === r ? row.map((v, ci) => (ci === c ? !v : v)) : row)));
    if (on && !playing) { unlockPhoneAudio(); playNote(ROWS[r].freq); }  // instant feedback when stopped
  };

  const shuffle = () => {
    const next = seed + 1;
    setSeed(next);
    setGrid(seededGrid(next));
  };

  const active = grid.flat().filter(Boolean).length;

  return (
    <div>
      <div className="ghud">
        <span>Notes planted <b>{active}</b></span>
      </div>

      <div className="sg" role="group" aria-label="Note grid, five notes by eight steps">
        {ROWS.map((row, r) => (
          <div className="sg__row" key={row.name}>
            <span className="sg__note" aria-hidden="true">{row.name}</span>
            {row.name && grid[r].map((on, c) => (
              <button
                key={c}
                type="button"
                className={`sg__cell ${on ? "is-on" : ""} ${step === c ? "is-now" : ""}`}
                style={on ? { background: TINTS[r], borderColor: TINTS[r] } : undefined}
                aria-pressed={on}
                aria-label={`Note ${row.name}, step ${c + 1}`}
                onClick={() => toggle(r, c)}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="sg__controls">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => { unlockPhoneAudio(); audio(); setPlaying((p) => !p); }}
        >
          {playing ? "Pause" : "Play"}
        </button>
        <button className="btn btn-secondary" type="button" onClick={shuffle}>Surprise me</button>
        <button className="btn btn-secondary" type="button" onClick={() => setGrid(emptyGrid())}>Clear</button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-pressed={muted}
        >
          {muted ? "Sound off" : "Sound on"}
        </button>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {playing ? "Playing" : "Stopped"}. {active} notes planted. Sound is {muted ? "off" : "on"}.
      </p>
    </div>
  );
}
