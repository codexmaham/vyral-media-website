"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // Intro animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        ".hero-line",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power4.out", stagger: 0.12 }
      );
      tl.fromTo(
        ".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.6
      );
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 },
        0.75
      );
      tl.fromTo(
        ".hero-deco",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out", stagger: 0.08 },
        0.3
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{ background: "#ffffff", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}
    >
      {/* ── Decorative SVG elements ── */}

      {/* Squiggly line — left */}
      <svg className="hero-deco" style={{ position: "absolute", left: "3%", top: "25%", opacity: 0 }} width="60" height="140" viewBox="0 0 60 140" fill="none">
        <path d="M30 5 C50 25, 10 45, 30 65 C50 85, 10 105, 30 135" stroke="rgba(29,111,242,0.2)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </svg>

      {/* Dotted arc — right */}
      <svg className="hero-deco" style={{ position: "absolute", right: "4%", top: "18%", opacity: 0 }} width="110" height="90" viewBox="0 0 110 90" fill="none">
        {Array.from({ length: 24 }).map((_, i) => {
          const row = Math.floor(i / 6);
          const col = i % 6;
          const cx = 10 + col * 18;
          const cy = 10 + row * 24;
          const r = Math.sqrt((cx - 55) ** 2 + (cy - 90) ** 2);
          return r < 100 ? <circle key={i} cx={cx} cy={cy} r="2.5" fill="#0B0B0B" opacity="0.18" /> : null;
        })}
      </svg>

      {/* Small dot — top right */}
      <div className="hero-deco" style={{ position: "absolute", top: "14%", right: "20%", width: 12, height: 12, borderRadius: "50%", background: "#1D6FF2", opacity: 0 }} />

      {/* Small dot — bottom left */}
      <div className="hero-deco" style={{ position: "absolute", bottom: "22%", left: "18%", width: 8, height: 8, borderRadius: "50%", background: "#06B6D4", opacity: 0 }} />

      {/* Diagonal stripes — bottom left */}
      <svg className="hero-deco" style={{ position: "absolute", bottom: "8%", left: "2%", opacity: 0 }} width="72" height="56" viewBox="0 0 72 56" fill="none">
        {[0,1,2,3,4].map((i) => (
          <line key={i} x1={i*14} y1="0" x2={i*14+28} y2="56" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
        ))}
      </svg>

      {/* Circle outline — right center */}
      <div className="hero-deco" style={{ position: "absolute", right: "-40px", top: "38%", width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(29,111,242,0.15)", opacity: 0 }} />

      {/* ── Content ── */}
      <div ref={headingRef} style={{ position: "relative", zIndex: 10, padding: "7rem clamp(20px,5vw,80px) 5rem", maxWidth: "1400px", margin: "0 auto", width: "100%" }}>


        {/* Headline */}
        <div style={{ marginBottom: "3rem" }}>
          {/* Line 1 */}
          <div className="hero-line" style={{ opacity: 0, display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "0.3em", lineHeight: 1.05, marginBottom: "0.1em" }}>
            <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "clamp(52px,8vw,120px)", color: "#0B0B0B", letterSpacing: "-0.03em" }}>
              We
            </span>
            {/* Highlighted word */}
            <span style={{
              position: "relative",
              display: "inline-block",
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(52px,8vw,120px)",
              color: "#1D6FF2",
              letterSpacing: "-0.03em",
              padding: "0 0.2em",
              borderRadius: "0.25em",
              background: "rgba(29,111,242,0.08)",
            }}>
              Build
            </span>
          </div>

          {/* Line 2 */}
          <div className="hero-line" style={{ opacity: 0, display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "0.3em", lineHeight: 1.05, marginBottom: "0.1em" }}>
            {/* Arrow icon */}
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "clamp(47px,6.3vw,90px)", height: "clamp(47px,6.3vw,90px)", borderRadius: "50%", border: "3px solid #0B0B0B", flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" fill="none" style={{ width: "40%", height: "40%" }}>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#0B0B0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "clamp(52px,8vw,120px)", color: "#0B0B0B", letterSpacing: "-0.03em" }}>
              Brands
            </span>
          </div>

          {/* Line 3 */}
          <div className="hero-line" style={{ opacity: 0, display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "0.3em", lineHeight: 1.05 }}>
            <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "clamp(52px,8vw,120px)", color: "#0B0B0B", letterSpacing: "-0.03em" }}>
              That
            </span>
            <span style={{
              position: "relative",
              display: "inline-block",
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(52px,8vw,120px)",
              color: "#06B6D4",
              letterSpacing: "-0.03em",
              padding: "0 0.2em",
              borderRadius: "0.25em",
              background: "rgba(6,182,212,0.08)",
            }}>
              Grow.
            </span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center" }} className="hero-bottom">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="hero-cta"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", background: "#1D6FF2", color: "#ffffff", fontFamily: "'Satoshi', sans-serif", fontWeight: 600, padding: "1rem 1.75rem", borderRadius: "9999px", transition: "background 0.3s", fontSize: "0.95rem" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#0B0B0B"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#1D6FF2"; }}
            >
              Start Your Project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a
              href="#work"
              onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }}
              className="hero-cta"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", border: "1px solid rgba(11,11,11,0.2)", color: "#0B0B0B", fontFamily: "'Satoshi', sans-serif", fontWeight: 600, padding: "1rem 1.75rem", borderRadius: "9999px", transition: "all 0.3s", fontSize: "0.95rem" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#0B0B0B"; el.style.color = "#ffffff"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = "#0B0B0B"; }}
            >
              View Our Work
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(217,217,217,0.6)", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2rem" }} className="hero-stats">
          {[
            { num: "120+", label: "Projects Delivered" },
            { num: "15+", label: "Industries Served" },
            { num: "98%", label: "Client Satisfaction" },
            { num: "4×", label: "Average ROI" },
          ].map((stat) => (
            <div key={stat.label} className="hero-cta" style={{ opacity: 0, textAlign: "center" }}>
              <div style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "1.875rem", color: "#0B0B0B", letterSpacing: "-0.03em" }}>{stat.num}</div>
              <div className="label" style={{ color: "rgba(11,11,11,0.4)", marginTop: "0.25rem" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, rgba(11,11,11,0.2))" }} />
        <span className="label" style={{ color: "rgba(11,11,11,0.3)" }}>Scroll</span>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hero-stats { grid-template-columns: repeat(4,1fr) !important; }
          .hero-bottom { flex-direction: column !important; align-items: center !important; }
        }
      `}</style>
    </section>
  );
}
