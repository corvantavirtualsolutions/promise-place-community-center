import Reveal from "./Reveal";
import { Check, ArrowRight, School } from "./Icons";

const POINTS = [
  "Mental health needs",
  "Behavioral needs",
  "Children who may need additional support in school",
  "Collaboration around student behavioral and emotional needs",
];

export default function SchoolBased() {
  return (
    <>
      <svg className="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" style={{ height: 70, background: "var(--bg-warm)" }}>
        <path d="M0 80V34c180-34 360 24 540 24s360-58 540-38c120 22 240 34 360 24v36z" fill="#0E5F6E" />
      </svg>

      <section className="section school" id="school-based" style={{ paddingTop: "clamp(30px, 4vw, 50px)" }}>
        <span className="blob" style={{ width: 320, height: 320, background: "#14B8A6", opacity: .13, top: "6%", left: "-110px" }} aria-hidden="true" />

        <div className="container school__grid">
          <Reveal>
            <span className="eyebrow">School-Based Services</span>
            <h2>Support doesn&rsquo;t stop at the office.</h2>
            <p style={{ fontSize: "1.08rem" }}>
              Promise Place Community Center also provides school-based services
              focused on mental health and behavior, delivered within school
              environments where students already spend their days.
            </p>
            <ul className="school__list">
              {POINTS.map((p) => (
                <li key={p}><Check /> <span>{p}</span></li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <div className="program-card">
              <span className="tag">Featured Program</span>
              <h3 style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <School style={{ width: 26, height: 26, color: "#FCD34D", flex: "none" }} />
                Alternative to Explosion
              </h3>
              <p>
                Promise Place Community Center offers an Alternative to Explosion
                Program for schools &mdash; a specialized school-based program for
                students who need additional behavioral and emotional support.
              </p>
              <p style={{ color: "#fff", fontWeight: 650 }}>
                Interested in bringing this program to your school?
              </p>
              <a className="btn btn-sun" href="#contact">
                Contact Us to Learn More <ArrowRight />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <svg className="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" style={{ height: 70, background: "var(--bg)" }}>
        <path d="M0 0v40c180 34 360-22 540-22s360 56 540 36c120-20 240-32 360-22V0z" fill="#0C4F5C" />
      </svg>
    </>
  );
}
