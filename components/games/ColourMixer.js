"use client";

import { useCallback, useMemo, useState } from "react";

/* Drop paint into a bowl and watch a new colour appear.

   Two decisions worth writing down:

   1. The bowl mixes by WEIGHTED AVERAGE, not by replacing. Add one drop of blue
      to nine of yellow and you get a yellow that has only just noticed the blue.
      Averaging every drop equally would make the tenth drop as loud as the
      first, and the bowl would lurch instead of drift — which is the opposite of
      the feeling this is for.

   2. It always gives the colour a name. A rectangle of #7E9B6A is a hex code; a
      rectangle labelled "Moss" is something you made. The names are the entire
      reward here, since there is no score and nothing to finish. */

const PAINTS = [
  { id: "sun",    name: "Sunshine", rgb: [245, 206, 99]  },
  { id: "rose",   name: "Rose",     rgb: [238, 106, 98]  },
  { id: "sky",    name: "Sky",      rgb: [59, 163, 232]  },
  { id: "leaf",   name: "Leaf",     rgb: [95, 191, 168]  },
  { id: "grape",  name: "Grape",    rgb: [132, 104, 224] },
  { id: "clay",   name: "Clay",     rgb: [186, 118, 84]  },
  { id: "cream",  name: "Cream",    rgb: [252, 247, 235] },
  { id: "ink",    name: "Ink",      rgb: [40, 56, 68]    },
];

/* Nearest-neighbour naming. A generated name ("medium desaturated green")
   reads like a spec sheet; a short list of real words reads like a paint chart,
   and every entry here is something calm you could point at in the world. */
const NAMES = [
  ["Cream",     252, 247, 235], ["Sand",      226, 208, 174], ["Butter",    246, 224, 140],
  ["Honey",     231, 179, 74],  ["Apricot",   240, 168, 116], ["Peach",     246, 190, 168],
  ["Coral",     238, 122, 110], ["Rose",      224, 118, 130], ["Blush",     243, 199, 200],
  ["Plum",      140, 92, 130],  ["Lavender",  190, 174, 226], ["Violet",    132, 104, 210],
  ["Denim",     78, 108, 168],  ["Ocean",     40, 118, 160],  ["Sky",       126, 186, 230],
  ["Mist",      206, 224, 232], ["Teal",      42, 140, 132],  ["Seafoam",   142, 206, 190],
  ["Mint",      190, 228, 208], ["Sage",      158, 178, 148], ["Moss",      110, 138, 88],
  ["Forest",    56, 96, 74],    ["Olive",     136, 132, 74],  ["Rust",      168, 92, 58],
  ["Cocoa",     116, 84, 68],   ["Clay",      186, 130, 100], ["Taupe",     176, 160, 148],
  ["Fog",       206, 210, 212], ["Slate",     108, 124, 136], ["Storm",     72, 88, 100],
  ["Charcoal",  54, 62, 70],    ["Dusk",      92, 84, 120],
];

function nameFor([r, g, b]) {
  let best = NAMES[0];
  let bestD = Infinity;
  for (const n of NAMES) {
    /* Weighted so the name tracks what the eye notices. Green carries most of
       perceived brightness, blue the least — plain Euclidean distance in RGB
       calls things "Ocean" that anyone would call "Slate". */
    const d = 3 * (r - n[1]) ** 2 + 6 * (g - n[2]) ** 2 + 2 * (b - n[3]) ** 2;
    if (d < bestD) { bestD = d; best = n; }
  }
  return best[0];
}

const hex = ([r, g, b]) =>
  "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

export default function ColourMixer() {
  const [bowl, setBowl] = useState(null);   // { rgb, drops }
  const [kept, setKept] = useState([]);

  const addDrop = useCallback((rgb) => {
    setBowl((current) => {
      if (!current) return { rgb: [...rgb], drops: 1 };
      const n = current.drops;
      const mixed = current.rgb.map((c, i) => (c * n + rgb[i]) / (n + 1));
      return { rgb: mixed, drops: n + 1 };
    });
  }, []);

  const colour = bowl ? hex(bowl.rgb) : null;
  const label = useMemo(() => (bowl ? nameFor(bowl.rgb) : null), [bowl]);

  const keep = () => {
    if (!bowl) return;
    setKept((k) => {
      if (k.some((c) => c.hex === colour)) return k;      // no duplicates in the tray
      return [{ hex: colour, name: label, rgb: [...bowl.rgb] }, ...k].slice(0, 12);
    });
  };

  /* Light colours need dark text on them and vice versa, or the name vanishes
     into the swatch it is naming. */
  const isPale = bowl
    ? (bowl.rgb[0] * 0.299 + bowl.rgb[1] * 0.587 + bowl.rgb[2] * 0.114) > 150
    : true;

  return (
    <div>
      <div className="ghud">
        <span>Drops <b>{bowl ? bowl.drops : 0}</b></span>
        <span>Kept <b>{kept.length}</b></span>
      </div>

      <div
        className="mix__bowl"
        style={{ background: colour || "var(--wash-mint)" }}
        role="img"
        aria-label={bowl ? `The bowl is ${label}, ${colour}` : "The bowl is empty"}
      >
        {bowl ? (
          <div className={`mix__label ${isPale ? "is-dark" : "is-light"}`}>
            <strong>{label}</strong>
            <span>{colour}</span>
          </div>
        ) : (
          <p className="mix__empty">Tap a paint below to start.</p>
        )}
      </div>

      <div className="mix__row" role="group" aria-label="Paints">
        {PAINTS.map((p) => (
          <button
            key={p.id}
            type="button"
            className="mix__paint"
            style={{ background: hex(p.rgb) }}
            onClick={() => addDrop(p.rgb)}
          >
            <span>{p.name}</span>
          </button>
        ))}
      </div>

      <div className="sg__controls">
        <button className="btn btn-primary" type="button" onClick={keep} disabled={!bowl}>
          Keep this colour
        </button>
        <button className="btn btn-secondary" type="button" onClick={() => setBowl(null)}>
          Rinse the bowl
        </button>
      </div>

      {kept.length > 0 && (
        <div className="mix__kept">
          <span className="mix__kepttitle">Colours you made</span>
          <div className="mix__strip">
            {kept.map((c) => (
              <button
                key={c.hex}
                type="button"
                className="mix__chip"
                style={{ background: c.hex }}
                onClick={() => addDrop(c.rgb)}
                title={`Add a drop of ${c.name}`}
              >
                <span>{c.name}</span>
              </button>
            ))}
          </div>
          <p className="gnote">Tap any one of these to drop it back into the bowl.</p>
        </div>
      )}
    </div>
  );
}
