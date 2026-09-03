"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Stack smooth stones into a cairn.

   The design problem here was failure. A stacking activity needs consequences
   or placement means nothing — but this sits on a mental health provider's
   site, next to a breathing exercise, and "YOU LOSE, START AGAIN" is not what
   it is for. So the rule is: only the stone you just placed can fall. The cairn
   underneath it never collapses, there is no timer, and nothing resets unless
   you ask it to. A bad placement costs you one stone and one more try.

   No physics library. Gravity is one line, and a falling stone is four numbers
   integrated per frame. Pulling in an engine to do that would be the tail
   wagging the dog. */

const STONE_TONES = [
  ["#8FA3AD", "#6E828D"], ["#A9AFA2", "#878E7E"], ["#B3A79B", "#948779"],
  ["#93A8A2", "#728780"], ["#A8A3AE", "#87828F"], ["#9FAAB4", "#7D8994"],
];

const GRAVITY = 0.0016;      // px per ms squared
const DROP_SPEED = 0.85;     // px per ms while a stone is settling
const PLINTH_H = 16;

/* How far a stone may sit off the one below before it slides. 0.40 of the lower
   stone's width is forgiving enough that a deliberate lean works and careless
   dropping does not. */
const OVERHANG = 0.40;
/* And how far the whole cairn's centre of mass may drift from the plinth. */
const LEAN_LIMIT = 0.46;

