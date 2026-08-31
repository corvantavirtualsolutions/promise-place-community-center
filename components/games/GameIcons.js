/* Simple SVG symbols for the games. Drawn in-house rather than using emoji so
   they render identically everywhere and match the site's illustration style. */

const S = ({ children, ...p }) => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false" {...p}>{children}</svg>
);

export const Flower = (p) => (
  <S {...p}>
    <g fill="#EE6A62">
      <ellipse cx="24" cy="13" rx="7" ry="9" />
      <ellipse cx="24" cy="31" rx="7" ry="9" />
      <ellipse cx="15" cy="22" rx="9" ry="7" />
      <ellipse cx="33" cy="22" rx="9" ry="7" />
    </g>
    <circle cx="24" cy="22" r="6" fill="#F5CE63" />
  </S>
);

export const Sun = (p) => (
  <S {...p}>
    <circle cx="24" cy="24" r="10" fill="#F5CE63" />
    <g stroke="#E8AC1E" strokeWidth="3.4" strokeLinecap="round">
      <path d="M24 4v5M24 39v5M4 24h5M39 24h5M9.9 9.9l3.5 3.5M34.6 34.6l3.5 3.5M38.1 9.9l-3.5 3.5M13.4 34.6l-3.5 3.5" />
    </g>
  </S>
);

export const Rainbow = (p) => (
  <S {...p}>
    <g fill="none" strokeLinecap="round" strokeWidth="5">
      <path d="M6 36a18 18 0 0 1 36 0" stroke="#EE6A62" />
      <path d="M13 36a11 11 0 0 1 22 0" stroke="#F5CE63" />
      <path d="M20 36a4 4 0 0 1 8 0" stroke="#3BA3E8" />
    </g>
  </S>
);

export const Heart = (p) => (
  <S {...p}>
    <path d="M24 39s-14-8.6-14-17.2A7.8 7.8 0 0 1 24 17a7.8 7.8 0 0 1 14 4.8C38 30.4 24 39 24 39Z" fill="#EE6A62" />
  </S>
);

export const Butterfly = (p) => (
  <S {...p}>
    <path d="M23 24 10 13c-4 3-4 10 0 14s10 2 13-3Z" fill="#8468E0" />
    <path d="M25 24 38 13c4 3 4 10 0 14s-10 2-13-3Z" fill="#3BA3E8" />
    <path d="M23 24 12 33c3 4 9 4 11 0Z" fill="#A78BFA" />
    <path d="M25 24l11 9c-3 4-9 4-11 0Z" fill="#7DD3FC" />
    <rect x="22.6" y="12" width="2.8" height="24" rx="1.4" fill="#16242D" />
  </S>
);

export const Leaf = (p) => (
  <S {...p}>
    <path d="M36 10s2 18-9 24c-6 3.2-13 3-13 3s-2-12 6-19c6-5.2 16-8 16-8Z" fill="#14A894" />
    <path d="M12 40c5-11 12-18 20-24" stroke="#0C7267" strokeWidth="2.6" strokeLinecap="round" />
  </S>
);

export const Star = (p) => (
  <S {...p}>
    <path d="m24 7 5.4 11.2 12.3 1.7-8.9 8.6 2.2 12.2L24 35l-11 5.7 2.2-12.2-8.9-8.6 12.3-1.7L24 7Z" fill="#F5CE63" />
  </S>
);

export const Cloud = (p) => (
  <S {...p}>
    <path d="M14 34a8 8 0 0 1 .6-16 11 11 0 0 1 20.6 3.2A7 7 0 0 1 34 34H14Z" fill="#7DD3FC" />
  </S>
);

/* Calm Catch items */
export const Sparkle = (p) => (
  <S {...p}>
    <path d="M24 6c2 10 8 16 18 18-10 2-16 8-18 18-2-10-8-16-18-18 10-2 16-8 18-18Z" fill="#F5CE63" />
  </S>
);
export const Bolt = (p) => (
  <S {...p}><path d="M27 5 11 27h10l-3 16 19-24H26l1-14Z" fill="#8A8FA3" /></S>
);
export const RainCloud = (p) => (
  <S {...p}>
    <path d="M14 28a7 7 0 0 1 .6-14 10 10 0 0 1 18.7 2.9A6.2 6.2 0 0 1 33 28H14Z" fill="#9AA7B4" />
    <g stroke="#7A8794" strokeWidth="3" strokeLinecap="round">
      <path d="M17 33l-2 6M25 33l-2 6M33 33l-2 6" />
    </g>
  </S>
);

export const MEMORY_SYMBOLS = [
  { key: "flower",    label: "Flower",    Icon: Flower },
  { key: "sun",       label: "Sun",       Icon: Sun },
  { key: "rainbow",   label: "Rainbow",   Icon: Rainbow },
  { key: "heart",     label: "Heart",     Icon: Heart },
  { key: "butterfly", label: "Butterfly", Icon: Butterfly },
  { key: "leaf",      label: "Leaf",      Icon: Leaf },
  { key: "star",      label: "Star",      Icon: Star },
  { key: "cloud",     label: "Cloud",     Icon: Cloud },
];
