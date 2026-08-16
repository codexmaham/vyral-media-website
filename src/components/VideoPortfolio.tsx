"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardFanCarousel, { type FanCard } from "@/components/ui/card-fan-carousel";
import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { PortfolioLightbox } from "@/components/PortfolioGrid";
import type { Piece } from "@/data/portfolio";
import { featuredVideos, videos, graphics } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

function ViewAll({ children }: { children: string }) {
  return (
    <Link
      href="/portfolio"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
        fontFamily: "'Satoshi',sans-serif",
        fontWeight: 600,
        fontSize: "0.82rem",
        color: "#fff",
        textDecoration: "none",
        padding: "0.75rem 1.75rem",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.18)",
        transition: "background 300ms, color 300ms, border-color 300ms",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = "#fff";
        el.style.color = "#08080B";
        el.style.borderColor = "#fff";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "transparent";
        el.style.color = "#fff";
        el.style.borderColor = "rgba(255,255,255,0.18)";
      }}
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

function toGraphicSlides(pieces: Piece[]): CoverflowSlide[] {
  return pieces.map((piece) => ({
    src: piece.src,
    alt: `${piece.title} — ${piece.client}`,
    title: piece.title,
    subtitle: piece.client,
  }));
}

function toVideoFanCards(pieces: Piece[], onOpen: (index: number) => void): FanCard[] {
  return pieces.map((piece, index) => ({
    imgUrl: piece.poster ?? piece.src,
    videoUrl: piece.src,
    alt: `${piece.title} — ${piece.client}`,
    title: piece.title,
    subtitle: piece.client,
    onClick: () => onOpen(index),
  }));
}

const videoGallery = featuredVideos;
const graphicGallery = graphics.slice(0, 12);
const VIDEO_CENTER = 3;

export default function Portfolio({ ready }: { ready: boolean }) {
  const videoSectionRef = useRef<HTMLElement>(null);
  const graphicSectionRef = useRef<HTMLElement>(null);
  const [openVideo, setOpenVideo] = useState<number | null>(null);
  const [videoIndex, setVideoIndex] = useState(VIDEO_CENTER);
  const scrollVideoIndexRef = useRef(-1);

  useEffect(() => {
    if (!ready) return;

    const videoSection = videoSectionRef.current;
    const graphicSection = graphicSectionRef.current;
    if (!videoSection || !graphicSection) return;

    let ctx: gsap.Context;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;

      ctx?.revert();
      scrollVideoIndexRef.current = -1;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: videoSection,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 0.9, videoGallery.length * 140)}`,
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (videoGallery.length - 1));
            if (idx === scrollVideoIndexRef.current) return;
            scrollVideoIndexRef.current = idx;
            setVideoIndex(idx);
          },
        });

        ScrollTrigger.create({
          trigger: graphicSection,
          start: "top top",
          end: "+=85%",
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      });

      ScrollTrigger.refresh();
    };

    const refresh = () => ScrollTrigger.refresh();
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const t = window.setTimeout(() => {
      fontsReady.then(setup);
    }, 1200);

    window.addEventListener("resize", refresh);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
      window.removeEventListener("resize", refresh);
      ctx?.revert();
    };
  }, [ready]);

  return (
    <div style={{ position: "relative", zIndex: 20, isolation: "isolate" }}>
      <style>{`
        @keyframes heroCaptionIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Motion ── */}
      <section
        ref={videoSectionRef}
        id="work"
        style={{
          background: "#08080B",
          padding: "clamp(1.25rem, 2.5vw, 2rem) clamp(20px,5vw,72px) clamp(1.5rem, 3vw, 2.25rem)",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.25rem",
            paddingBottom: "0.85rem",
            borderBottom: "1px solid rgba(255,255,255,0.09)",
            marginBottom: "0.75rem",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.85rem" }}>
              <span
                style={{
                  fontFamily: "'Satoshi',sans-serif",
                  fontWeight: 500,
                  fontSize: "0.68rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                01
              </span>
              <div style={{ width: 22, height: 1, background: "rgba(255,255,255,0.25)" }} />
              <span
                style={{
                  fontFamily: "'Satoshi',sans-serif",
                  fontWeight: 500,
                  fontSize: "0.68rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                Motion
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Satoshi',sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem,5vw,3.75rem)",
                letterSpacing: "-0.045em",
                lineHeight: 0.9,
                margin: 0,
                color: "#fff",
              }}
            >
              Video
              <sup
                style={{
                  fontSize: "0.24em",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.35)",
                  marginLeft: "0.5em",
                  top: "-1.4em",
                  position: "relative",
                }}
              >
                {String(videoGallery.length).padStart(2, "0")}
              </sup>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.85rem",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.4)",
              maxWidth: "20rem",
              margin: 0,
            }}
          >
            Short-form reels and brand films — click any card to play full screen.
          </p>
        </div>

        <CardFanCarousel
          cards={toVideoFanCards(videoGallery, setOpenVideo)}
          activeIndex={videoIndex}
          onActiveIndexChange={setVideoIndex}
          autoplay={false}
          showCaption
        />

        <div style={{ marginTop: "0.85rem", display: "flex", justifyContent: "center" }}>
          <ViewAll>{`All ${videos.length} videos`}</ViewAll>
        </div>
      </section>

      {/* ── Design ── */}
      <section
        ref={graphicSectionRef}
        id="graphic-portfolio"
        style={{
          position: "relative",
          zIndex: 2,
          background: "#0B0B10",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "clamp(1.25rem, 2.5vw, 2rem) clamp(20px,5vw,72px) clamp(2rem, 4vw, 3rem)",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.25rem",
            paddingBottom: "0.85rem",
            borderBottom: "1px solid rgba(255,255,255,0.09)",
            marginBottom: "1rem",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.85rem" }}>
              <span
                style={{
                  fontFamily: "'Satoshi',sans-serif",
                  fontWeight: 500,
                  fontSize: "0.68rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                02
              </span>
              <div style={{ width: 22, height: 1, background: "rgba(255,255,255,0.25)" }} />
              <span
                style={{
                  fontFamily: "'Satoshi',sans-serif",
                  fontWeight: 500,
                  fontSize: "0.68rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                Design
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Satoshi',sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem,5vw,3.75rem)",
                letterSpacing: "-0.045em",
                lineHeight: 0.9,
                margin: 0,
                color: "#fff",
              }}
            >
              Graphic
              <sup
                style={{
                  fontSize: "0.24em",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.35)",
                  marginLeft: "0.5em",
                  top: "-1.4em",
                  position: "relative",
                }}
              >
                {String(graphicGallery.length).padStart(2, "0")}
              </sup>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.85rem",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.4)",
              maxWidth: "20rem",
              margin: 0,
            }}
          >
            Social campaigns, brand systems and key visuals — drag to explore the rack.
          </p>
        </div>

        <CoverflowCarousel
          slides={toGraphicSlides(graphicGallery)}
          showCaption
          showNavigation
          showPagination
          autoplay
          loop
          autoplayInterval={3200}
          label="Graphic portfolio carousel"
          cardWidth="clamp(148px, 18vw, 220px)"
        />

        <div style={{ marginTop: "1.25rem", display: "flex", justifyContent: "center" }}>
          <ViewAll>{`All ${graphics.length} graphics`}</ViewAll>
        </div>
      </section>

      {openVideo !== null && (
        <PortfolioLightbox
          pieces={videoGallery}
          index={openVideo}
          onClose={() => setOpenVideo(null)}
          onIndex={setOpenVideo}
        />
      )}
    </div>
  );
}
