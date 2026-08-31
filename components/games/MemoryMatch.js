"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GameDone from "./GameDone";
import { MEMORY_SYMBOLS, Star } from "./GameIcons";

const PAIRS = MEMORY_SYMBOLS.length; // 8 pairs -> 16 cards

function buildDeck() {
  const deck = MEMORY_SYMBOLS.flatMap((s, i) => [
    { id: `${s.key}-a`, key: s.key, label: s.label, Icon: s.Icon, pair: i },
    { id: `${s.key}-b`, key: s.key, label: s.label, Icon: s.Icon, pair: i },
  ]);
  for (let i = deck.length - 1; i > 0; i--) {          // Fisher-Yates
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export default function MemoryMatch() {
  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]);   // indices currently face up
  const [matched, setMatched] = useState([]);   // pair ids already solved
  const [moves, setMoves] = useState(0);
  const [busy, setBusy] = useState(false);
  const timer = useRef(null);

  const reset = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setDeck(buildDeck());
    setFlipped([]); setMatched([]); setMoves(0); setBusy(false);
  }, []);

  useEffect(() => { reset(); return () => { if (timer.current) clearTimeout(timer.current); }; }, [reset]);

  const flip = (i) => {
    if (busy) return;
    if (flipped.includes(i)) return;
    if (matched.includes(deck[i].pair)) return;

    const next = [...flipped, i];
    setFlipped(next);
    if (next.length < 2) return;

    setMoves((m) => m + 1);
    const [a, b] = next;
    if (deck[a].pair === deck[b].pair) {
      setMatched((m) => [...m, deck[a].pair]);
      setFlipped([]);
    } else {
      setBusy(true);
      timer.current = setTimeout(() => { setFlipped([]); setBusy(false); }, 850);
    }
  };

  if (deck.length && matched.length === PAIRS) {
    return (
      <GameDone
        art={<Star />}
        heading="Great job! You stayed focused and present."
        message={`You found all ${PAIRS} pairs in ${moves} moves.`}
        onReplay={reset}
      />
    );
  }

  return (
    <div>
      <div className="ghud">
        <span>Moves <b>{moves}</b></span>
        <span>Pairs found <b>{matched.length}/{PAIRS}</b></span>
      </div>

      <div className="mgrid">
        {deck.map((card, i) => {
          const isMatched = matched.includes(card.pair);
          const isUp = flipped.includes(i) || isMatched;
          const { Icon } = card;
          return (
            <button
              key={card.id}
              type="button"
              className={`mcard ${isUp ? "is-up" : ""} ${isMatched ? "is-done" : ""}`}
              onClick={() => flip(i)}
              disabled={isMatched || busy}
              aria-label={isUp ? `${card.label}${isMatched ? ", matched" : ""}` : "Face down card"}
            >
              <span className="mcard__inner">
                <span className="mcard__face mcard__back" />
                <span className="mcard__face mcard__front">
                  <Icon />
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {matched.length} of {PAIRS} pairs found in {moves} moves.
      </p>

      <div className="gactions">
        <button className="btn btn-secondary" type="button" onClick={reset}>Restart</button>
      </div>
    </div>
  );
}
