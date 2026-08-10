"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure page starts at top on load
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Set initial hidden state via GSAP (not inline styles)
      gsap.set(".hero-line", { opacity: 0, y: 60, skewY: 2 });

      // ── Intro animation ──
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(
        ".hero-line",
        { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power4.out", stagger: 0.14 }
      )
      // one-time 3D flip on Build after lines appear
      .to(".hero-build-word", {
        rotationY: 360,
        duration: 1.2,
        ease: "power2.inOut",
      }, "-=0.3");

      // ── Scroll: pin hero, zoom "Build" to center then blast off ──
      const buildEl = containerRef.current?.querySelector(".hero-build-word") as HTMLElement | null;
      const buildRect = buildEl?.getBoundingClientRect();
      const vCX = window.innerWidth / 2;
      const vCY = window.innerHeight / 2;
      const elCX = buildRect ? buildRect.left + buildRect.width / 2 : vCX;
      const elCY = buildRect ? buildRect.top + buildRect.height / 2 : vCY;
      const deltaX = vCX - elCX;
      const deltaY = vCY - elCY;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=160%",
        pin: true,
        anticipatePin: 1,
        scrub: 1.2,
        animation: gsap.timeline()
          // fade everything except Build word
          .fromTo(".hero-fade", { opacity: 1, y: 0 }, { opacity: 0, y: -40, duration: 0.4, ease: "power2.in" }, 0)
          // move Build to viewport center + scale up
          .to(".hero-build-word", {
            x: deltaX,
            y: deltaY,
            scale: 2.5,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "power2.inOut",
          }, 0.15)
          // 3D spin + blast off
          .to(".hero-build-word", {
            rotationY: 720,
            scale: 18,
            opacity: 0,
            transformOrigin: "center center",
            duration: 0.55,
            ease: "power3.in",
          }, 0.5),
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        perspective: "1200px",
      }}
    >
      <div style={{ position: "relative", zIndex: 10, padding: "7rem clamp(20px,5vw,80px) 5rem", maxWidth: "1400px", margin: "0 auto", width: "100%" }}>

        {/* Headline */}
        <div style={{ marginBottom: "3rem" }}>

          {/* Line 1: We Build */}
          <div className="hero-line" style={{ lineHeight: 1, marginBottom: "0.05em", textAlign: "center" }}>
            <span className="hero-fade" style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "clamp(64px,10vw,148px)", color: "#ffffff", letterSpacing: "-0.04em" }}>
              We{" "}
            </span>
            <span className="hero-build-word" style={{
              display: "inline-block",
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(64px,10vw,148px)",
              letterSpacing: "-0.04em",
              background: "linear-gradient(135deg,#1D6FF2 0%,#06B6D4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transformStyle: "preserve-3d",
            }}>
              Build
            </span>
          </div>

          {/* Line 2: Brands */}
          <div className="hero-line hero-fade" style={{ lineHeight: 1, marginBottom: "0.05em", textAlign: "center" }}>
            <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "clamp(64px,10vw,148px)", color: "#ffffff", letterSpacing: "-0.04em" }}>
              Brands
            </span>
          </div>

          {/* Line 3: That Grow */}
          <div className="hero-line hero-fade" style={{ lineHeight: 1, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5em", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "clamp(64px,10vw,148px)", color: "rgba(255,255,255,0.18)", letterSpacing: "-0.04em" }}>
              That
            </span>
            <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "clamp(64px,10vw,148px)", color: "#ffffff", letterSpacing: "-0.04em" }}>
              Grow.
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
