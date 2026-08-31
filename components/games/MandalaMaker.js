"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Draw one line; it is repeated around the centre so it comes out symmetrical.

   Every stroke is drawn once per slice, rotated, and then again mirrored, so
   a single wobbly scribble turns into a pattern. That is the reason this
   replaced free colouring: the visitor does almost nothing and the result
   still looks deliberate, which is a much kinder thing to hand someone who
   doesn't think of themselves as artistic. */

const COLORS = ["#5FBFA8", "#7FB6EA", "#A78BE8", "#F0A0B4", "#EE6A62", "#F5CE63", "#8FB86B", "#3D5566"];
const SIZES = [
  { label: "Thin", value: 3 },
  { label: "Medium", value: 7 },
  { label: "Thick", value: 14 },
];
const SLICES = [6, 8, 12];
const PAPER = "#FFFCF5";

export default function MandalaMaker() {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const ctx = useRef(null);
  const box = useRef({ w: 0, h: 0 });
  const last = useRef(null);

  const [color, setColor] = useState(COLORS[2]);
  const [width, setWidth] = useState(SIZES[1].value);
  const [slices, setSlices] = useState(8);
  const [strokes, setStrokes] = useState(0);

  const clear = useCallback(() => {
    const c = ctx.current;
    if (!c) return;
    const { w, h } = box.current;
    c.fillStyle = PAPER;
    c.fillRect(0, 0, w, h);
    // faint guide rings, so an empty canvas still reads as "draw in the middle"
    c.strokeStyle = "rgba(61,85,102,.08)";
    c.lineWidth = 1;
    const r = Math.min(w, h) / 2;
    [0.3, 0.6, 0.9].forEach((f) => {
      c.beginPath();
      c.arc(w / 2, h / 2, r * f, 0, Math.PI * 2);
      c.stroke();
    });
    setStrokes(0);
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
    c.lineCap = "round";
    c.lineJoin = "round";
    ctx.current = c;
    box.current = { w, h };
    clear();
  }, [clear]);

  useEffect(() => {
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

  /* The same segment, drawn once per slice and once mirrored within each
     slice. Coordinates are made relative to the centre first so the rotation
     happens around the middle of the canvas. */
  const mirror = (from, to) => {
    const c = ctx.current;
    const { w, h } = box.current;
    const cx = w / 2;
    const cy = h / 2;
    c.strokeStyle = color;
    c.lineWidth = width;

    for (let i = 0; i < slices; i++) {
      c.save();
      c.translate(cx, cy);
      c.rotate((i * 2 * Math.PI) / slices);

      c.beginPath();
      c.moveTo(from.x - cx, from.y - cy);
      c.lineTo(to.x - cx, to.y - cy);
      c.stroke();

      c.scale(1, -1);
      c.beginPath();
      c.moveTo(from.x - cx, from.y - cy);
      c.lineTo(to.x - cx, to.y - cy);
      c.stroke();

      c.restore();
    }
  };

  const point = (e) => {
    const r = canvas.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    const p = point(e);
    last.current = p;
    mirror(p, { x: p.x + 0.01, y: p.y + 0.01 });   // a tap alone should leave a dot
    setStrokes((n) => n + 1);
  };

  const onMove = (e) => {
    if (!last.current) return;
    const p = point(e);
    mirror(last.current, p);
    last.current = p;
  };

  const onUp = () => { last.current = null; };

  /* Keyboard and switch users cannot drag, so this puts a ring on the canvas
     in the current colour and brush — enough to make something of your own. */
  const addRing = () => {
    const c = ctx.current;
    const { w, h } = box.current;
    const r = Math.min(w, h) / 2;
    const radius = r * (0.22 + Math.random() * 0.6);
    c.strokeStyle = color;
    c.lineWidth = width;
    c.beginPath();
    c.arc(w / 2, h / 2, radius, 0, Math.PI * 2);
    c.stroke();
    setStrokes((n) => n + 1);
  };

  const save = () => {
    try {
      const a = document.createElement("a");
      a.download = "my-mandala.png";
      a.href = canvas.current.toDataURL("image/png");
      a.click();
    } catch {
      /* nothing to recover if the browser refuses the download */
    }
  };

  return (
    <div>
      <div className="ghud">
        <span>Strokes <b>{strokes}</b></span>
      </div>

      <div className="mandala" ref={wrap}>
        <canvas
          ref={canvas}
          className="mandala__canvas"
          role="img"
          aria-label="A mandala canvas. Drag with a mouse or finger to draw; every line is mirrored around the centre."
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        />
      </div>

      <div className="mandala__tools">
        <div className="swatches" role="group" aria-label="Colour">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className="swatch"
              style={{ background: c }}
              aria-label={`Colour ${c}`}
              aria-pressed={color === c}
              onClick={() => setColor(c)}
            />
          ))}
        </div>

        <div className="segmented" role="group" aria-label="Brush size">
          {SIZES.map((s) => (
            <button
              key={s.label}
              type="button"
              aria-pressed={width === s.value}
              onClick={() => setWidth(s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="segmented" role="group" aria-label="Number of mirrored slices">
          {SLICES.map((n) => (
            <button key={n} type="button" aria-pressed={slices === n} onClick={() => setSlices(n)}>
              {n}×
            </button>
          ))}
        </div>
      </div>

      <div className="sg__controls">
        <button className="btn btn-secondary" type="button" onClick={addRing}>Add a ring</button>
        <button className="btn btn-secondary" type="button" onClick={clear}>Start over</button>
        <button className="btn btn-secondary" type="button" onClick={save}>Save picture</button>
      </div>
    </div>
  );
}
