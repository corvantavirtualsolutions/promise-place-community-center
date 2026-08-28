// Shared inline SVG icon set. Decorative by default (aria-hidden),
// so meaning is always carried by adjacent text — never by icon alone.

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

export const Heart = (p) => (
  <svg {...base} {...p}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21.2l7.7-7.8 1.1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>
);

export const Users = (p) => (
  <svg {...base} {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);

export const Smile = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01M15 9h.01" /></svg>
);

export const School = (p) => (
  <svg {...base} {...p}><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" /></svg>
);

export const Check = (p) => (
  <svg {...base} {...p}><path d="m20 6-11 11-5-5" /></svg>
);

export const CheckCircle = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="m8.4 12.3 2.4 2.4 4.8-5" /></svg>
);

export const ArrowRight = (p) => (
  <svg {...base} {...p}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
);

export const ChevronDown = (p) => (
  <svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>
);

export const Mail = (p) => (
  <svg {...base} {...p}><rect x="2.5" y="4.5" width="19" height="15" rx="2.5" /><path d="m3.5 7.5 8.5 5.5 8.5-5.5" /></svg>
);

export const MapPin = (p) => (
  <svg {...base} {...p}><path d="M20 10.5c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10.5" r="3" /></svg>
);

export const Video = (p) => (
  <svg {...base} {...p}><rect x="2.5" y="6" width="13" height="12" rx="2.5" /><path d="m15.5 10.5 6-3.5v10l-6-3.5z" /></svg>
);

export const Clipboard = (p) => (
  <svg {...base} {...p}><path d="M9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" /><rect x="9" y="2.5" width="6" height="4" rx="1.2" /><path d="M9 12h6M9 16h4" /></svg>
);

export const Compass = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1z" /></svg>
);

export const Sparkle = (p) => (
  <svg {...base} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m6.3 6.3 2.6 2.6M15.1 15.1l2.6 2.6M17.7 6.3l-2.6 2.6M8.9 15.1l-2.6 2.6" /></svg>
);

export const Blocks = (p) => (
  <svg {...base} {...p}><rect x="3" y="3" width="7.5" height="7.5" rx="2" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="2" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="2" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" /></svg>
);

export const Shield = (p) => (
  <svg {...base} {...p}><path d="M12 2.5 4.5 5.8v6.2c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V5.8z" /><path d="m9.2 12 2 2 3.6-3.8" /></svg>
);

export const Sun = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="4.2" /><path d="M12 2v2.2M12 19.8V22M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2 12h2.2M19.8 12H22M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" /></svg>
);

export const Flame = (p) => (
  <svg {...base} {...p}><path d="M12 2.7s5.5 4.2 5.5 9.3a5.5 5.5 0 1 1-11 0C6.5 6.9 12 2.7 12 2.7z" /><path d="M12 21a2.7 2.7 0 0 0 2.7-2.7c0-1.9-2.7-3.9-2.7-3.9s-2.7 2-2.7 3.9A2.7 2.7 0 0 0 12 21z" /></svg>
);

export const Leaf = (p) => (
  <svg {...base} {...p}><path d="M11 20.5A7.5 7.5 0 0 1 18.5 6c2 0 3 .5 3 .5s.5 9.5-6.3 12.6c-1.6.7-4.2 1.4-4.2 1.4z" /><path d="M4 21.5c1.8-5.8 4.7-9 8.6-11.5" /></svg>
);

export const Info = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 16.5V11.5M12 8h.01" /></svg>
);

export const Alert = (p) => (
  <svg {...base} {...p}><path d="M10.3 3.9 1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9.5V14M12 17.5h.01" /></svg>
);

export const Lock = (p) => (
  <svg {...base} {...p}><rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></svg>
);

export const Chat = (p) => (
  <svg {...base} {...p}><path d="M21 11.6a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.8L3 21l1.9-5.4A8.4 8.4 0 0 1 12 3.2a8.4 8.4 0 0 1 9 8.4z" /></svg>
);

export const Home = (p) => (
  <svg {...base} {...p}><path d="m3 10.5 9-7.5 9 7.5" /><path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" /></svg>
);

export const Building = (p) => (
  <svg {...base} {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M10 21v-3.5h4V21" /></svg>
);

export const Handshake = (p) => (
  <svg {...base} {...p}><path d="M11 6.5 8.6 8.9a2 2 0 0 0 0 2.8l.2.2a2 2 0 0 0 2.8 0L13 10.3" /><path d="m13 10.3 3.4 3.4a1.8 1.8 0 0 1-2.6 2.6l-.6-.6" /><path d="M2.5 8.5 6 5h4l3 3" /><path d="M21.5 8.5 18 5h-3l-2 2" /><path d="m13.2 15.7-1.9 1.9a1.8 1.8 0 0 1-2.6-2.6" /></svg>
);
