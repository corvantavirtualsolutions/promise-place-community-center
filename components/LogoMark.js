"use client";

import { useId } from "react";

/* Promise Place Community Center — primary mark.
   Two figures whose bodies together form a heart: people, together, cared for.
   `tone`: "color" | "white" | "ink". Gradient ids are unique per instance so
   several marks can share a page safely. */
export default function LogoMark({ size = 44, tone = "color", className = "" }) {
  const uid = useId().replace(/[:]/g, "");
  const L = `ppL-${uid}`;
  const R = `ppR-${uid}`;

  const fillL = tone === "color" ? `url(#${L})` : tone === "white" ? "#FFFFFF" : "var(--ink)";
  const fillR = tone === "color" ? `url(#${R})` : tone === "white" ? "#FFFFFF" : "var(--ink)";

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
      {tone === "color" && (
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
      <path
        fill={fillL}
        d="M21.6 6.1a8.1 8.1 0 1 1 0 16.2 8.1 8.1 0 0 1 0-16.2Z
           M30.7 51.6C30.7 51.6 9.4 39.6 9.4 29.5 9.4 23.6 14.1 18.9 20 18.9c4.5 0 8.2 2.9 10.7 7.5Z"
      />
      <path
        fill={fillR}
        d="M42.4 6.1a8.1 8.1 0 1 1 0 16.2 8.1 8.1 0 0 1 0-16.2Z
           M33.3 51.6C33.3 51.6 54.6 39.6 54.6 29.5c0-5.9-4.7-10.6-10.6-10.6-4.5 0-8.2 2.9-10.7 7.5Z"
      />
    </svg>
  );
}
