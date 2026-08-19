"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/** Never flash by for less than this — a 200 ms preloader reads as a glitch. */
const MIN_MS = 1200;
/** Never hold the site hostage longer than this, however slow the network is. */
const MAX_MS = 3500;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLImageElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const overlay = overlayRef.current;
    const brand = brandRef.current;
    const bar = barRef.current;
    if (!overlay || !brand || !bar) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();
    let done = false;

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
          .to(brand, { opacity: 0, y: -14, duration: 0.34, ease: "power2.in" }, "+=0.06")
          .to(overlay, { opacity: 0, duration: 0.42, ease: "power2.inOut" }, "-=0.12");
      });
    };

    const hero = new window.Image();
    const logo = new window.Image();
    const signals: Promise<unknown>[] = [
      document.fonts?.ready ?? Promise.resolve(),
      new Promise<void>((res) => {
        hero.onload = () => res();
        hero.onerror = () => res();
        hero.src = "/Background.png";
      }),
      new Promise<void>((res) => {
        logo.onload = () => res();
        logo.onerror = () => res();
        logo.src = "/vyral-logo-nav.png";
      }),
    ];

    let settled = 0;
    signals.forEach((p) =>
      Promise.resolve(p).then(() => {
        settled += 1;
        setPct(Math.round((settled / signals.length) * 92));
      }),
    );

    Promise.all(signals).then(finish);
    const cap = window.setTimeout(finish, MAX_MS);

    if (reduced) {
      gsap.set(brand, { opacity: 1 });
    } else {
      gsap.set(brand, { opacity: 0, scale: 0.88, y: 16 });
      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

      gsap
        .timeline()
        .to(brand, { opacity: 1, scale: 1, y: 0, duration: 1.05, ease: "expo.out" });
    }

    return () => {
      window.clearTimeout(cap);
      gsap.killTweensOf([overlay, brand, bar]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={brandRef}
        src="/vyral-logo-nav.png"
        alt="Vyral Media"
        className="vyral-preloader-logo"
      />

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
