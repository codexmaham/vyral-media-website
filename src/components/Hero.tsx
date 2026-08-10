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
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    let timerId: ReturnType<typeof setTimeout>;

    const ctx = gsap.context(() => {
      const dotEl = dotRef.current;
      const overlayEl = overlayRef.current;
      if (!dotEl) return;

      const cx = window.innerWidth / 2;
      const floor = window.innerHeight * 0.42;

      gsap.set(dotEl, { x: cx, y: -80, xPercent: -50, yPercent: -50, scale: 4, opacity: 1 });

      const bounceTl = gsap.timeline()
        .to(dotEl, { y: floor, scaleX: 1.8, scaleY: 0.4, duration: 0.28, ease: "power3.in" })
        .to(dotEl, { y: floor - 260, scaleX: 1, scaleY: 1, scale: 3, duration: 0.32, ease: "power2.out" })
        .to(dotEl, { y: floor, scaleX: 1.6, scaleY: 0.35, duration: 0.22, ease: "power3.in" })
        .to(dotEl, { y: floor - 130, scaleX: 1, scaleY: 1, scale: 2, duration: 0.22, ease: "power2.out" })
        .to(dotEl, { y: floor, scaleX: 1.4, scaleY: 0.5, duration: 0.16, ease: "power3.in" })
        .to(dotEl, { y: floor - 55, scaleX: 1, scaleY: 1, scale: 1.5, duration: 0.16, ease: "power2.out" })
        .to(dotEl, { y: floor, scaleX: 1.2, scaleY: 0.7, duration: 0.1, ease: "power3.in" })
        .to(dotEl, { y: floor - 20, scale: 1.2, scaleX: 1, scaleY: 1, duration: 0.14, ease: "power2.out" });

      // Measure "ı" position early — before any transforms fire at t=1500ms
      let finalX = 0, finalY = 0;
      const measureTimer = setTimeout(() => {
        const iEl = iRef.current;
        if (!iEl) return;
        const iRect = iEl.getBoundingClientRect();
        finalX = iRect.left + iRect.width / 2;
        finalY = iRect.top + iRect.height * 0.12;
      }, 1200);

      timerId = setTimeout(() => {
        if (!dotEl) return;
        bounceTl.kill();

        // Fly dot to "i" + fade out preloader overlay simultaneously
        gsap.to(dotEl, {
          x: finalX, y: finalY,
          scale: 1, scaleX: 1, scaleY: 1,
          duration: 0.55, ease: "back.out(2)",
          onComplete: () => {
            // 3D flip after dot lands
            gsap.to(".hero-build-word", {
              rotationY: 360,
              duration: 1.2,
              ease: "power2.inOut",
            });
          },
        });
        if (overlayEl) {
          gsap.to(overlayEl, { opacity: 0, duration: 0.7, ease: "power2.inOut", onComplete: () => {
            overlayEl.style.display = "none";
          }});
        }
      }, 1500);

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
        {/* Preloader overlay — covers page until dot lands on "i" */}
        <div
          ref={overlayRef}
          style={{
            position: "fixed",
            inset: 0,
            background: "#07071A",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        />

        {/* Bouncing dot — becomes the tittle of the "i" in Build */}
        <div
          ref={dotRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "clamp(14px,2vw,30px)",
            height: "clamp(14px,2vw,30px)",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#1D6FF2,#06B6D4)",
            boxShadow: "0 0 18px rgba(29,111,242,0.9), 0 0 6px rgba(6,182,212,0.6)",
            zIndex: 10000,
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
