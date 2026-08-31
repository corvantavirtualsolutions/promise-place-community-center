"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GameDone from "./GameDone";
import { Heart, Star, Flower, Sun, Leaf, Bolt, RainCloud } from "./GameIcons";

const DURATION = 60;          // seconds
const FALL_MIN = 34;          // px per second — deliberately slow
const FALL_MAX = 56;
const SPAWN_MS = 1150;
const BASKET_W = 84;
const ITEM = 44;

const GOOD = [
  { key: "kindness", label: "Kindness", Icon: Heart,  tint: "#FFE3E0" },
  { key: "hope",     label: "Hope",     Icon: Star,   tint: "#FDF0CC" },
  { key: "peace",    label: "Peace",    Icon: Flower, tint: "#EAE5FD" },
  { key: "joy",      label: "Joy",      Icon: Sun,    tint: "#FDF0CC" },
  { key: "strength", label: "Strength", Icon: Leaf,   tint: "#D5F3EC" },
];
const SOFT = [
  { key: "stress", label: "Stress", Icon: Bolt,      tint: "#E7EEF1" },
  { key: "worry",  label: "Worry",  Icon: RainCloud, tint: "#E7EEF1" },
];

export default function CalmCatch() {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(DURATION);
  const [items, setItems] = useState([]);
  const [toast, setToast] = useState("");
  const [basket, setBasket] = useState(0.5);   // 0..1 across the stage

  const stage = useRef(null);
  const raf = useRef(0);
  const last = useRef(0);
  const spawnAcc = useRef(0);
  const keys = useRef({ left: false, right: false });
  const basketRef = useRef(0.5);
  const idRef = useRef(0);
  const toastTimer = useRef(null);

  const setBasketClamped = (v) => {
    const c = Math.min(1, Math.max(0, v));
    basketRef.current = c;
    setBasket(c);
  };

  const start = useCallback(() => {
    setScore(0); setLeft(DURATION); setItems([]); setToast("");
    setBasketClamped(0.5);
    idRef.current = 0; spawnAcc.current = 0; last.current = 0;
    setDone(false); setRunning(true);
  }, []);

  const stop = useCallback(() => { setRunning(false); setDone(true); setItems([]); }, []);

  // countdown
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) { clearInterval(t); stop(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, stop]);

  // keyboard
  useEffect(() => {
    const down = (e) => {
      if (e.key === "ArrowLeft")  { keys.current.left = true;  e.preventDefault(); }
      if (e.key === "ArrowRight") { keys.current.right = true; e.preventDefault(); }
    };
    const up = (e) => {
      if (e.key === "ArrowLeft")  keys.current.left = false;
      if (e.key === "ArrowRight") keys.current.right = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 1400);
  };

  // main loop
  useEffect(() => {
    if (!running) return;
    const step = (t) => {
      if (!last.current) last.current = t;
      const dt = Math.min((t - last.current) / 1000, 0.05);
      last.current = t;

      const box = stage.current?.getBoundingClientRect();
      const h = box?.height || 380;
      const w = box?.width || 600;

      // basket via keyboard
      if (keys.current.left)  setBasketClamped(basketRef.current - dt * 0.85);
      if (keys.current.right) setBasketClamped(basketRef.current + dt * 0.85);

      // spawn
      spawnAcc.current += dt * 1000;
      if (spawnAcc.current > SPAWN_MS) {
        spawnAcc.current = 0;
        const good = Math.random() > 0.28;
        const pool = good ? GOOD : SOFT;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        setItems((prev) => prev.concat({
          id: ++idRef.current,
          x: 0.06 + Math.random() * 0.88,
          y: -ITEM,
          speed: FALL_MIN + Math.random() * (FALL_MAX - FALL_MIN),
          good, ...pick,
        }));
      }

      // move + collide
      setItems((prev) => {
        const bx = basketRef.current * (w - BASKET_W);
        const out = [];
        for (const it of prev) {
          const y = it.y + it.speed * dt;
          const ix = it.x * (w - ITEM);
          const caught = y + ITEM >= h - 54 && y + ITEM <= h - 4 &&
                         ix + ITEM > bx && ix < bx + BASKET_W;
          if (caught) {
            if (it.good) setScore((s) => s + 1);
            else showToast("Take a breath.");
            continue;
          }
          if (y > h) continue;
          out.push({ ...it, y });
        }
        return out;
      });

      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf.current); last.current = 0; };
  }, [running]);

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  // pointer drag
  const onPointer = (e) => {
    if (!running) return;
    const box = stage.current.getBoundingClientRect();
    setBasketClamped((e.clientX - box.left - BASKET_W / 2) / (box.width - BASKET_W));
  };

  if (done) {
    return (
      <GameDone
        art={<Heart />}
        heading="You made space for positive moments."
        message={`You gathered ${score} ${score === 1 ? "moment" : "moments"}. There's no score to beat — just a minute you gave yourself.`}
        onReplay={start}
      />
    );
  }

  return (
    <div>
      <div className="ghud">
        <span>Score <b>{score}</b></span>
        <span>Time left <b>{left}s</b></span>
      </div>

      <div
        className="catch"
        ref={stage}
        onPointerDown={onPointer}
        onPointerMove={(e) => e.buttons && onPointer(e)}
        role="application"
        aria-label="Calm Catch game area. Use the left and right arrow keys to move the basket."
      >
        {toast && <div className="catch__toast">{toast}</div>}

        {items.map((it) => {
          const { Icon } = it;
          const box = stage.current?.getBoundingClientRect();
          const w = box?.width || 600;
          return (
            <div
              key={it.id}
              className="catch__item"
              style={{
                background: it.tint,
                transform: `translate(${it.x * (w - ITEM)}px, ${it.y}px)`,
              }}
              aria-hidden="true"
            >
              <Icon />
            </div>
          );
        })}

        {/* basket */}
        <div
          className="catch__basket"
          style={{
            transform: `translateX(${basket * ((stage.current?.getBoundingClientRect().width || 600) - BASKET_W)}px)`,
          }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 84 46">
            <path d="M4 12h76l-8 30a6 6 0 0 1-6 4H18a6 6 0 0 1-6-4L4 12Z" fill="#0C7267" />
            <rect x="0" y="4" width="84" height="12" rx="6" fill="#14A894" />
          </svg>
        </div>

        {!running && (
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <button className="btn btn-primary" type="button" onClick={start}>Start Game</button>
          </div>
        )}
      </div>

      <div className="catch__pad">
        <button type="button" aria-label="Move basket left"
                onPointerDown={() => (keys.current.left = true)}
                onPointerUp={() => (keys.current.left = false)}
                onPointerLeave={() => (keys.current.left = false)}>←</button>
        <button type="button" aria-label="Move basket right"
                onPointerDown={() => (keys.current.right = true)}
                onPointerUp={() => (keys.current.right = false)}
                onPointerLeave={() => (keys.current.right = false)}>→</button>
      </div>

      <p className="sr-only" role="status" aria-live="polite">Score {score}. {left} seconds left.</p>

      {running && (
        <div className="gactions">
          <button className="btn btn-secondary" type="button" onClick={start}>Restart</button>
        </div>
      )}
    </div>
  );
}
