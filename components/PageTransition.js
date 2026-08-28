"use client";

import { usePathname } from "next/navigation";

/* Replays a short fade-and-lift each time the route changes.
   The key forces a remount so the animation restarts. */
export default function PageTransition({ children }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
