/* Custom flat SVG illustrations. Drawn in-house so there are no stock-photo
   licences to worry about, they scale losslessly, and they inherit the brand
   palette. Each is decorative unless given a `title`. */

const P = {
  teal:   "#14A894",
  tealD:  "#0B5A52",
  tealL:  "#A9E7DA",
  sky:    "#3BA3E8",
  skyL:   "#BCDFFA",
  sun:    "#F5CE63",
  sunD:   "#E8AC1E",
  coral:  "#EE6A62",
  coralL: "#FFC7C2",
  grape:  "#8468E0",
  grapeL: "#D6CDFB",
  cream:  "#FFF7E4",
  ink:    "#16242D",
};
const SKIN = ["#F2C9A0", "#DDA47A", "#A4693F", "#7A4A28"];
const HAIR = ["#3B2A22", "#5B3A2A", "#1F1815", "#6E4B32"];

function Svg({ title, viewBox, children, className = "", ...rest }) {
  const decorative = !title;
  return (
    <svg
      viewBox={viewBox}
      className={`illus ${className}`.trim()}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? "true" : undefined}
      focusable="false"
      style={{ width: "100%", height: "auto" }}
      {...rest}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

/* A simple standing figure: head, hair cap, rounded body. */
function Person({ x = 0, y = 0, s = 1, body = P.teal, skin = SKIN[0], hair = HAIR[0] }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-26 60V26a26 26 0 0 1 52 0v34z" fill={body} />
      <circle cx="0" cy="-8" r="18" fill={skin} />
      <path d="M0-26a18 18 0 0 0-18 17c5-3 11-5 18-5s13 2 18 5A18 18 0 0 0 0-26z" fill={hair} />
    </g>
  );
}

/* ---------------------------------------------------------------- About */
export function AboutArt({ title }) {
  return (
    <Svg viewBox="0 0 360 240" title={title}>
      <rect x="0" y="0" width="360" height="240" rx="24" fill={P.cream} />
      <circle cx="300" cy="52" r="30" fill={P.sun} opacity=".55" />
      <path d="M0 196c60-18 112 10 172 4s108-26 188-10v50H0z" fill={P.tealL} />
      {/* table */}
      <rect x="96" y="168" width="168" height="12" rx="6" fill={P.tealD} opacity=".18" />
      <Person x={124} y={140} s={1} body={P.teal}  skin={SKIN[0]} hair={HAIR[0]} />
      <Person x={236} y={140} s={1} body={P.sky}   skin={SKIN[2]} hair={HAIR[2]} />
      {/* speech bubbles */}
      <g className="art-sway">
        <rect x="150" y="42" width="66" height="42" rx="14" fill="#fff" />
        <path d="M170 84l-4 14 16-14z" fill="#fff" />
        <circle cx="167" cy="63" r="4" fill={P.coral} />
        <circle cx="183" cy="63" r="4" fill={P.sun} />
        <circle cx="199" cy="63" r="4" fill={P.grape} />
      </g>
      <circle cx="52" cy="60" r="9" fill={P.skyL} />
      <circle cx="82" cy="34" r="6" fill={P.coralL} />
      <circle cx="330" cy="150" r="7" fill={P.grapeL} />
    </Svg>
  );
}

/* ------------------------------------------------- Who we serve, per card */
export function ChildArt() {
  return (
    <Svg viewBox="0 0 160 120">
      <circle cx="80" cy="60" r="52" fill={P.tealL} opacity=".45" />
      <Person x={80} y={92} s={.72} body={P.teal} skin={SKIN[0]} hair={HAIR[0]} />
      {/* balloon */}
      <g className="art-sway">
        <path d="M112 40v22" stroke={P.tealD} strokeWidth="2" strokeLinecap="round" fill="none" />
        <ellipse cx="112" cy="30" rx="13" ry="15" fill={P.coral} />
      </g>
    </Svg>
  );
}

export function AdultArt() {
  return (
    <Svg viewBox="0 0 160 120">
      <circle cx="80" cy="60" r="52" fill={P.coralL} opacity=".45" />
      <Person x={80} y={96} s={.86} body={P.coral} skin={SKIN[1]} hair={HAIR[1]} />
      {/* potted plant, set clear of the figure */}
      <g transform="translate(124 78)">
        <path d="M-9 6h18l-2 14h-14z" fill={P.tealD} opacity=".55" />
        <path className="art-sway" d="M0 6V-6" stroke={P.teal} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse className="art-sway" cx="-6" cy="-6" rx="6" ry="4" fill={P.teal} />
        <ellipse className="art-sway" cx="6" cy="-10" rx="6" ry="4" fill={P.tealL} />
      </g>
    </Svg>
  );
}

