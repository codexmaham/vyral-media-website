"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { BackgroundPixelStars } from "@/components/ui/background-pixel-stars";
import { scrollToSection } from "@/lib/scroll-to";

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
  fontSize: "clamp(36px, 5.5vw, 72px)",
  letterSpacing: "-0.045em",
  lineHeight: 0.95,
};

export default function Hero({ ready }: { ready: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
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
        anticipatePin: 1,
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
      className={`hero-pixel-bg${ready && introReady ? "" : " hero-awaiting"}`}
      style={{
        backgroundColor: "#08080B",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        perspective: "1200px",
      }}
    >
      <BackgroundPixelStars containerRef={containerRef} />
      <style>{`
        .hero-pixel-bg {
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAIElEQVR42mIUEhJiwAbevXuHVZyJgUQwqmEUDB0AEGAADd8DEPTX6ksAAAAASUVORK5CYII=");
          background-size: 10px 10px;
        }
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
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent !important;
          -webkit-text-fill-color: transparent;
        }
        .hero-that-word .hero-char {
          color: rgba(255, 255, 255, 0.38) !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.38);
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
        .hero-layout {
          max-width: 52rem;
          margin: 0 auto;
          text-align: center;
        }
        .hero-headline .hero-line {
          text-align: center;
        }
        .hero-ctas-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hero-ctas {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 0.85rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .hero-rainbow-glow {
          position: absolute;
          left: 50%;
          bottom: -1.1rem;
          z-index: 1;
          width: min(440px, 88vw);
          height: 3px;
          transform: translateX(-50%);
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            #ff0080,
            #ff6a00,
            #ffd500,
            #00e676,
            #00b4ff,
            #7c4dff,
            #ff0080
          );
          background-size: 200% 100%;
          filter: blur(6px);
          opacity: 0.9;
          animation: heroRainbowShift 5s linear infinite;
        }
        .hero-rainbow-glow::after {
          content: "";
          position: absolute;
          inset: -10px -28px -18px;
          border-radius: 999px;
          background: inherit;
          background-size: inherit;
          filter: blur(22px);
          opacity: 0.55;
          animation: inherit;
        }
        @keyframes heroRainbowShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-rainbow-glow,
          .hero-rainbow-glow::after {
            animation: none;
          }
        }
      `}</style>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "6rem clamp(20px,5vw,80px) 8rem",
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div className="hero-layout">
          <div>
            <div className="hero-headline" style={{ marginBottom: "2rem" }}>
              <div className="hero-line" style={{ ...headline, marginBottom: "0.04em" }}>
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
                <span className="hero-split hero-that-word">That </span>
                <span className="hero-split" style={{ color: "#ffffff" }}>Grow.</span>
              </div>
            </div>

            {/* Subheadline */}
            <p
              className="hero-fade hero-split-words hero-sub"
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.55)",
                maxWidth: "32rem",
                margin: "0 auto 2.25rem",
                textAlign: "center",
              }}
            >
              Performance marketing, brand identity, video and web, for brands that need to move.
            </p>

            {/* CTAs */}
            <div className="hero-rise hero-fade hero-ctas-wrap">
              <div className="hero-ctas">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#contact");
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
              borderRadius: 10,
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
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.24)",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(8px)",
            }}
          >
            View Work
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
              </div>
              <div className="hero-rainbow-glow" aria-hidden="true" />
            </div>
          </div>
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