export default function BalanceStones() {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const ctx = useRef(null);
  const box = useRef({ w: 0, h: 0 });

  const stones = useRef([]);          // settled, bottom-up
  const dropping = useRef(null);      // the one on its way down
  const falling = useRef([]);         // ones that slid off
  const ghostX = useRef(null);        // aim point, in SCREEN pixels
  const next = useRef(null);
  const raf = useRef(0);
  const last = useRef(0);
  const reduce = useRef(false);
  /* The camera. A cairn taller than the frame is the normal outcome of playing
     well, so rather than capping the height, the whole scene scales down as it
     grows. Eased towards its target so the view drifts rather than snapping. */
  const view = useRef(1);

  const [count, setCount] = useState(0);
  const [best, setBest] = useState(0);
  const [message, setMessage] = useState("Tap anywhere above the base to set a stone down.");

  const makeStone = useCallback((w, index = 0) => {
    const i = Math.floor(Math.random() * STONE_TONES.length);
    /* Tapering upward, the way a real cairn is built: each stone a little
       narrower than the last, down to a floor so the top does not vanish. */
    const taper = Math.max(0.52, 1 - index * 0.045);
    const width = w * (0.30 + Math.random() * 0.13) * taper;
    return {
      w: width,
      h: width * (0.34 + Math.random() * 0.14),
      tone: STONE_TONES[i],
      tilt: (Math.random() - 0.5) * 0.05,
    };
  }, []);

  const fit = useCallback(() => {
    const el = canvas.current;
    const parent = wrap.current;
    if (!el || !parent) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    el.width = Math.round(w * dpr);
    el.height = Math.round(h * dpr);
    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
    const c = el.getContext("2d");
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.current = c;
    box.current = { w, h };
    if (!next.current) next.current = makeStone(w, stones.current.length);
  }, [makeStone]);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    fit();
    let w = window.innerWidth;
    const onResize = () => {
      if (Math.abs(window.innerWidth - w) < 40) return;
      w = window.innerWidth;
      fit();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [fit]);

  const restingTop = useCallback(() => {
    const { h } = box.current;
    const s = stones.current;
    if (!s.length) return h - PLINTH_H;
    return s[s.length - 1].y - s[s.length - 1].h / 2;
  }, []);

  /* Screen pixels to scene coordinates. Everything is drawn under the camera
     transform, so a tap has to be converted before it means anything —
     otherwise aiming drifts further out the taller the cairn gets. */
  const toScene = useCallback((screenX) => {
    const { w } = box.current;
    return (screenX - w / 2) / view.current + w / 2;
  }, []);

  const place = useCallback((screenX) => {
    if (dropping.current) return;
    const { w } = box.current;
    if (!w) return;
    const stone = next.current || makeStone(w, stones.current.length);
    const x = toScene(screenX);
    const clamped = Math.max(stone.w / 2 + 4, Math.min(w - stone.w / 2 - 4, x));
    const target = restingTop() - stone.h / 2;
    dropping.current = { ...stone, x: clamped, y: target - 150, targetY: target };
    next.current = makeStone(w, stones.current.length + 1);
  }, [makeStone, restingTop, toScene]);

  /* Settle: decide whether the stone that just landed stays. */
  const settle = useCallback((stone) => {
    const { w } = box.current;
    const below = stones.current[stones.current.length - 1];
    const baseX = w / 2;

    const overhung = below && Math.abs(stone.x - below.x) > below.w * OVERHANG;

    const all = [...stones.current, stone];
    const mass = all.reduce((t, s) => t + s.w, 0);
    const com = all.reduce((t, s) => t + s.x * s.w, 0) / mass;
    const plinth = w * 0.30;
    const leaning = Math.abs(com - baseX) > plinth * LEAN_LIMIT;

    if (overhung || leaning) {
      const dir = stone.x >= (below ? below.x : baseX) ? 1 : -1;
      falling.current.push({ ...stone, vx: dir * 0.10, vy: -0.05, rot: 0, vr: dir * 0.0016 });
      setMessage(overhung
        ? "That one slid off. The cairn is fine — try another."
        : "The cairn leaned too far and that stone came away. Try nearer the middle.");
      return;
    }

    stones.current.push(stone);
    setCount((c) => {
      const n = c + 1;
      setBest((b) => Math.max(b, n));
      return n;
    });
    setMessage("");
  }, []);

  // the loop
  useEffect(() => {
    const draw = (now) => {
      const c = ctx.current;
      const { w, h } = box.current;
      if (!c || !w) { raf.current = requestAnimationFrame(draw); return; }
      const dt = Math.min(now - (last.current || now), 34);
      last.current = now;

      // sky
      const g = c.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#F2F8F6");
      g.addColorStop(1, "#DCEAE6");
      c.fillStyle = g;
      c.fillRect(0, 0, w, h);

      const plinth = w * 0.30;
      const groundY = h - PLINTH_H;
      const all = stones.current;

      /* Camera: keep the cairn plus a stone's worth of headroom inside the
         frame. 0.34 is the floor — below that the stones stop reading as
         objects and it just looks like gravel. */
      const stackH = all.reduce((t, s) => t + s.h, 0);
      const want = Math.max(0.34, Math.min(1, (h - PLINTH_H - 30) / (stackH + 170)));
      view.current += (want - view.current) * (reduce.current ? 1 : 0.07);
      const S = view.current;

      c.save();
      c.translate(w / 2, groundY);
      c.scale(S, S);
      c.translate(-w / 2, -groundY);

      // plinth
      c.fillStyle = "#9BAFA8";
      roundRect(c, w / 2 - plinth / 2, groundY, plinth, PLINTH_H / S + 4, 5);
      c.fill();

      // how far the cairn leans, drawn as a gentle tilt of the whole stack
      let tilt = 0;
      if (all.length) {
        const mass = all.reduce((t, s) => t + s.w, 0);
        const com = all.reduce((t, s) => t + s.x * s.w, 0) / mass;
        tilt = ((com - w / 2) / (plinth * LEAN_LIMIT)) * 0.035;
      }

      c.save();
      c.translate(w / 2, groundY);
      c.rotate(reduce.current ? 0 : tilt);
      c.translate(-w / 2, -groundY);
      all.forEach((s) => drawStone(c, s));
      c.restore();

      // the stone on its way down
      const d = dropping.current;
      if (d) {
        d.y += DROP_SPEED * dt * (reduce.current ? 4 : 1);
        if (d.y >= d.targetY) {
          d.y = d.targetY;
          dropping.current = null;
          settle(d);
        } else {
          drawStone(c, d);
        }
      }

      // ones that slid off
      falling.current = falling.current.filter((f) => f.y < h / S + 200);
      falling.current.forEach((f) => {
        f.vy += GRAVITY * dt;
        f.x += f.vx * dt;
        f.y += f.vy * dt;
        f.rot += f.vr * dt;
        c.save();
        c.translate(f.x, f.y);
        c.rotate(f.rot);
        c.translate(-f.x, -f.y);
        c.globalAlpha = 0.85;
        drawStone(c, f);
        c.restore();
      });
      c.globalAlpha = 1;

      // the aiming ghost, hovering above wherever the top of the cairn now is
      if (!dropping.current && ghostX.current !== null && next.current) {
        const n = next.current;
        const top = restingTop();
        const x = Math.max(n.w / 2 + 4, Math.min(w - n.w / 2 - 4, toScene(ghostX.current)));
        const gy = top - 78;
        c.globalAlpha = 0.34;
        drawStone(c, { ...n, x, y: gy });
        c.globalAlpha = 0.22;
        c.strokeStyle = "#4A6B62";
        c.setLineDash([4, 6]);
        c.lineWidth = 1.5 / S;
        c.beginPath();
        c.moveTo(x, gy + n.h / 2 + 6);
        c.lineTo(x, top - 6);
        c.stroke();
        c.setLineDash([]);
        c.globalAlpha = 1;
      }

      c.restore();

      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf.current);
  }, [settle, restingTop, toScene]);

  const pointerX = (e) => {
    const r = canvas.current.getBoundingClientRect();
    return e.clientX - r.left;
  };

  return (
    <div>
      <div className="ghud">
        <span>Stones stacked <b>{count}</b></span>
        <span>Tallest <b>{best}</b></span>
      </div>

      <div className="cairn" ref={wrap}>
        <canvas
          ref={canvas}
          className="cairn__canvas"
          role="img"
          aria-label="A pile of stones on a stone base. Tap to set the next stone down."
          onPointerMove={(e) => { ghostX.current = pointerX(e); }}
          onPointerLeave={() => { ghostX.current = null; }}
          onPointerDown={(e) => { ghostX.current = pointerX(e); }}
          onPointerUp={(e) => place(pointerX(e))}
        />
      </div>

      <p className="cairn__msg" role="status" aria-live="polite">{message || " "}</p>

      <div className="sg__controls">
        <button
          className="btn btn-secondary" type="button"
          onClick={() => place(box.current.w / 2 + (Math.random() - 0.5) * 34)}
        >
          Set one down for me
        </button>
        <button
          className="btn btn-secondary" type="button"
          onClick={() => {
            stones.current = []; falling.current = []; dropping.current = null;
            view.current = 1;
            setCount(0);
            setMessage("A fresh base. Take your time.");
          }}
        >
          Start again
        </button>
      </div>
    </div>
  );
}