export function FamilyArt() {
  return (
    <Svg viewBox="0 0 160 120">
      <circle cx="80" cy="60" r="52" fill={P.sunD} opacity=".22" />
      <Person x={52}  y={98} s={.78} body={P.teal}  skin={SKIN[0]} hair={HAIR[0]} />
      <Person x={108} y={98} s={.78} body={P.sky}   skin={SKIN[2]} hair={HAIR[2]} />
      <Person x={80}  y={104} s={.5} body={P.coral} skin={SKIN[1]} hair={HAIR[3]} />
      <path className="art-heart" style={{ transformOrigin: "80px 34px" }}
            d="M80 28c-5-6-14-2-14 5 0 6 8 11 14 15 6-4 14-9 14-15 0-7-9-11-14-5z" fill={P.grape} />
    </Svg>
  );
}

export function SchoolCardArt() {
  return (
    <Svg viewBox="0 0 160 120">
      <circle cx="80" cy="60" r="52" fill={P.grapeL} opacity=".5" />
      <rect x="46" y="52" width="68" height="50" rx="6" fill="#fff" />
      <path d="M40 52l40-26 40 26z" fill={P.grape} />
      <rect x="76" y="76" width="16" height="26" rx="3" fill={P.grape} />
      <rect x="56" y="64" width="12" height="12" rx="3" fill={P.skyL} />
      <rect x="100" y="64" width="12" height="12" rx="3" fill={P.skyL} />
      <g className="art-sway">
        <path d="M80 26V12" stroke={P.tealD} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M80 12h16l-5 6 5 6H80z" fill={P.sun} />
      </g>
    </Svg>
  );
}

/* ------------------------------------------------------- School (large) */
export function SchoolArt({ title }) {
  return (
    <Svg viewBox="0 0 320 220" title={title}>
      <circle cx="160" cy="106" r="96" fill="#fff" opacity=".07" />
      <rect x="70" y="86" width="180" height="104" rx="10" fill="#fff" opacity=".93" />
      <path d="M58 86l102-52 102 52z" fill={P.sun} />
      <rect x="140" y="134" width="40" height="56" rx="6" fill={P.tealD} />
      <rect x="92"  y="108" width="30" height="30" rx="6" fill={P.skyL} />
      <rect x="198" y="108" width="30" height="30" rx="6" fill={P.skyL} />
      <g className="art-sway">
        <path d="M160 34V10" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M160 10h26l-8 9 8 9h-26z" fill={P.coral} />
      </g>
      <Person x={104} y={190} s={.52} body={P.teal}  skin={SKIN[0]} hair={HAIR[0]} />
      <Person x={216} y={190} s={.52} body={P.grape} skin={SKIN[2]} hair={HAIR[2]} />
    </Svg>
  );
}

/* ------------------------------------------------------------ Insurance */
export function InsuranceArt({ title }) {
  return (
    <Svg viewBox="0 0 320 200" title={title}>
      <rect x="0" y="0" width="320" height="200" rx="22" fill={P.skyL} opacity=".35" />
      <path d="M160 30l58 24v42c0 34-25 62-58 70-33-8-58-36-58-70V54z" fill="#fff" />
      <path d="M160 44l45 19v33c0 26-19 48-45 55-26-7-45-29-45-55V63z" fill={P.sky} opacity=".16" />
      <path className="art-heart" style={{ transformOrigin: "160px 108px" }}
            d="M160 96c-7-8-20-3-20 7 0 9 12 16 20 22 8-6 20-13 20-22 0-10-13-15-20-7z" fill={P.coral} />
      <rect x="26" y="118" width="66" height="42" rx="8" fill={P.sun} />
      <rect x="34" y="132" width="34" height="5" rx="2.5" fill="#fff" opacity=".8" />
      <rect x="34" y="143" width="22" height="5" rx="2.5" fill="#fff" opacity=".6" />
      <rect x="228" y="118" width="66" height="42" rx="8" fill={P.teal} />
      <rect x="236" y="132" width="34" height="5" rx="2.5" fill="#fff" opacity=".8" />
      <rect x="236" y="143" width="22" height="5" rx="2.5" fill="#fff" opacity=".6" />
      <circle cx="52" cy="52" r="10" fill={P.grapeL} />
      <circle cx="272" cy="46" r="7" fill={P.tealL} />
    </Svg>
  );
}

