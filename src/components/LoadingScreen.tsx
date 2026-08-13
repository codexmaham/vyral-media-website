"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/** Never flash by for less than this — a 200 ms preloader reads as a glitch. */
const MIN_MS = 1200;
/** Never hold the site hostage longer than this, however slow the network is. */
const MAX_MS = 3500;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLImageElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const overlay = overlayRef.current;
    const mark = markRef.current;
    const word = wordRef.current;
    const bar = barRef.current;
    if (!overlay || !mark || !word || !bar) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();
    let done = false;

    /* ── Exit ─────────────────────────────────────────────────────────── */
    const finish = () => {
      if (done) return;
      done = true;

      const elapsed = performance.now() - started;
      const wait = Math.max(0, MIN_MS - elapsed);

      gsap.delayedCall(wait / 1000, () => {
        setPct(100);
        gsap
          .timeline({ onComplete })
          .to(bar, { scaleX: 1, duration: 0.28, ease: "power2.out" })
          .to([mark, word], { opacity: 0, y: -14, duration: 0.34, ease: "power2.in", stagger: 0.04 }, "+=0.06")
          // Straight opacity fade, like the reference — no curtain wipe.
          .to(overlay, { opacity: 0, duration: 0.42, ease: "power2.inOut" }, "-=0.12");
      });
    };

    /* ── Real progress, not a fake timer ──────────────────────────────── */
    const hero = new window.Image();
    const signals: Promise<unknown>[] = [
      document.fonts?.ready ?? Promise.resolve(),
      new Promise<void>((res) => {
        hero.onload = () => res();
        hero.onerror = () => res();
        hero.src = "/Background.png";
      }),
    ];

    let settled = 0;
    signals.forEach((p) =>
      Promise.resolve(p).then(() => {
        settled += 1;
        setPct(Math.round((settled / signals.length) * 92));
      })
    );

    Promise.all(signals).then(finish);
    const cap = window.setTimeout(finish, MAX_MS);

    /* ── Intro ────────────────────────────────────────────────────────── */
    if (reduced) {
      gsap.set([mark, word], { opacity: 1 });
    } else {
      gsap.set(mark, { opacity: 0, scale: 0.82, rotateY: -55 });
      gsap.set(word, { opacity: 0, clipPath: "inset(0 100% 0 0)" });
      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

      gsap
        .timeline()
        .to(mark, { opacity: 1, scale: 1, rotateY: 0, duration: 1.1, ease: "expo.out" })
        .to(word, { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.out" }, "-=0.55");
    }

    return () => {
      window.clearTimeout(cap);
      gsap.killTweensOf([overlay, mark, word, bar]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Bar tracks the reported percentage.
  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, { scaleX: pct / 100, duration: 0.5, ease: "power2.out" });
    }
  }, [pct]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        perspective: "900px",
      }}
    >
      {/* Mark */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={markRef}
        src="/vyral-icon.png"
        alt=""
        style={{
          width: "clamp(78px, 11vw, 132px)",
          height: "auto",
          display: "block",
          willChange: "transform, opacity",
          transformStyle: "preserve-3d",
        }}
      />

      {/* Wordmark */}
      <div
        ref={wordRef}
        style={{
          marginTop: "1.1rem",
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.5rem, 3.6vw, 2.4rem)",
          letterSpacing: "-0.045em",
          color: "#fff",
          lineHeight: 1,
          willChange: "clip-path, opacity",
        }}
      >
        VYRAL
        <span
          style={{
            background: "linear-gradient(135deg,#1D6FF2,#06B6D4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          .
        </span>
      </div>

      {/* Hairline progress */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(2.5rem, 7vh, 4.5rem)",
          transform: "translateX(-50%)",
          width: "clamp(120px, 18vw, 200px)",
          height: 1,
          background: "rgba(255,255,255,0.14)",
          overflow: "hidden",
        }}
      >
        <div
          ref={barRef}
          style={{
            width: "100%",
            height: "100%",
            background: "#fff",
            transformOrigin: "left center",
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
}
