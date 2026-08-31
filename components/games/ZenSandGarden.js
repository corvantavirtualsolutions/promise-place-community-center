"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Drag to rake the sand. Tap to set a stone, and rings ripple out around it.

   There is no mode switch on purpose: a drag is a rake, a tap is a stone.
   That is the entire interface, so nobody has to be told how it works. There
   is also no goal and no ending — this one is for fiddling with, not finishing. */

const SAND = "#EADCC0";
const GROOVE = "#CDB68E";
const CREST = "#F8EFDC";
const TEETH = 4;
const TOOTH_GAP = 9;
const TAP_SLOP = 7;      // a pointer that moves less than this is a tap, not a drag

export default function ZenSandGarden() {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const ctx = useRef(null);
  const size = useRef({ w: 0, h: 0 });
  const last = useRef(null);
  const start = useRef(null);
  const moved = useRef(false);
  const [stones, setStones] = useState(0);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const smooth = useCallback(() => {
    const c = ctx.current;
    if (!c) return;
    const { w, h } = size.current;
    c.fillStyle = SAND;
    c.fillRect(0, 0, w, h);
    // a faint grain so flat sand doesn't read as a plain rectangle
    c.fillStyle = "rgba(255,255,255,.35)";
    for (let i = 0; i < Math.round((w * h) / 900); i++) {
      c.fillRect(Math.random() * w, Math.random() * h, 1, 1);
    }
    setStones(0);
  }, []);

  const fit = useCallback(() => {
    const el = canvas.current;
    const box = wrap.current;
    if (!el || !box) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = box.clientWidth;
    const h = box.clientHeight;
    el.width = Math.round(w * dpr);
    el.height = Math.round(h * dpr);
    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
    const c = el.getContext("2d");
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.lineCap = "round";
    c.lineJoin = "round";
    ctx.current = c;
    size.current = { w, h };
    smooth();
  }, [smooth]);

  useEffect(() => {
    fit();
    // only re-fit on a real width change (an iOS address bar hiding is not one)
    let w = window.innerWidth;
    const onResize = () => {
      if (Math.abs(window.innerWidth - w) < 40) return;
      w = window.innerWidth;
      fit();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [fit]);

  const point = (e) => {
    const r = canvas.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  /* One rake stroke = several parallel lines laid perpendicular to the drag.
     Each tooth gets a dark groove with a light crest beside it, which is what
     makes it read as a furrow rather than a pencil line. */
  const rake = (from, to) => {
    const c = ctx.current;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy) || 1;
    const px = -dy / len;
    const py = dx / len;

    for (let i = 0; i < TEETH; i++) {
      const off = (i - (TEETH - 1) / 2) * TOOTH_GAP;
      const ox = px * off;
      const oy = py * off;
      c.strokeStyle = GROOVE;
      c.lineWidth = 3.2;
      c.beginPath();
      c.moveTo(from.x + ox, from.y + oy);
      c.lineTo(to.x + ox, to.y + oy);
      c.stroke();

      c.strokeStyle = CREST;
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(from.x + ox + px * 3, from.y + oy + py * 3);
      c.lineTo(to.x + ox + px * 3, to.y + oy + py * 3);
      c.stroke();
    }
  };

  const stone = (at) => {
    const c = ctx.current;
    const { w, h } = size.current;
    const r = 15 + Math.random() * 12;

    // rings first, so the stone sits on top of its own ripples
    c.lineWidth = 2;
    for (let i = 1; i <= 3; i++) {
      c.strokeStyle = i % 2 ? GROOVE : "#DFCBA6";
      c.beginPath();
      c.ellipse(at.x, at.y, r + i * 13, (r + i * 13) * 0.82, 0, 0, Math.PI * 2);
      c.stroke();
    }

    c.fillStyle = "rgba(120,100,70,.18)";
    c.beginPath();
    c.ellipse(at.x + 3, at.y + r * 0.55, r * 1.02, r * 0.42, 0, 0, Math.PI * 2);
    c.fill();

    const g = c.createRadialGradient(at.x - r * 0.35, at.y - r * 0.45, r * 0.15, at.x, at.y, r * 1.15);
    g.addColorStop(0, "#C3D0D8");
    g.addColorStop(1, "#7E939F");
    c.fillStyle = g;
    c.beginPath();
    c.ellipse(at.x, at.y, r, r * 0.86, Math.random() * 0.6 - 0.3, 0, Math.PI * 2);
    c.fill();

    setStones((n) => n + 1);
    void w; void h;
  };

  const dropStone = () => {
    const { w, h } = size.current;
    stone({ x: w * (0.25 + Math.random() * 0.5), y: h * (0.25 + Math.random() * 0.5) });
  };

  const onDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    const p = point(e);
    start.current = p;
    last.current = p;
    moved.current = false;
  };

  const onMove = (e) => {
    if (!last.current) return;
    const p = point(e);
    if (!moved.current && Math.hypot(p.x - start.current.x, p.y - start.current.y) > TAP_SLOP) {
      moved.current = true;
    }
    if (moved.current) rake(last.current, p);
    last.current = p;
  };

  const onUp = () => {
    if (last.current && !moved.current) stone(start.current);
    last.current = null;
    start.current = null;
  };

  const save = () => {
    try {
      const a = document.createElement("a");
      a.download = "my-sand-garden.png";
      a.href = canvas.current.toDataURL("image/png");
      a.click();
    } catch {
      /* a browser that blocks the download just does nothing; nothing to recover */
    }
  };

  return (
    <div>
      <div className="ghud">
        <span>Stones set <b>{stones}</b></span>
      </div>

      <div className="sand" ref={wrap}>
        <canvas
          ref={canvas}
          className="sand__canvas"
          role="img"
          aria-label="A sand garden you can rake with a mouse or finger."
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        />
      </div>

      <div className="sg__controls">
        <button className="btn btn-secondary" type="button" onClick={dropStone}>Drop a stone</button>
        <button className="btn btn-secondary" type="button" onClick={smooth}>Smooth the sand</button>
        <button className="btn btn-secondary" type="button" onClick={save}>Save picture</button>
      </div>

      {touch && (
        <p className="gnote">
          On iPhone the picture opens in a new tab — press and hold it to save.
        </p>
      )}
    </div>
  );
}
