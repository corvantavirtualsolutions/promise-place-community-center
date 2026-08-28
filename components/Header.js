"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "./site";
import { Heart, ArrowRight } from "./Icons";

const LINKS = [
  { href: "/about", label: "About", short: "About" },
  { href: "/services", label: "Services", short: "Services" },
  { href: "/who-we-serve", label: "Who We Serve", short: "Who We Serve" },
  { href: "/school-based-services", label: "School-Based Services", short: "Schools" },
  { href: "/insurance", label: "Insurance & Payment", short: "Insurance" },
  { href: "/get-started", label: "How to Get Started", short: "Get Started" },
  { href: "/faq", label: "FAQ", short: null },
  { href: "/contact", label: "Contact", short: null },
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

  // Close the mobile menu whenever the route changes.
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href) => pathname === href;

  return (
    <header className={`header ${stuck ? "is-stuck" : ""}`}>
      <div className="container header__inner">
        {/* LOGO PLACEHOLDER — replace the mark below with the real logo file.
            See README.md → "Adding the real logo". */}
        <Link className="logo" href="/" aria-label={`${SITE.name} — home`}>
          <span className="logo__mark"><Heart /></span>
          <span className="logo__text">
            <span className="logo__name">{SITE.shortName}</span>
            <span className="logo__sub">Community Center</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Main navigation">
          {LINKS.filter((l) => l.short).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href) ? "is-active" : undefined}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {l.short}
            </Link>
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
          <li>
            <Link href="/" className={isActive("/") ? "is-active" : undefined}>Home</Link>
          </li>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={isActive(l.href) ? "is-active" : undefined}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link className="btn btn-primary btn-block" href="/contact">
          Get Started <ArrowRight />
        </Link>
      </div>
    </header>
  );
}
