/* Decorative curve between two sections.
   `from` is the colour above, `to` the colour below. */
export default function Divider({ from = "transparent", to = "#FFFFFF", flip = false }) {
  return (
    <div className="divider" style={{ background: from }} aria-hidden="true">
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="divider__svg"
           style={flip ? { transform: "scaleX(-1)" } : undefined}>
        <path d="M0 70V26c150-30 330 22 560 22S1010-6 1200 6c90 6 170 14 240 20v44z" fill={to} />
      </svg>
    </div>
  );
}