/* ---------------------------------------------------------- Get started */
export function StepsArt({ title }) {
  return (
    <Svg viewBox="0 0 320 180" title={title}>
      <path d="M28 140c50-6 62-52 112-52s70 34 122 6" stroke={P.tealL} strokeWidth="6"
            strokeLinecap="round" strokeDasharray="2 16" fill="none" />
      <circle cx="40" cy="138" r="22" fill={P.teal} />
      <circle cx="160" cy="90" r="22" fill={P.sky} />
      <circle cx="272" cy="100" r="22" fill={P.sun} />
      <path d="M33 138l5 5 10-11" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M153 90l5 5 10-11" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M265 100l5 5 10-11" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="96" cy="46" r="7" fill={P.coralL} />
      <circle cx="216" cy="38" r="9" fill={P.grapeL} />
    </Svg>
  );
}

/* -------------------------------------------------------------- Contact */
export function ContactArt({ title }) {
  return (
    <Svg viewBox="0 0 320 190" title={title}>
      <circle cx="160" cy="96" r="82" fill={P.tealL} opacity=".35" />
      <rect x="76" y="66" width="168" height="106" rx="14" fill="#fff" />
      <path d="M76 80l84 54 84-54" stroke={P.teal} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <g className="art-sway">
        <rect x="112" y="16" width="96" height="52" rx="16" fill={P.sky} />
        <path d="M138 68l-2 16 18-16z" fill={P.sky} />
        <circle cx="140" cy="42" r="5" fill="#fff" />
        <circle cx="160" cy="42" r="5" fill="#fff" />
        <circle cx="180" cy="42" r="5" fill="#fff" />
      </g>
      <circle cx="44" cy="60" r="9" fill={P.sun} />
      <circle cx="282" cy="132" r="7" fill={P.coralL} />
    </Svg>
  );
}

/* ------------------------------------------------------------------ 404 */
export function NotFoundArt({ title }) {
  return (
    <Svg viewBox="0 0 300 180" title={title}>
      <circle cx="150" cy="90" r="70" fill={P.tealL} opacity=".4" />
      <circle cx="150" cy="90" r="46" fill="#fff" />
      <circle cx="150" cy="90" r="46" fill="none" stroke={P.teal} strokeWidth="4" />
      <path d="M168 72l-11 27-27 11 11-27z" fill={P.coral} />
      <circle cx="150" cy="90" r="5" fill={P.tealD} />
      <circle cx="52" cy="44" r="8" fill={P.sun} />
      <circle cx="252" cy="132" r="10" fill={P.grapeL} />
    </Svg>
  );
}

/* Shown after someone sends the contact form. A person waving from inside a
   heart — warm rather than transactional, which matters more here than on an
   ordinary "form submitted" screen. */
export function ThankYouArt({ title = "An illustration of a person waving inside a heart" }) {
  return (
    <svg viewBox="0 0 220 200" role="img" aria-label={title}>
      <defs>
        <linearGradient id="tyHeart" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6FD5C2" />
          <stop offset="100%" stopColor="#8CC8F5" />
        </linearGradient>
      </defs>

      <circle cx="34" cy="40" r="7" fill="#FAE3A3" />
      <circle cx="192" cy="52" r="5" fill="#FFC7C2" />
      <circle cx="182" cy="150" r="8" fill="#D6CDFB" />
      <circle cx="28" cy="140" r="5" fill="#BCDFFA" />

      {/* heart */}
      <path
        d="M110 178C110 178 30 138 30 88 30 65 48 47 71 47c16 0 29 10 39 27 10-17 23-27 39-27 23 0 41 18 41 41 0 50-80 90-80 90Z"
        fill="url(#tyHeart)"
      />
      <path
        d="M110 178C110 178 30 138 30 88 30 65 48 47 71 47c16 0 29 10 39 27 10-17 23-27 39-27 23 0 41 18 41 41 0 50-80 90-80 90Z"
        fill="#fff" opacity=".14"
      />

      {/* person */}
      <circle cx="110" cy="97" r="20" fill="#FFE0C7" />
      <path d="M96 88c0-9 6-15 14-15s14 6 14 15c0 2-28 2-28 0Z" fill="#4A3A32" />
      <circle cx="103" cy="98" r="2.4" fill="#2E2A28" />
      <circle cx="117" cy="98" r="2.4" fill="#2E2A28" />
      <path d="M104 106c3 3 9 3 12 0" stroke="#2E2A28" strokeWidth="2.4"
            strokeLinecap="round" fill="none" />
      <path d="M110 117c14 0 24 9 24 21v8H86v-8c0-12 10-21 24-21Z" fill="#fff" />

      {/* waving arm */}
      <path d="M132 128c8-4 14-12 15-21" stroke="#fff" strokeWidth="9"
            strokeLinecap="round" fill="none" />
      <circle cx="149" cy="103" r="8" fill="#FFE0C7" />
      <g stroke="#F5CE63" strokeWidth="2.6" strokeLinecap="round">
        <path d="M160 96l6-4M162 104h7M158 88l4-6" />
      </g>
    </svg>
  );
}