function roundRect(c, x, y, w, h, r) {
  const rad = Math.min(r, w / 2, h / 2);
  c.beginPath();
  c.moveTo(x + rad, y);
  c.arcTo(x + w, y, x + w, y + h, rad);
  c.arcTo(x + w, y + h, x, y + h, rad);
  c.arcTo(x, y + h, x, y, rad);
  c.arcTo(x, y, x + w, y, rad);
  c.closePath();
}

/* A stone is a very rounded rectangle with a soft top highlight. Round enough
   to read as river-worn, square enough that a stack of them looks stable. */
function drawStone(c, s) {
  const x = s.x - s.w / 2;
  const y = s.y - s.h / 2;
  c.save();
  c.translate(s.x, s.y);
  c.rotate(s.tilt || 0);
  c.translate(-s.x, -s.y);

  c.fillStyle = "rgba(30,50,46,.13)";
  roundRect(c, x + 2, y + 3, s.w, s.h, s.h / 2);
  c.fill();

  const g = c.createLinearGradient(0, y, 0, y + s.h);
  g.addColorStop(0, s.tone[0]);
  g.addColorStop(1, s.tone[1]);
  c.fillStyle = g;
  roundRect(c, x, y, s.w, s.h, s.h / 2);
  c.fill();

  c.globalAlpha = 0.30;
  c.fillStyle = "#fff";
  roundRect(c, x + s.w * 0.16, y + s.h * 0.17, s.w * 0.42, s.h * 0.24, s.h * 0.12);
  c.fill();
  c.globalAlpha = 1;
  c.restore();
}
