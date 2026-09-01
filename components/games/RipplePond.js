"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Still water that answers whatever you do to it.

   Every ripple is drawn from scratch each frame rather than smeared onto a
   persistent canvas: rings have to fade and pass through each other, which a
   trail-based approach cannot do. The pond is cheap enough to repaint fully at
   60fps because it is only a handful of circles and ellipses.

   Under prefers-reduced-motion the idle drift stops and the rings settle
   quickly, but touching the water still does something — an activity whose
   whole point is cause and effect must not become an inert picture. */

const RIPPLE_LIFE = 2600;   // ms for a ring to fade out
const RIPPLE_SPEED = 0.055; // px per ms
const MAX_RIPPLES = 40;
const MIN_GAP = 90;         // ms between ripples while dragging

const LILIES = [
  { x: 0.18, y: 0.28, r: 26, tint: "#5FBFA8" },
  { x: 0.74, y: 0.22, r: 20, tint: "#8FB86B" },
  { x: 0.62, y: 0.68, r: 30, tint: "#4E9E86" },
  { x: 0.28, y: 0.76, r: 22, tint: "#7FBF9E" },
];

const FISH = [
  { y: 0.42, speed: 0.028, size: 15, tint: "#F0A0B4", offset: 0.1 },
  { y: 0.58, speed: -0.021, size: 12, tint: "#F5CE63", offset: 0.7 },
  { y: 0.34, speed: 0.017, size: 10, tint: "#EE8F88", offset: 0.4 },
];

export default function RipplePond() {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const ctx = useRef(null);
  const box = useRef({ w: 0, h: 0 });
  const ripples = useRef([]);
  const raf = useRef(0);
  const lastAdd = useRef(0);
  const reduce = useRef(false);
  const [touches, setTouches] = useState(0);

  const addRipple = useCallback((x, y, force = false) => {
    const now = performance.now();
    if (!force && now - lastAdd.current < MIN_GAP) return;
    lastAdd.current = now;
    ripples.current.push({ x, y, born: now });
    if (ripples.current.length > MAX_RIPPLES) ripples.current.shift();
    setTouches((t) => t + 1);
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
  }, []);

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

  // the pond
  useEffect(() => {
    const draw = (now) => {
      const c = ctx.current;
      const { w, h } = box.current;
      if (!c || !w) { raf.current = requestAnimationFrame(draw); return; }

      // water
      const g = c.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#DCEEFC");
      g.addColorStop(1, "#B9DFF2");
      c.fillStyle = g;
      c.fillRect(0, 0, w, h);

      const live = ripples.current.filter((r) => now - r.born < RIPPLE_LIFE);
      ripples.current = live;

      /* How much the water is moving at a point — used to make the lilies and
         fish bob when a ring passes them, which is what sells it as one pond
         rather than two unrelated animations. */
      const disturbance = (px, py) => {
        let d = 0;
        for (const r of live) {
          /* clamped: requestAnimationFrame's timestamp is the moment the frame
             began, which can be slightly EARLIER than the performance.now() of
             a ripple created mid-frame. That made age negative for one frame,
             and a negative radius throws IndexSizeError. */
          const age = Math.max(0, now - r.born);
          const radius = age * RIPPLE_SPEED;
          const dist = Math.hypot(px - r.x, py - r.y);
          const near = Math.abs(dist - radius);
          if (near < 26) d += (1 - near / 26) * (1 - age / RIPPLE_LIFE);
        }
        return Math.min(d, 1);
      };

      // fish, under the surface
      FISH.forEach((f) => {
        const t = reduce.current ? 0.5 : (now * f.speed) / 1000 + f.offset;
        const x = ((t % 1) + 1) % 1 * (w + 120) - 60;
        const baseY = f.y * h;
        const y = baseY + (reduce.current ? 0 : Math.sin(now / 900 + f.offset * 9) * 5)
                  + disturbance(x, baseY) * 6;
        const dir = f.speed > 0 ? 1 : -1;
        c.save();
        c.translate(x, y);
        c.scale(dir, 1);
        c.globalAlpha = 0.55;
        c.fillStyle = f.tint;
        c.beginPath();
        c.ellipse(0, 0, f.size, f.size * 0.6, 0, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.moveTo(-f.size, 0);
        c.lineTo(-f.size - 8, -6);
        c.lineTo(-f.size - 8, 6);
        c.closePath();
        c.fill();
        c.restore();
      });
      c.globalAlpha = 1;

      // ripples
      live.forEach((r) => {
        const age = Math.max(0, now - r.born);
        const radius = age * RIPPLE_SPEED;
        const fade = 1 - age / RIPPLE_LIFE;
        c.strokeStyle = `rgba(255,255,255,${(fade * 0.85).toFixed(3)})`;
        c.lineWidth = 2.4 * fade + 0.6;
        c.beginPath();
        c.arc(r.x, r.y, radius, 0, Math.PI * 2);
        c.stroke();
        if (radius > 16) {
          c.strokeStyle = `rgba(90,150,190,${(fade * 0.35).toFixed(3)})`;
          c.lineWidth = 1.4;
          c.beginPath();
          c.arc(r.x, r.y, radius - 9, 0, Math.PI * 2);
          c.stroke();
        }
      });

      // lily pads, on the surface
      LILIES.forEach((l, i) => {
        const px = l.x * w;
        const py = l.y * h;
        const bob = disturbance(px, py);
        const wobble = reduce.current ? 0 : Math.sin(now / 1400 + i) * 1.5;
        const y = py + wobble + bob * 4;
        c.save();
        c.translate(px, y);
        c.rotate(bob * 0.08 + (reduce.current ? 0 : Math.sin(now / 2000 + i) * 0.03));
        c.fillStyle = "rgba(20,60,70,.10)";
        c.beginPath();
        c.ellipse(2, 4, l.r, l.r * 0.72, 0, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = l.tint;
        c.beginPath();
        // the notch that makes it read as a lily pad rather than a green blob
        c.ellipse(0, 0, l.r, l.r * 0.78, 0, 0.42, Math.PI * 2 - 0.42);
        c.closePath();
        c.fill();
        c.restore();
      });

      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const point = (e) => {
    const r = canvas.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div>
      <div className="ghud">
        <span>Ripples <b>{touches}</b></span>
      </div>

      <div className="pond" ref={wrap}>
        <canvas
          ref={canvas}
          className="pond__canvas"
          role="img"
          aria-label="A still pond. Touch or drag on the water to send out ripples."
          onPointerDown={(e) => { e.currentTarget.setPointerCapture?.(e.pointerId); const p = point(e); addRipple(p.x, p.y, true); }}
          onPointerMove={(e) => { if (!e.buttons) return; const p = point(e); addRipple(p.x, p.y); }}
        />
      </div>

      <div className="sg__controls">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            const { w, h } = box.current;
            addRipple(w * (0.2 + Math.random() * 0.6), h * (0.2 + Math.random() * 0.6), true);
          }}
        >
          Drop a pebble
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => { ripples.current = []; setTouches(0); }}
        >
          Let it settle
        </button>
      </div>
    </div>
  );
}
