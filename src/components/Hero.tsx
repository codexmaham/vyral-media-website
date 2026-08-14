"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const proof = [
  { v: "50+", l: "Brands Built" },
  { v: "13", l: "Specialists" },
  { v: "$145K+", l: "Ad Spend Managed" },
  { v: "4 Yrs", l: "In Business" },
];

const headline: React.CSSProperties = {
  fontFamily: "'Satoshi', sans-serif",
  fontWeight: 900,
  fontSize: "clamp(52px, 9vw, 132px)",
  letterSpacing: "-0.045em",
  lineHeight: 0.95,
};

export default function Hero({ ready }: { ready: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!ready) return;

    let ctx: gsap.Context;
    const splits: SplitText[] = [];

    const init = () => {
      const root = containerRef.current;
      if (!root) return;

      ctx = gsap.context(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        root.querySelectorAll<HTMLElement>(".hero-split").forEach((el) => {
          splits.push(new SplitText(el, { type: "chars", charsClass: "hero-char" }));
        });

        const subEl = root.querySelector<HTMLElement>(".hero-split-words");
        let subWords: Element[] = [];
        if (subEl) {
          const subSplit = new SplitText(subEl, { type: "words", wordsClass: "hero-word" });
          splits.push(subSplit);
          subWords = subSplit.words;
        }

        const chars = splits.flatMap((s) => s.chars).filter(Boolean);

        if (reducedMotion) {
          gsap.set([...chars, ...subWords, ".hero-rise"], { opacity: 1, y: 0, rotateX: 0, clearProps: "transform" });
        } else {
          gsap.set(".hero-rise", { opacity: 0, y: 24 });
          gsap.set(chars, {
            opacity: 0,
            y: 90,
            rotateX: -80,
            transformOrigin: "50% 50% -40px",
          });
          if (subWords.length) gsap.set(subWords, { opacity: 0, y: 16 });
        }

        setIntroReady(true);

        if (!reducedMotion) {
          gsap
            .timeline({ delay: 0.15 })
            .to(chars, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1,
              ease: "power4.out",
              stagger: 0.025,
            })
            .to(".hero-build-word", { rotationY: 360, duration: 1.2, ease: "power2.inOut" }, "-=0.45")
            .to(subWords, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.04 }, "-=0.65")
            .to(".hero-rise", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=0.55");
        }

      /* ── Ambient background drift ──────────────────────────────────── */
      gsap.utils.toArray<HTMLElement>(".hero-blob").forEach((blob, i) => {
        gsap.to(blob, {
          x: `random(-140, 140)`,
          y: `random(-90, 90)`,
          scale: `random(0.9, 1.25)`,
          duration: 14 + i * 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 1.5,
        });
      });

      /* ── Cursor spotlight (fine pointers only) ─────────────────────── */
      const spot = spotRef.current;
      if (spot && !window.matchMedia("(pointer: coarse)").matches) {
        const xTo = gsap.quickTo(spot, "x", { duration: 0.9, ease: "power3.out" });
        const yTo = gsap.quickTo(spot, "y", { duration: 0.9, ease: "power3.out" });
        const onMove = (e: MouseEvent) => {
          const r = containerRef.current?.getBoundingClientRect();
          if (!r) return;
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
        };
        containerRef.current?.addEventListener("mousemove", onMove);
        gsap.to(spot, { opacity: 1, duration: 1.2, delay: 0.6 });
      }

      /* ── Scroll: pin, zoom "Build" to centre, blast off ────────────── */
      const buildEl = containerRef.current?.querySelector(".hero-build-word") as HTMLElement | null;
      const buildRect = buildEl?.getBoundingClientRect();
      const vCX = window.innerWidth / 2;
      const vCY = window.innerHeight / 2;
      const elCX = buildRect ? buildRect.left + buildRect.width / 2 : vCX;
      const elCY = buildRect ? buildRect.top + buildRect.height / 2 : vCY;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=160%",
        pin: true,
        pinType: "transform",
        anticipatePin: 0,
        scrub: 1.2,
        animation: gsap
          .timeline()
          .fromTo(".hero-fade", { opacity: 1, y: 0 }, { opacity: 0, y: -40, duration: 0.4, ease: "power2.in" }, 0)
          .to(".hero-build-word", {
            x: vCX - elCX,
            y: vCY - elCY,
            scale: 2.5,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "power2.inOut",
          }, 0.15)
          .to(".hero-build-word", {
            rotationY: 720,
            scale: 18,
            opacity: 0,
            transformOrigin: "center center",
            duration: 0.55,
            ease: "power3.in",
          }, 0.5),
      });

      ScrollTrigger.refresh();
    }, root);
    };

    const fontsReady = "fonts" in document ? document.fonts.ready : Promise.resolve();
    fontsReady.then(init);

    return () => {
      setIntroReady(false);
      splits.forEach((s) => {
        try { s.revert(); } catch { /* noop */ }
      });
      ctx?.revert();
    };
  }, [ready]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className={ready && introReady ? undefined : "hero-awaiting"}
      style={{
        backgroundImage: "url('/Background.png')",
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
      <style>{`
        #hero.hero-awaiting .hero-headline,
        #hero.hero-awaiting .hero-sub,
        #hero.hero-awaiting .hero-ctas,
        #hero.hero-awaiting .hero-proof-rail {
          opacity: 0;
        }
        .hero-char,
        .hero-word {
          display: inline-block;
          will-change: transform, opacity;
        }
        .hero-build-word .hero-char {
          background: linear-gradient(135deg, #1D6FF2 0%, #06B6D4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes heroProofScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-proof-desktop {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(1rem, 3.5vw, 2.75rem);
          flex-wrap: wrap;
          width: 100%;
        }
        .hero-proof-marquee {
          display: none;
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
        }
        .hero-proof-track {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          width: max-content;
          animation: heroProofScroll 22s linear infinite;
        }
        @media (max-width: 768px) {
          .hero-proof-desktop { display: none; }
          .hero-proof-marquee { display: block; }
        }
      `}</style>

      {/* ── Ambient depth ─────────────────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
        {[
          { c: "rgba(29,111,242,0.30)", s: "46vw", t: "6%", l: "-6%" },
          { c: "rgba(6,182,212,0.22)", s: "38vw", t: "48%", l: "62%" },
          { c: "rgba(124,58,237,0.20)", s: "34vw", t: "62%", l: "12%" },
        ].map((b, i) => (
          <div
            key={i}
            className="hero-blob"
            style={{
              position: "absolute",
              top: b.t,
              left: b.l,
              width: b.s,
              height: b.s,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${b.c} 0%, transparent 70%)`,
              filter: "blur(60px)",
              willChange: "transform",
            }}
          />
        ))}

        {/* Cursor spotlight */}
        <div
          ref={spotRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "40vw",
            height: "40vw",
            marginLeft: "-20vw",
            marginTop: "-20vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(29,111,242,0.16) 0%, transparent 65%)",
            opacity: 0,
            willChange: "transform",
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "6rem clamp(20px,5vw,80px) 8rem",
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Headline */}
        <div className="hero-headline" style={{ marginBottom: "2rem" }}>
          <div className="hero-line" style={{ ...headline, marginBottom: "0.04em", whiteSpace: "nowrap" }}>
            <span className="hero-split hero-fade" style={{ color: "#ffffff" }}>We </span>
            <span
              className="hero-split hero-build-word"
              style={{
                display: "inline-block",
                transformStyle: "preserve-3d",
                ...headline,
              }}
            >
              Build
            </span>
          </div>

          <div className="hero-line hero-fade" style={{ ...headline, marginBottom: "0.04em", color: "#ffffff" }}>
            <span className="hero-split">Brands</span>
          </div>

          <div className="hero-line hero-fade" style={{ ...headline }}>
            <span className="hero-split" style={{ color: "rgba(255,255,255,0.18)" }}>That </span>
            <span className="hero-split" style={{ color: "#ffffff" }}>Grow.</span>
          </div>
        </div>

        {/* Subheadline */}
        <p
          className="hero-fade hero-split-words hero-sub"
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.55)",
            maxWidth: "38rem",
            margin: "0 auto 2.25rem",
          }}
        >
          Performance marketing, brand identity, video and web, for brands that need to move.
        </p>

        {/* CTAs */}
        <div
          className="hero-rise hero-fade hero-ctas"
          style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "'Satoshi',sans-serif",
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "#fff",
              textDecoration: "none",
              padding: "0.95rem 2rem",
              borderRadius: 999,
              background: "linear-gradient(135deg,#1D6FF2,#06B6D4)",
              boxShadow: "0 8px 30px rgba(29,111,242,0.35)",
            }}
          >
            Book a Call
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>

          <Link
            href="/portfolio"
            className="group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "'Satoshi',sans-serif",
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "#fff",
              textDecoration: "none",
              padding: "0.95rem 2rem",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.24)",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(8px)",
            }}
          >
            View Work
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* ── Bottom rail: proof ────────────────────────────────────────── */}
      <div
        className="hero-rise hero-fade hero-proof-rail"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          padding: "1.1rem clamp(20px,5vw,80px)",
          borderTop: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(6px)",
        }}
      >
        {/* Desktop */}
        <div className="hero-proof-desktop">
          {proof.map((p) => (
            <div key={p.l} style={{ display: "flex", alignItems: "baseline", gap: "0.45rem" }}>
              <span
                style={{
                  fontFamily: "'Satoshi',sans-serif",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  letterSpacing: "-0.02em",
                  color: "#fff",
                }}
              >
                {p.v}
              </span>
              <span
                style={{
                  fontFamily: "'Satoshi',sans-serif",
                  fontWeight: 500,
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  whiteSpace: "nowrap",
                }}
              >
                {p.l}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile: looping scroll */}
        <div className="hero-proof-marquee" aria-hidden="true">
          <div className="hero-proof-track">
            {[...proof, ...proof].map((p, i) => (
              <div key={`${p.l}-${i}`} style={{ display: "flex", alignItems: "baseline", gap: "0.45rem", flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: "'Satoshi',sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    letterSpacing: "-0.02em",
                    color: "#fff",
                  }}
                >
                  {p.v}
                </span>
                <span
                  style={{
                    fontFamily: "'Satoshi',sans-serif",
                    fontWeight: 500,
                    fontSize: "0.62rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
