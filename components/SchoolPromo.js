import Link from "next/link";
import Reveal from "./Reveal";
import { Check, ArrowRight, School } from "./Icons";

const POINTS = [
  "Mental health needs",
  "Behavioral needs",
  "Children who may need additional support in school",
];

export default function SchoolPromo() {
  return (
    <section className="section section--soft">
      <div className="container">
        <Reveal className="promo">
          <div>
            <span className="eyebrow">School-Based Services</span>
            <h2>Support doesn&rsquo;t stop at the office.</h2>
            <p>
              We provide school-based mental health and behavioral services
              delivered within school environments &mdash; including our Alternative
              to Explosion Program for schools.
            </p>
            <ul className="school__list" style={{ marginTop: 22 }}>
              {POINTS.map((p) => (
                <li key={p}><Check /> <span>{p}</span></li>
              ))}
            </ul>
          </div>

          <div style={{ textAlign: "center" }}>
            <span
              className="chip"
              style={{
                width: 76, height: 76, borderRadius: 24, marginInline: "auto",
                background: "rgba(255,255,255,.14)", color: "#FCD34D",
              }}
            >
              <School style={{ width: 38, height: 38 }} />
            </span>
            <h3 style={{ marginBottom: 10 }}>Alternative to Explosion</h3>
            <p style={{ marginBottom: 22 }}>
              A specialized program offered to schools.
            </p>
            <Link className="btn btn-sun" href="/school-based-services">
              Learn About School Services <ArrowRight />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
