import { SITE } from "./site";
import { Heart, Mail, MapPin } from "./Icons";

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#school-based", label: "School-Based Services" },
  { href: "#get-started", label: "How to Get Started" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            {/* LOGO PLACEHOLDER — see README.md → "Adding the real logo". */}
            <a className="logo" href="#home" aria-label={`${SITE.name} — back to top`}>
              <span className="logo__mark"><Heart /></span>
              <span className="logo__text">
                <span className="logo__name">{SITE.shortName}</span>
                <span className="logo__sub">Community Center</span>
              </span>
            </a>
            <p>
              {SITE.tagline} for children, adults, and families throughout Indiana.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h4>Explore</h4>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href}>{n.label}</a></li>
              ))}
            </ul>
          </nav>

          <div>
            <h4>Get in Touch</h4>
            <ul>
              <li style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                <MapPin style={{ width: 19, height: 19, color: "var(--teal-300)", flex: "none", marginTop: 3 }} />
                <address>
                  {SITE.address1}<br />
                  {SITE.address2}
                </address>
              </li>
              <li style={{ display: "flex", gap: 11, alignItems: "center" }}>
                <Mail style={{ width: 19, height: 19, color: "var(--teal-300)", flex: "none" }} />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            </ul>
            <p style={{ fontSize: ".86rem", marginTop: 20 }}>
              If you are experiencing an emergency, call 911 or contact your local
              emergency service.
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p style={{ margin: 0 }}>&copy; {year} {SITE.name}. All rights reserved.</p>
          <div className="footer__legal">
            {/* PLACEHOLDER links — real policy copy has not been provided. */}
            <a href="#contact">Privacy Policy</a>
            <a href="#contact">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
