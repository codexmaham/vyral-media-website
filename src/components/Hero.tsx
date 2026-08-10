"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CharSplit({ text, startDelay, color, gradient, style }: {
  text: string;
  startDelay: number;
  color?: string;
  gradient?: boolean;
  style?: React.CSSProperties;
}) {
  const chars = text.split("");
  const center = (chars.length - 1) / 2;
  return (
    <>
      {chars.map((char, i) => {
        if (char === " ") return <span key={i}>&nbsp;</span>;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              animation: `heroCharIn 0.6s cubic-bezier(0.5,0,0.5,1) ${startDelay + i * 0.048}s both`,
              ["--char-offset" as string]: i - center,
              color: gradient ? undefined : color,
              ...(gradient
                ? {
                    background: "linear-gradient(135deg,#1D6FF2,#06B6D4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
                : {}),
              ...style,
            }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const iRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    let timerId: ReturnType<typeof setTimeout>;

    const ctx = gsap.context(() => {
      const dotEl = dotRef.current;
      if (!dotEl) return;

      // Phase 1: dot bounces at center while text chars animate in
      const startX = window.innerWidth / 2;
      const startY = window.innerHeight * 0.46;

      gsap.set(dotEl, {
        x: startX, y: startY,
        xPercent: -50, yPercent: -50,
        scale: 5, opacity: 0,
      });

      gsap.timeline({ delay: 0.08 })
        .to(dotEl, { opacity: 1, duration: 0.1, ease: "none" })
        .to(dotEl, { scaleX: 1.6, scaleY: 0.4, duration: 0.1, ease: "power2.in" })
        .to(dotEl, { y: startY - 220, scaleX: 1, scaleY: 1, scale: 4, duration: 0.35, ease: "power2.out" })
        .to(dotEl, { y: startY, scaleX: 1.5, scaleY: 0.4, duration: 0.25, ease: "power2.in" })
        .to(dotEl, { y: startY - 100, scaleX: 1, scaleY: 1, scale: 2.5, duration: 0.22, ease: "power2.out" })
        .to(dotEl, { y: startY, scaleX: 1.3, scaleY: 0.6, duration: 0.18, ease: "power2.in" })
        // float gently while text reveals
        .to(dotEl, { y: startY - 40, scale: 1.8, scaleX: 1, scaleY: 1, duration: 0.4, ease: "power1.out" });

      // Phase 2: after text chars are done (~1.1s), fly to "i" position
      timerId = setTimeout(() => {
        const iEl = iRef.current;
        if (!iEl || !dotEl) return;
        const iRect = iEl.getBoundingClientRect();
        // "i" is now at scale(1) — read true position
        const finalX = iRect.left + iRect.width / 2;
        const finalY = iRect.top + iRect.height * 0.12;
        gsap.to(dotEl, {
          x: finalX, y: finalY,
          scale: 1, scaleX: 1, scaleY: 1,
          duration: 0.55, ease: "back.out(2.2)",
        });
      }, 1150);

      // 3D flip on Build after chars animate in
      gsap.to(".hero-build-word", {
        rotationY: 360,
        duration: 1.2,
        delay: 1.5,
        ease: "power2.inOut",
      });

      // Scroll: pin hero, zoom Build to center then blast off
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
        animation: gsap.timeline()
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

    }, containerRef);

    return () => { ctx.revert(); clearTimeout(timerId); };
  }, []);

  const textStyle: React.CSSProperties = {
    fontFamily: "'Satoshi', sans-serif",
    fontWeight: 900,
    fontSize: "clamp(64px,10vw,148px)",
    letterSpacing: "-0.04em",
    lineHeight: 1,
  };

  // "Build" chars — dotless ı so the animated dot acts as the tittle
  const buildChars = ["B", "u", "ı", "l", "d"];
  const buildCenter = (buildChars.length - 1) / 2;

  return (
    <>
      <style>{`
        @keyframes heroCharIn {
          0%   { opacity: 0; transform: translateX(calc(-0.4em * var(--char-offset, 0))) scale(0); }
          90%  { opacity: 1; transform: translateX(0) scale(1.08); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>

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
        {/* Bouncing dot — becomes the tittle of the "i" in Build */}
        <div
          ref={dotRef}
          style={{
            position: "fixed",
            width: "clamp(8px,1.4vw,20px)",
            height: "clamp(8px,1.4vw,20px)",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#1D6FF2,#06B6D4)",
            boxShadow: "0 0 18px rgba(29,111,242,0.9), 0 0 6px rgba(6,182,212,0.6)",
            zIndex: 20,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            padding: "7rem clamp(20px,5vw,80px) 5rem",
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div style={{ marginBottom: "3rem" }}>

            {/* Line 1: We Build */}
            <div style={{ ...textStyle, marginBottom: "0.05em", textAlign: "center" }}>
              <span className="hero-fade" style={{ color: "#ffffff" }}>
                <CharSplit text="We" startDelay={0.2} color="#ffffff" style={textStyle} />
                {" "}
              </span>
              <span
                className="hero-build-word"
                style={{ display: "inline-block", transformStyle: "preserve-3d", ...textStyle }}
              >
                {buildChars.map((char, i) => (
                  <span
                    key={i}
                    ref={char === "ı" ? iRef : undefined}
                    style={{
                      display: "inline-block",
                      animation: `heroCharIn 0.6s cubic-bezier(0.5,0,0.5,1) ${0.32 + i * 0.048}s both`,
                      ["--char-offset" as string]: i - buildCenter,
                      background: "linear-gradient(135deg,#1D6FF2,#06B6D4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      ...textStyle,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </div>

            {/* Line 2: Brands */}
            <div
              className="hero-fade"
              style={{ ...textStyle, marginBottom: "0.05em", textAlign: "center", color: "#ffffff" }}
            >
              <CharSplit text="Brands" startDelay={0.58} color="#ffffff" style={textStyle} />
            </div>

            {/* Line 3: That Grow. */}
            <div className="hero-fade" style={{ ...textStyle, textAlign: "center" }}>
              <CharSplit text="That" startDelay={0.88} color="rgba(255,255,255,0.18)" style={textStyle} />
              {" "}
              <CharSplit text="Grow." startDelay={1.08} color="#ffffff" style={textStyle} />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
