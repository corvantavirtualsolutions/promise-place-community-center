"use client";

import { useEffect, useState } from "react";
import { Heart, ArrowRight } from "./Icons";

const LINKS = [
  { href: "#about", label: "About", short: "About" },
  { href: "#services", label: "Services", short: "Services" },
  { href: "#who-we-serve", label: "Who We Serve", short: "Who We Serve" },
  { href: "#school-based", label: "School-Based Services", short: "Schools" },
  { href: "#insurance", label: "Insurance & Payment", short: "Insurance" },
  { href: "#get-started", label: "How to Get Started", short: "Get Started" },
  { href: "#faq", label: "FAQ", short: null },
  { href: "#contact", label: "Contact", short: null },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`header ${stuck ? "is-stuck" : ""}`}>
      <div className="container header__inner">
        {/* LOGO PLACEHOLDER — replace the mark below with the real logo file.
            See README.md → "Adding the real logo". */}
        <a className="logo" href="#home" aria-label="Promise Place Community Center — back to top">
          <span className="logo__mark"><Heart /></span>
          <span className="logo__text">
            <span className="logo__name">Promise Place</span>
            <span className="logo__sub">Community Center</span>
          </span>
        </a>

        <nav className="nav" aria-label="Main navigation">
          {LINKS.filter((l) => l.short).map((l) => (
            <a key={l.href} href={l.href}>{l.short}</a>
          ))}
        </nav>

        <div className="header__cta">
          <a className="btn btn-primary" href="#contact">
            Contact Us <ArrowRight />
          </a>
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
          <li><a href="#home" onClick={() => setOpen(false)}>Home</a></li>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a className="btn btn-primary btn-block" href="#contact" onClick={() => setOpen(false)}>
          Get Started <ArrowRight />
        </a>
      </div>
    </header>
  );
}
