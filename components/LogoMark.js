"use client";

import { useId } from "react";

/* Promise Place Community Center — primary mark.
   A roof, and three people under it.

   Chosen over the previous two-figures-and-a-heart mark because it holds its
   shape everywhere it has to live: the roof and the three dots stay separate
   and legible at 24px in the header, in a single colour, and knocked out on
   the footer's dark teal. The old mark's two heads merged into one blob below
   about 24px.

   The roof is a STROKE with round caps and joins, not a filled shape. That
   keeps its weight identical at every size and avoids the winding/fill-rule
   trap the old mark hit — there is no overlap here to be knocked out.

   Three figures, not two: children, adults and families are all named on the
   site, and three reads as a group where two reads as a couple. */
export default function LogoMark({ size = 44, tone = "color", className = "" }) {
  const uid = useId().replace(/:/g, "");
  const g = `ppRoof-${uid}`;

  const mono = tone !== "color";
  const solid = tone === "white" ? "#FFFFFF" : "var(--ink)";
  const roof = mono ? solid : `url(#${g})`;

  /* On the dark footer the roof goes white but the people keep their colours —
     three white dots would read as a decoration rather than as people. */
  const people =
    tone === "white"
      ? ["#FB9D96", "#F5CE63", "#6CC5F5"]
      : mono
        ? [solid, solid, solid]
        : ["#EE6A62", "#F5CE63", "#1B82C9"];

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {!mono && (
        <defs>
          <linearGradient id={g} x1="9" y1="13" x2="55" y2="33" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3ECFB6" />
            <stop offset="1" stopColor="#0C7267" />
          </linearGradient>
        </defs>
      )}

      <path
        d="M9 33 32 13l23 20"
        stroke={roof}
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="19" cy="46" r="6.5" fill={people[0]} />
      <circle cx="32" cy="46" r="6.5" fill={people[1]} />
      <circle cx="45" cy="46" r="6.5" fill={people[2]} />
    </svg>
  );
}
