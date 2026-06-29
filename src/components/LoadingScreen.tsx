"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setTimeout(onComplete, 600); return; }

    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const glow = glowRef.current;
    const ring = ringRef.current;
    if (!overlay || !logo || !glow || !ring) return;

    // Initial states
    gsap.set(logo, { scale: 5, opacity: 0, filter: "blur(32px) brightness(2)" });
    gsap.set(glow, { opacity: 0, scale: 0.4 });
    gsap.set(ring, { opacity: 0, scale: 0.3 });

    const tl = gsap.timeline();

    // Phase 1: shape "forms" — zooms in from huge to normal, blur dissolves
    tl.to(logo, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px) brightness(1)",
      duration: 1.4,
      ease: "expo.out",
      delay: 0.15,
    });

    // Glow blooms as logo forms
    tl.to(glow, {
      opacity: 1,
      scale: 1,
      duration: 1.1,
      ease: "power2.out",
    }, "-=1.0");

    // Subtle ring pulse
    tl.to(ring, {
      opacity: 0.5,
      scale: 1,
      duration: 0.7,
      ease: "power2.out",
    }, "-=0.6");

    tl.to(ring, {
      opacity: 0,
      scale: 1.6,
      duration: 0.9,
      ease: "power2.out",
    }, "-=0.1");

    // Phase 2: gentle float loop
    tl.call(() => {
      gsap.to(logo, {
        y: -12,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(glow, {
        scale: 1.1,
        opacity: 0.8,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    // Hold 1.6s then exit
    tl.to({}, { duration: 1.6 });

    tl.call(() => {
      gsap.killTweensOf([logo, glow]);

      // Exit: logo zooms close (into screen) + fades
      gsap.to(logo, {
        scale: 4,
        opacity: 0,
        filter: "blur(20px) brightness(2)",
        duration: 0.7,
        ease: "power3.in",
      });
      gsap.to(glow, { opacity: 0, scale: 2, duration: 0.6, ease: "power3.in" });

      // Overlay wipes up — cinematic curtain
      gsap.to(overlay, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.75,
        delay: 0.35,
        ease: "power4.inOut",
        onComplete,
      });
    });

    return () => {
      tl.kill();
      gsap.killTweensOf([logo, glow, ring, overlay]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#07070f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        clipPath: "inset(0 0 0% 0)",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          width: "clamp(400px, 60vw, 800px)",
          height: "clamp(400px, 60vw, 800px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,111,242,0.22) 0%, rgba(124,58,237,0.14) 40%, rgba(6,182,212,0.05) 70%, transparent 100%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Pulse ring */}
      <div
        ref={ringRef}
        style={{
          position: "absolute",
          width: "clamp(260px, 36vw, 460px)",
          height: "clamp(260px, 36vw, 460px)",
          borderRadius: "50%",
          border: "1px solid rgba(29,111,242,0.4)",
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <img
        ref={logoRef}
        src="/vyral-3d-logo.png"
        alt="Vyral Media"
        style={{
          width: "clamp(320px, 50vw, 650px)",
          height: "auto",
          display: "block",
          willChange: "transform, opacity, filter",
          mixBlendMode: "screen",
          position: "relative",
          zIndex: 2,
        }}
      />
    </div>
  );
}
