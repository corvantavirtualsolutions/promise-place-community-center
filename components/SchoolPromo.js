import Link from "next/link";
import Reveal from "./Reveal";
import { SchoolArt } from "./Illustrations";
import { Check, ArrowRight } from "./Icons";

const POINTS = [
  "Mental health needs",
  "Behavioral needs",
  "Children who may need additional support in school",
];

export default function SchoolPromo() {
  return (
    <section className="section section--lilac">
      <div className="container">
        <Reveal className="promo" dir="scale">
          <div>
            <span className="eyebrow">School-Based Services</span>
            <h2>Support doesn&rsquo;t stop at the office.</h2>
            <p>
              We provide school-based mental health and behavioral services
              delivered within school environments &mdash; including our Alternative
              to Explosion Program for schools.
            </p>
            <ul className="school__list">
              {POINTS.map((p) => (
                <li key={p}><Check /> <span>{p}</span></li>
              ))}
            </ul>
          </div>

          <div style={{ textAlign: "center" }}>
            <div className="promo__art">
              <SchoolArt title="An illustration of a school building with two students outside" />
            </div>
            <h3 style={{ marginBottom: 8 }}>Alternative to Explosion</h3>
            <p style={{ marginBottom: 20 }}>A specialized program offered to schools.</p>
            <Link className="btn btn-sun" href="/school-based-services">
              Learn About School Services <ArrowRight />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
