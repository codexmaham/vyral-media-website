"use client";

import Link from "next/link";
import { VideoRail, GraphicGrid } from "./PortfolioGrid";
import { featuredVideos, featuredGraphics, videos, graphics } from "@/data/portfolio";

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

export default function Portfolio() {
  return (
    <div style={{ position: "relative", zIndex: 20, isolation: "isolate" }}>
      {/* ── Motion ── */}
      <section id="work" style={{ background: "#08080B", padding: "clamp(5rem,10vw,7.5rem) clamp(20px,5vw,72px) clamp(3.5rem,7vw,5rem)" }}>
        <VideoRail
          pieces={featuredVideos}
          action={<ViewAll>{`All ${videos.length} videos`}</ViewAll>}
        />
      </section>

      {/* ── Design ── */}
      <section
        id="graphic-portfolio"
        style={{
          position: "relative",
          zIndex: 2,
          background: "#0B0B10",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "clamp(3.5rem,7vw,5.5rem) clamp(20px,5vw,72px) clamp(5rem,10vw,7.5rem)",
        }}
      >
        <GraphicGrid
          pieces={featuredGraphics}
          action={<ViewAll>{`All ${graphics.length} graphics`}</ViewAll>}
        />
      </section>
    </div>
  );
}
