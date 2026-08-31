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

export const Heart = (p) => (
  <S {...p}>
    <path d="M24 39s-14-8.6-14-17.2A7.8 7.8 0 0 1 24 17a7.8 7.8 0 0 1 14 4.8C38 30.4 24 39 24 39Z" fill="#EE6A62" />
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

export const Balloon = (p) => (
  <S {...p}>
    <path d="M24 6c7.2 0 12.5 5.6 12.5 13 0 7.9-7.4 14.4-12.5 14.4S11.5 26.9 11.5 19c0-7.4 5.3-13 12.5-13Z" fill="#5FBFA8" />
    <path d="M21.5 11.5c-2.6 1.3-4.2 3.8-4.4 6.8" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity=".7" />
    <path d="M22 33.4h4l-2 3.2Z" fill="#3E9C88" />
    <path d="M24 36.6c0 4-3.6 4-3.6 7.4" stroke="#8A9AA6" strokeWidth="1.8" strokeLinecap="round" />
  </S>
);

export const Notes = (p) => (
  <S {...p}>
    <g fill="#4C9BE0">
      <circle cx="15" cy="33" r="6" />
      <circle cx="33" cy="29" r="6" />
      <path d="M19 33V13l18-4v20h-4V13.8l-10 2.3V33Z" />
    </g>
    <circle cx="39" cy="12" r="2.6" fill="#F5CE63" />
  </S>
);

export const Stones = (p) => (
  <S {...p}>
    <g stroke="#DCC49A" strokeWidth="2.2" strokeLinecap="round" fill="none">
      <path d="M5 34c6-5 12-5 18 0s12 5 18 0" />
      <path d="M5 40c6-5 12-5 18 0s12 5 18 0" />
    </g>
    <ellipse cx="20" cy="24" rx="11" ry="7" fill="#8FA3AE" />
    <ellipse cx="20" cy="22" rx="11" ry="7" fill="#A7BAC4" />
    <ellipse cx="31" cy="14" rx="7" ry="5" fill="#8FA3AE" />
    <ellipse cx="31" cy="12.6" rx="7" ry="5" fill="#BCCBD3" />
  </S>
);

export const Mandala = (p) => (
  <S {...p}>
    <g fill="#9B7FE8">
      <circle cx="24" cy="24" r="5" />
      <g>
        <ellipse cx="24" cy="10" rx="3.4" ry="6" />
        <ellipse cx="24" cy="38" rx="3.4" ry="6" />
        <ellipse cx="10" cy="24" rx="6" ry="3.4" />
        <ellipse cx="38" cy="24" rx="6" ry="3.4" />
      </g>
    </g>
    <g fill="#F0A0B4">
      <circle cx="14.1" cy="14.1" r="3.6" />
      <circle cx="33.9" cy="14.1" r="3.6" />
      <circle cx="14.1" cy="33.9" r="3.6" />
      <circle cx="33.9" cy="33.9" r="3.6" />
    </g>
  </S>
);

