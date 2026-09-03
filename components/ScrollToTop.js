"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/* Puts you at the top of every page you navigate to.

   The App Router does scroll to the top on its own, but this site sets
   `scroll-behavior: smooth` on <html> so that in-page anchor links glide. That
   turns the router's scrollTo(0,0) into an ANIMATION — and the animation is
   racing a route change that swaps the whole document underneath it. Change
   height mid-flight and the browser abandons the scroll wherever it happens to
   be, which is how you land halfway down a page you have never seen.

   So: turn smooth off for the one frame it takes to jump, then hand it back.

   Two navigations are deliberately left alone:

   - Back and forward. Browsers restore your old position, and people rely on
     that — returning to a list of services and being thrown to the top, having
     lost your place, is the more annoying bug. popstate tells us which is which.
   - Anything with a #hash. That is a request for a specific spot on the page,
     and overruling it would break every anchor link on the site. */

export default function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const cameFromHistory = useRef(false);

  useEffect(() => {
    const onPop = () => { cameFromHistory.current = true; };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    // A fresh page load is already at the top, or is honouring a deep link.
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    if (cameFromHistory.current) { cameFromHistory.current = false; return; }
    if (window.location.hash) return;

    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    /* Twice, a frame apart. The first call lands before the incoming page has
       finished mounting; if that page is taller or shorter than the one it
       replaced, the browser adjusts the scroll position afterwards and can
       leave us a few hundred pixels down. The second call is the one that
       sticks. */
    const frame = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => { html.style.scrollBehavior = previous; });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
