"use client";

import { useMemo, useState } from "react";

/* Build a face, and it puts a word to what you made.

   This one is on a mental health provider's site, so the boundaries matter more
   than the mechanics:

   - It NAMES a feeling. It does not assess, score, diagnose, or suggest what to
     do about it. "You seem anxious, try breathing" would be advice from a
     website that knows nothing about the person.
   - Every feeling is treated the same. Difficult ones get no warning colour, no
     frowny commentary, no nudge toward a "better" face. The line under the name
     stays the same regardless.
   - Nothing is stored or sent anywhere. The face exists in this tab only.

   The word comes from the mouth, with the eyebrows shifting the shade of it —
   the same mouth under worried brows is a different feeling from under calm
   ones, which is also roughly how faces work. */

/* Each brow spans x 28-39 on the left and 61-72 on the right, so 39 and 61 are
   the INNER ends, next to the nose. That is the whole grammar of an eyebrow:

     inner end raised  = worried / sad
     inner end lowered = angry / furrowed
     outer end lowered = tired

   An earlier draft had "Worried" with its inner ends lowered, which is the
   anger shape — it read as a scowl. On a page whose entire job is helping
   someone find the right word, the picture has to match the word. */
const BROWS = [
  { id: "calm",    label: "Level",    d: "M28 30c3-2 8-2 11 0M61 30c3-2 8-2 11 0" },
  { id: "raised",  label: "Raised",   d: "M28 27c3-4 8-4 11 0M61 27c3-4 8-4 11 0" },
  { id: "worried", label: "Worried",  d: "M28 31c3-3 8-5 11-6M61 25c3 1 8 3 11 6" },
  { id: "furrow",  label: "Furrowed", d: "M28 25c3 2 8 4 11 6M61 31c3-2 8-4 11-6" },
  { id: "tired",   label: "Drooping", d: "M28 31c4 0 8-1 11-2M61 29c4 1 8 2 11 2" },
];

const EYES = [
  { id: "open",   label: "Open",    render: () => (<><circle cx="34" cy="45" r="5" /><circle cx="66" cy="45" r="5" /></>) },
  { id: "wide",   label: "Wide",    render: () => (<><circle cx="34" cy="45" r="7.5" /><circle cx="66" cy="45" r="7.5" /></>) },
  { id: "soft",   label: "Softened", render: () => (<><path d="M28 45c3-4 9-4 12 0" /><path d="M60 45c3-4 9-4 12 0" /></>) },
  { id: "closed", label: "Closed",  render: () => (<><path d="M28 46c3 3 9 3 12 0" /><path d="M60 46c3 3 9 3 12 0" /></>) },
];

/* The base word lives here. Keep this list plain and everyday — a child should
   recognise every one of them. */
const MOUTHS = [
  { id: "smile",  label: "Smiling",  feeling: "Happy",      d: "M35 68c6 8 24 8 30 0" },
  { id: "small",  label: "Small",    feeling: "Okay",       d: "M40 70c4 3 16 3 20 0" },
  { id: "flat",   label: "Flat",     feeling: "Calm",       d: "M39 70h22" },
  { id: "wobble", label: "Wobbly",   feeling: "Unsure",     d: "M38 70c4-3 7 3 11 0s7-3 13 0" },
  { id: "frown",  label: "Turned down", feeling: "Sad",     d: "M35 74c6-8 24-8 30 0" },
  /* "Round", not "Open" — the Eyes row already has an "Open", and two buttons
     with the same name on one screen are ambiguous to anyone driving the page
     by voice. */
  { id: "open",   label: "Round",    feeling: "Surprised",  d: "M50 62c9 0 13 6 13 10s-4 8-13 8-13-4-13-8 4-10 13-10Z" },
  { id: "tight",  label: "Tight",    feeling: "Frustrated", d: "M38 70h24" , tight: true },
];

/* Eyebrows shade the mouth's word rather than overriding it. Anything not
   listed falls back to the mouth's own feeling. */
const SHADES = {
  worried: { Happy: "Relieved", Okay: "Nervous", Calm: "Uneasy", Unsure: "Worried", Sad: "Hurt", Surprised: "Startled", Frustrated: "Anxious" },
  furrow:  { Happy: "Determined", Okay: "Focused", Calm: "Serious", Unsure: "Confused", Sad: "Upset", Surprised: "Alarmed", Frustrated: "Angry" },
  raised:  { Happy: "Excited", Okay: "Curious", Calm: "Interested", Unsure: "Puzzled", Sad: "Disappointed", Surprised: "Amazed", Frustrated: "Impatient" },
  tired:   { Happy: "Content", Okay: "Tired", Calm: "Sleepy", Unsure: "Worn out", Sad: "Low", Surprised: "Dazed", Frustrated: "Fed up" },
};

export default function HowAmIFeeling() {
  const [brow, setBrow] = useState(BROWS[0]);
  const [eye, setEye] = useState(EYES[0]);
  const [mouth, setMouth] = useState(MOUTHS[2]);

  const feeling = useMemo(
    () => SHADES[brow.id]?.[mouth.feeling] || mouth.feeling,
    [brow, mouth],
  );

  const rows = [
    { title: "Eyebrows", items: BROWS, current: brow, set: setBrow },
    { title: "Eyes", items: EYES, current: eye, set: setEye },
    { title: "Mouth", items: MOUTHS, current: mouth, set: setMouth },
  ];

  return (
    <div>
      <div className="feel">
        <svg className="feel__face" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="#F5CE63" />
          <circle cx="50" cy="50" r="46" fill="#fff" opacity=".12" />
          <g stroke="#7A5A12" strokeWidth="3.4" strokeLinecap="round" fill="none">
            <path d={brow.d} />
          </g>
          <g fill="#3D2E08" stroke="#3D2E08" strokeWidth="3" strokeLinecap="round"
             style={{ fill: eye.id === "soft" || eye.id === "closed" ? "none" : "#3D2E08" }}>
            {eye.render()}
          </g>
          {mouth.id === "open" ? (
            <path d={mouth.d} fill="#8A4A3C" />
          ) : (
            <path
              d={mouth.d}
              stroke="#8A4A3C"
              strokeWidth={mouth.tight ? 5 : 4}
              strokeLinecap="round"
              fill="none"
            />
          )}
        </svg>

        <div className="feel__word" role="status" aria-live="polite">
          <span>This face looks</span>
          <strong>{feeling}</strong>
          <p>Every one of these is an okay thing to feel.</p>
        </div>
      </div>

      {rows.map((row) => (
        <div className="feel__row" key={row.title}>
          <span className="feel__label">{row.title}</span>
          <div className="feel__opts" role="group" aria-label={row.title}>
            {row.items.map((it) => (
              <button
                key={it.id}
                type="button"
                aria-pressed={row.current.id === it.id}
                onClick={() => row.set(it)}
              >
                {it.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      <p className="gnote">
        Nothing here is saved or sent anywhere. If you want to talk to someone
        about how you&rsquo;re feeling, our team is a message away.
      </p>
    </div>
  );
}
