import Link from "next/link";
import Reveal from "./Reveal";
import { ArrowRight, Check, Video, Shield } from "./Icons";

const POINTS = [
  "Children, adults & families",
  "In-person & telehealth",
  "Medicaid & commercial insurance",
  "School-based services",
];

export default function Hero() {
  return (
    <section className="hero" id="home">
      <span className="blob blob--sun"   style={{ width: 260, height: 260, top: "-70px", right: "16%" }} aria-hidden="true" />
      <span className="blob blob--coral" style={{ width: 190, height: 190, bottom: "-60px", left: "-50px" }} aria-hidden="true" />
      <span className="blob blob--grape" style={{ width: 130, height: 130, top: "24%", left: "44%", opacity: .35 }} aria-hidden="true" />

      <div className="container hero__grid">
        <Reveal>
          <span className="eyebrow">Serving families throughout Indiana</span>
          <h1>
            Support for{" "}
            <span style={{ position: "relative", whiteSpace: "nowrap" }}>
              <span style={{ position: "relative", zIndex: 2 }}>better days</span>
              <svg
                viewBox="0 0 240 18" preserveAspectRatio="none" aria-hidden="true"
                style={{ position: "absolute", left: 0, bottom: "-2px", width: "100%", height: "16px", zIndex: 1 }}
              >
                <path d="M3 12c48-9 108-11 234-6" fill="none" stroke="#FCD34D" strokeWidth="9" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="hero__lede">
            Promise Place Community Center provides compassionate, community-based
            mental health services designed to support children, adults, and
            families throughout Indiana. Because asking for support shouldn&rsquo;t
            feel hard.
          </p>

          <div className="hero__actions">
            <Link className="btn btn-primary" href="/get-started">Get Started <ArrowRight /></Link>
            <Link className="btn btn-secondary" href="/services">Explore Our Services</Link>
          </div>

          <ul className="hero__points">
            {POINTS.map((p) => (
              <li key={p}><Check /> {p}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="hero__art" delay={120}>
          <div className="hero__stat hero__stat--a floaty">
            <span className="chip chip--sky" style={{ width: 38, height: 38, borderRadius: 12, marginBottom: 0 }}>
              <Video style={{ width: 19, height: 19 }} />
            </span>
            <div>Telehealth<span>Therapy from home</span></div>
          </div>

          <div className="hero__stat hero__stat--b floaty floaty--slow">
            <span className="chip chip--teal" style={{ width: 38, height: 38, borderRadius: 12, marginBottom: 0 }}>
              <Shield style={{ width: 19, height: 19 }} />
            </span>
            <div>Medicaid accepted<span>& commercial insurance</span></div>
          </div>

          <div className="hero__art-inner">
            <svg viewBox="0 0 480 400" role="img" aria-labelledby="hero-art-title" style={{ width: "100%", height: "auto" }}>
              <title id="hero-art-title">
                An illustration of a family and a support worker standing together
                under a bright sun
              </title>
              <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EFF8FF" />
                  <stop offset="100%" stopColor="#EFFCF9" />
                </linearGradient>
              </defs>

              <rect x="0" y="0" width="480" height="400" rx="28" fill="url(#sky)" />

              {/* sun */}
              <circle cx="396" cy="74" r="38" fill="#FCD34D" />
              <g stroke="#FBBF24" strokeWidth="7" strokeLinecap="round">
                <path d="M396 14v-2M396 138v2M456 74h2M334 74h-2M440 30l2-2M350 120l-2 2M440 118l2 2M350 28l-2-2" />
              </g>

              {/* ground */}
              <path d="M0 318c90-26 160 14 244 6s150-40 236-16v92H0z" fill="#D2F6EE" />
              <path d="M0 344c96-20 168 10 250 4s142-28 230-10v62H0z" fill="#A6EDDD" opacity=".75" />

              {/* adult, teal */}
              <g>
                <path d="M62 330v-56a46 46 0 0 1 92 0v56z" fill="#0D9488" />
                <circle cx="108" cy="196" r="33" fill="#F7C9A6" />
                <path d="M108 163a33 33 0 0 0-33 30c10-6 22-9 33-9s23 3 33 9a33 33 0 0 0-33-30z" fill="#4A3B32" />
              </g>

              {/* child, coral */}
              <g>
                <path d="M196 330v-40a34 34 0 0 1 68 0v40z" fill="#FB7185" />
                <circle cx="230" cy="238" r="26" fill="#E8B48D" />
                <path d="M230 212a26 26 0 0 0-26 23c8-5 17-7 26-7s18 2 26 7a26 26 0 0 0-26-23z" fill="#2F2620" />
              </g>

              {/* adult, sky */}
              <g>
                <path d="M304 330v-54a44 44 0 0 1 88 0v54z" fill="#0284C7" />
                <circle cx="348" cy="200" r="32" fill="#8C5A3C" />
                <path d="M348 168a32 32 0 0 0-32 29c9-6 21-9 32-9s23 3 32 9a32 32 0 0 0-32-29z" fill="#231A15" />
              </g>

              {/* connecting heart */}
              <path
                d="M240 108c-14-15-38-5-38 14 0 16 22 29 38 41 16-12 38-25 38-41 0-19-24-29-38-14z"
                fill="#8B5CF6" opacity=".9"
              />

              {/* floating dots */}
              <circle cx="58" cy="92" r="9" fill="#7DD3FC" />
              <circle cx="150" cy="58" r="6" fill="#FDA4AF" />
              <circle cx="292" cy="52" r="7" fill="#5EE0C9" />
              <circle cx="432" cy="216" r="8" fill="#C4B5FD" />
              <circle cx="36" cy="228" r="6" fill="#FCD34D" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
