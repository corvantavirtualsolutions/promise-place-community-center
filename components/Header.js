"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "./site";
import { ArrowRight } from "./Icons";
import LogoMark from "./LogoMark";

/* Header keeps only the four primary destinations. Everything else is
   reachable from the footer and from the "More" group in the mobile menu. */
const PRIMARY = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/who-we-serve", label: "Who We Serve" },
];

const SECONDARY = [
  { href: "/school-based-services", label: "School-Based Services" },
  { href: "/insurance", label: "Insurance & Payment" },
  { href: "/get-started", label: "How to Get Started" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href) => pathname === href;
  const linkProps = (href) => ({
    className: isActive(href) ? "is-active" : undefined,
    "aria-current": isActive(href) ? "page" : undefined,
  });

  return (
    <header className={`header ${stuck ? "is-stuck" : ""}`}>
      <div className="container header__inner">
        <Link className="logo" href="/" aria-label={`${SITE.name} — home`}>
          <span className="logo__mark"><LogoMark size={44} /></span>
          <span className="logo__text">
            <span className="logo__name">{SITE.shortName}</span>
            <span className="logo__sub">Community Center</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Main navigation">
          {PRIMARY.map((l) => (
            <Link key={l.href} href={l.href} {...linkProps(l.href)}>{l.label}</Link>
          ))}
        </nav>

        <div className="header__cta">
          <Link className="btn btn-primary" href="/contact">
            Contact Us <ArrowRight />
          </Link>
        </div>

        <button
          className="burger"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </div>

      <div id="mobile-nav" className={`mobile-nav ${open ? "is-open" : ""}`}>
        <ul>
          <li><Link href="/" {...linkProps("/")}>Home</Link></li>
          {PRIMARY.map((l) => (
            <li key={l.href}><Link href={l.href} {...linkProps(l.href)}>{l.label}</Link></li>
          ))}
          <li><Link href="/contact" {...linkProps("/contact")}>Contact</Link></li>
        </ul>

        <span className="mobile-nav__label">More</span>
        <ul className="mobile-nav__secondary">
          {SECONDARY.map((l) => (
            <li key={l.href}><Link href={l.href} {...linkProps(l.href)}>{l.label}</Link></li>
          ))}
        </ul>

        <Link className="btn btn-primary btn-block" href="/contact">
          Get Started <ArrowRight />
        </Link>
      </div>
    </header>
  );
}
