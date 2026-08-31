"use client";

import { useCallback, useRef, useState } from "react";

const COLORS = [
  { name: "Red",    hex: "#EF5350" },
  { name: "Orange", hex: "#FF9E45" },
  { name: "Yellow", hex: "#F5CE63" },
  { name: "Green",  hex: "#4CAF7D" },
  { name: "Blue",   hex: "#3BA3E8" },
  { name: "Purple", hex: "#8468E0" },
  { name: "Pink",   hex: "#F48FB1" },
  { name: "Brown",  hex: "#A1785A" },
];

/* Each drawing is a list of fillable regions. Keeping them as plain data lets
   the palette, reset and download all work the same way for every picture. */
const DRAWINGS = [
  {
    key: "flower", name: "Flower",
    parts: [
      { id: "p1", label: "Top petal",    d: "M100 30c14 0 24 12 24 26s-10 24-24 24-24-10-24-24 10-26 24-26Z" },
      { id: "p2", label: "Left petal",   d: "M46 84c0-14 12-24 26-24s24 10 24 24-10 24-24 24-26-10-26-24Z" },
      { id: "p3", label: "Right petal",  d: "M104 84c0-14 10-24 24-24s26 10 26 24-12 24-26 24-24-10-24-24Z" },
      { id: "p4", label: "Bottom petal", d: "M100 108c14 0 24 10 24 24s-10 26-24 26-24-12-24-26 10-24 24-24Z" },
      { id: "c",  label: "Centre",       d: "M100 74a20 20 0 1 1 0 40 20 20 0 0 1 0-40Z" },
      { id: "s",  label: "Stem",         d: "M96 158h8v40h-8Z" },
      { id: "l",  label: "Leaf",         d: "M96 180c-22-2-32-14-32-28 16 0 30 10 32 28Z" },
    ],
  },
  {
    key: "butterfly", name: "Butterfly",
    parts: [
      { id: "wtl", label: "Upper left wing",  d: "M96 100 52 52c-18 12-20 44-4 60s38 8 48-12Z" },
      { id: "wtr", label: "Upper right wing", d: "M104 100l44-48c18 12 20 44 4 60s-38 8-48-12Z" },
      { id: "wbl", label: "Lower left wing",  d: "M96 104 60 146c12 16 32 16 36-4Z" },
      { id: "wbr", label: "Lower right wing", d: "M104 104l36 42c-12 16-32 16-36-4Z" },
      { id: "bod", label: "Body",             d: "M94 48h12v112H94Z" },
    ],
  },
  {
    key: "sun", name: "Sun",
    parts: [
      { id: "core", label: "Sun",    d: "M100 58a42 42 0 1 1 0 84 42 42 0 0 1 0-84Z" },
      { id: "r1",   label: "Ray up",    d: "M94 8h12v34H94Z" },
      { id: "r2",   label: "Ray down",  d: "M94 158h12v34H94Z" },
      { id: "r3",   label: "Ray left",  d: "M8 94h34v12H8Z" },
      { id: "r4",   label: "Ray right", d: "M158 94h34v12h-34Z" },
      { id: "r5",   label: "Ray upper left",  d: "M31 39l8-8 24 24-8 8Z" },
      { id: "r6",   label: "Ray lower right", d: "M137 145l8-8 24 24-8 8Z" },
      { id: "r7",   label: "Ray upper right", d: "M161 39l8 8-24 24-8-8Z" },
      { id: "r8",   label: "Ray lower left",  d: "M55 145l8 8-24 24-8-8Z" },
    ],
  },
  {
    key: "tree", name: "Tree",
    parts: [
      { id: "top", label: "Top leaves",   d: "M100 18c22 0 38 18 38 38 0 20-16 34-38 34S62 76 62 56c0-20 16-38 38-38Z" },
      { id: "mid", label: "Middle leaves",d: "M100 62c28 0 48 20 48 40 0 18-20 30-48 30S52 120 52 102c0-20 20-40 48-40Z" },
      { id: "trk", label: "Trunk",        d: "M90 130h20v62H90Z" },
      { id: "gnd", label: "Ground",       d: "M30 188h140v10H30Z" },
    ],
  },
  {
    key: "heart", name: "Heart",
    parts: [
      { id: "hl", label: "Left half",  d: "M100 178S22 128 22 78a40 40 0 0 1 78-14v114Z" },
      { id: "hr", label: "Right half", d: "M100 178s78-50 78-100a40 40 0 0 0-78-14v114Z" },
    ],
  },
];

