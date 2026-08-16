"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ImageStreamHero, { type CorridorPath } from "@/components/ui/image-stream-hero";
import type { Piece } from "@/data/portfolio";

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
        borderRadius: 999,
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

type StreamSettings = {
  axis: number;
  cards: number;
  speed: number;
  height: string;
  path: CorridorPath;
};

const MOBILE: StreamSettings = {
  axis: 58,
  cards: 8,
  speed: 16,
  height: "clamp(480px, 88vh, 640px)",
  path: {
    cardWidth: 15,
    cardHeight: 21,
    exitHeight: 38,
    railExit: 38,
  },
};

const DESKTOP: StreamSettings = {
  axis: 54,
  cards: 10,
  speed: 20,
  height: "100%",
  path: {
    perspective: 32,
    cardWidth: 14,
    cardHeight: 19,
    exitHeight: 42,
    railExit: 40,
    railBirth: -10,
    birthHeight: 2.4,
    fan: 3.4,
    turnExit: 26,
  },
};

function useStreamSettings() {
  const [settings, setSettings] = useState<StreamSettings>(DESKTOP);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setSettings(mq.matches ? DESKTOP : MOBILE);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return settings;
}

function SectionHeader({ count }: { count: number }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
        <span style={labelStyle}>02</span>
        <div style={{ width: 22, height: 1, background: "rgba(255,255,255,0.25)" }} />
        <span style={labelStyle}>Design</span>
      </div>
      <h2 style={titleStyle}>
        Graphic
        <sup style={supStyle}>{String(count).padStart(2, "0")}</sup>
      </h2>
      <p style={{ ...blurbStyle, textAlign: "left", marginTop: "1.25rem", maxWidth: "22rem" }}>
        Social campaigns, brand systems and key visuals — your work, front and centre.
      </p>
    </>
  );
}

export default function GraphicStream({
  pieces,
  totalCount,
}: {
  pieces: Piece[];
  totalCount: number;
}) {
  const stream = useStreamSettings();
  const images = pieces.map((piece) => ({
    src: piece.src,
    alt: `${piece.title} — ${piece.client}`,
  }));

  const streamProps = {
    images,
    cards: stream.cards,
    speed: stream.speed,
    axis: stream.axis,
    path: stream.path,
  };

  return (
    <>
      {/* Mobile: stacked overlay */}
      <div className="lg:hidden">
        <ImageStreamHero
          {...streamProps}
          className="w-full"
          style={{ height: stream.height }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[5]"
            style={{
              background: `
                linear-gradient(180deg, rgba(11,11,16,0.96) 0%, rgba(11,11,16,0.55) 24%, rgba(11,11,16,0.1) 50%, rgba(11,11,16,0.92) 100%),
                linear-gradient(90deg, rgba(11,11,16,0.75) 0%, transparent 20%, transparent 80%, rgba(11,11,16,0.75) 100%)
              `,
            }}
          />
          <div
            className="relative z-10 flex h-full flex-col justify-between"
            style={{ padding: "clamp(2rem,5vw,3rem) clamp(20px,5vw,40px)" }}
          >
            <SectionHeader count={pieces.length} />
            <ViewAll>{`All ${totalCount} graphics`}</ViewAll>
          </div>
        </ImageStreamHero>
      </div>

      {/* Desktop: split panel + corridor */}
      <div
        className="hidden lg:grid"
        style={{
          gridTemplateColumns: "minmax(320px, 38%) 1fr",
          minHeight: "clamp(620px, 76vh, 820px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(2.5rem,4vw,4rem) clamp(2rem,4vw,3.5rem)",
            borderRight: "1px solid rgba(255,255,255,0.08)",
            background: "#0B0B10",
          }}
        >
          <SectionHeader count={pieces.length} />
          <ViewAll>{`All ${totalCount} graphics`}</ViewAll>
        </div>

        <div className="relative min-h-[620px] overflow-hidden">
          <ImageStreamHero
            {...streamProps}
            className="absolute inset-0 h-full w-full"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[5]"
            style={{
              background: `
                linear-gradient(90deg, rgba(11,11,16,0.55) 0%, transparent 14%, transparent 86%, rgba(11,11,16,0.55) 100%),
                linear-gradient(180deg, transparent 0%, transparent 72%, rgba(11,11,16,0.35) 100%)
              `,
            }}
          />
        </div>
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.45)",
};

const titleStyle: React.CSSProperties = {
  fontFamily: "'Satoshi',sans-serif",
  fontWeight: 900,
  fontSize: "clamp(2.25rem,5vw,4.5rem)",
  letterSpacing: "-0.045em",
  lineHeight: 0.9,
  margin: 0,
  color: "#fff",
};

const supStyle: React.CSSProperties = {
  fontSize: "0.24em",
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "rgba(255,255,255,0.35)",
  marginLeft: "0.5em",
  top: "-1.4em",
  position: "relative",
};

const blurbStyle: React.CSSProperties = {
  fontFamily: "'Inter',sans-serif",
  fontSize: "0.85rem",
  lineHeight: 1.65,
  color: "rgba(255,255,255,0.4)",
  margin: 0,
};
