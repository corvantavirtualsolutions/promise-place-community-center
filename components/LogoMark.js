"use client";

import { useId } from "react";

/* Promise Place Community Center — primary mark.
   Two people sharing ONE WHOLE heart.

   The heart must never read as split or broken. It is drawn as a complete
   heart in the left colour, with the right half painted over the top — an
   overlap rather than two halves butted together, so no hairline seam can
   appear at any size. Heads are separate circles for the same reason: merging
   head and body into one path makes the mirrored figures wind in opposite
   directions and the overlap gets knocked out as a hole. */
export default function LogoMark({ size = 44, tone = "color", className = "" }) {
  const uid = useId().replace(/:/g, "");
  const L = `ppL-${uid}`;
  const R = `ppR-${uid}`;

  const mono = tone !== "color";
  const solid = tone === "white" ? "#FFFFFF" : "var(--ink)";
  const fillL = mono ? solid : `url(#${L})`;
  const fillR = mono ? solid : `url(#${R})`;

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
          <linearGradient id={L} x1="8" y1="6" x2="32" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3ECFB6" />
            <stop offset="1" stopColor="#0C7267" />
          </linearGradient>
          <linearGradient id={R} x1="32" y1="6" x2="58" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#6CC5F5" />
            <stop offset="1" stopColor="#1B82C9" />
          </linearGradient>
        </defs>
      )}

      {/* the whole heart */}
      <path
        fill={fillL}
        d="M32 51.6C32 51.6 9.4 39.6 9.4 29.5 9.4 23.6 14.1 18.9 20 18.9c4.9 0 8.9 3.4 12 8.7 3.1-5.3 7.1-8.7 12-8.7 5.9 0 10.6 4.7 10.6 10.6 0 10.1-22.6 22.1-22.6 22.1Z"
      />
      {/* right half painted over it — colour split, not a cut */}
      {!mono && (
        <path
          fill={fillR}
          d="M32 51.6C32 51.6 54.6 39.6 54.6 29.5c0-5.9-4.7-10.6-10.6-10.6-4.9 0-8.9 3.4-12 8.7Z"
        />
      )}
      <circle cx="21.6" cy="14.2" r="8.1" fill={fillL} />
      <circle cx="42.4" cy="14.2" r="8.1" fill={fillR} />
    </svg>
  );
}