const blank = (d) => Object.fromEntries(d.parts.map((p) => [p.id, "#FFFFFF"]));

export default function ColorYourMood() {
  const [drawingIdx, setDrawingIdx] = useState(0);
  const [color, setColor] = useState(COLORS[4].hex);
  const [fills, setFills] = useState(() => blank(DRAWINGS[0]));
  const svgRef = useRef(null);

  const drawing = DRAWINGS[drawingIdx];

  const choose = useCallback((i) => {
    setDrawingIdx(i);
    setFills(blank(DRAWINGS[i]));
  }, []);

  const paint = (id) => setFills((f) => ({ ...f, [id]: color }));

  const download = () => {
    try {
      const svg = svgRef.current;
      if (!svg) return;
      const data = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      const blob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 800; canvas.height = 800;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FFFCF5";
        ctx.fillRect(0, 0, 800, 800);
        ctx.drawImage(img, 0, 0, 800, 800);
        URL.revokeObjectURL(url);
        const a = document.createElement("a");
        a.download = `my-${drawing.key}.png`;
        a.href = canvas.toDataURL("image/png");
        a.click();
      };
      img.src = url;
    } catch {
      /* Downloading is a bonus — if the browser blocks it, the game still works. */
    }
  };

  return (
    <div className="paint">
      <div className="paint__thumbs" role="group" aria-label="Choose a drawing">
        {DRAWINGS.map((d, i) => (
          <button
            key={d.key}
            type="button"
            className="pthumb"
            aria-pressed={i === drawingIdx}
            aria-label={d.name}
            title={d.name}
            onClick={() => choose(i)}
          >
            <svg viewBox="0 0 200 200" aria-hidden="true">
              {d.parts.map((p) => (
                <path key={p.id} d={p.d} fill="#fff" stroke="#16242D" strokeWidth="6" />
              ))}
            </svg>
          </button>
        ))}
      </div>

      <div className="paint__canvas">
        <svg ref={svgRef} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
             role="img" aria-label={`${drawing.name} colouring picture`}>
          <rect width="200" height="200" fill="#FFFCF5" />
          {drawing.parts.map((p) => (
            <path
              key={p.id}
              d={p.d}
              data-fillable=""
              fill={fills[p.id]}
              stroke="#16242D"
              strokeWidth="3"
              strokeLinejoin="round"
              tabIndex={0}
              role="button"
              aria-label={`${p.label}. Fill with the selected colour.`}
              onClick={() => paint(p.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); paint(p.id); }
              }}
            />
          ))}
        </svg>
      </div>

      <div className="swatches" role="group" aria-label="Choose a colour">
        {COLORS.map((c) => (
          <button
            key={c.hex}
            type="button"
            className="swatch"
            style={{ background: c.hex }}
            aria-pressed={color === c.hex}
            aria-label={c.name}
            title={c.name}
            onClick={() => setColor(c.hex)}
          />
        ))}
      </div>

      <p className="ghelp" style={{ margin: 0 }}>
        There is no right or wrong way to create.
      </p>

      <div className="gactions" style={{ marginTop: 4 }}>
        <button className="btn btn-secondary" type="button" onClick={() => setFills(blank(drawing))}>
          Reset Drawing
        </button>
        <button className="btn btn-secondary" type="button"
                onClick={() => choose((drawingIdx + 1) % DRAWINGS.length)}>
          New Picture
        </button>
        <button className="btn btn-primary" type="button" onClick={download}>
          Save Artwork
        </button>
      </div>
    </div>
  );
}
