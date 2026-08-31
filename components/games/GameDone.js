"use client";

import Link from "next/link";

/* Completion screen shared by every game. */
export default function GameDone({ art, heading, message, onReplay, replayLabel = "Play Again" }) {
  return (
    <div className="gdone" role="status">
      {art && <div className="gdone__art">{art}</div>}
      <h3>{heading}</h3>
      <p>{message}</p>
      <div className="gactions">
        <button className="btn btn-primary" type="button" onClick={onReplay}>
          {replayLabel}
        </button>
        <Link className="btn btn-secondary" href="/mini-games">
          Back to Mini Games
        </Link>
      </div>
    </div>
  );
}
