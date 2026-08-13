"use client";

import Image from "next/image";
import Link from "next/link";
import { VideoRail, GraphicGrid } from "@/components/PortfolioGrid";
import { videos, graphics } from "@/data/portfolio";

export default function PortfolioPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#08080B", color: "#fff" }}>
      {/* ───────────────────────────────────────────────── Header ───── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px)",
          background: "rgba(8,8,11,0.72)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            padding: "0 clamp(20px,5vw,72px)",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Image src="/vyral-icon.png" alt="" width={30} height={30} style={{ objectFit: "contain" }} />
            <span style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: "1rem", letterSpacing: "-0.03em", color: "#fff" }}>
              VYRAL
              <span style={{ background: "linear-gradient(135deg,#1D6FF2,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>.</span>
            </span>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: "clamp(1rem,3vw,2rem)" }}>
            <a href="#motion" style={navLink}>Video</a>
            <a href="#design" style={navLink}>Graphic</a>
            <Link href="/" style={{ ...navLink, color: "rgba(255,255,255,0.4)" }}>← Index</Link>
          </nav>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────── Hero ───── */}
      <section style={{ padding: "clamp(4rem,10vw,7.5rem) clamp(20px,5vw,72px) clamp(2.5rem,5vw,4rem)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.75rem" }}>
          <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.28)" }} />
          <span
            style={{
              fontFamily: "'Satoshi',sans-serif",
              fontWeight: 500,
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.38)",
            }}
          >
            Selected Work
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Satoshi',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3rem,11vw,9rem)",
            letterSpacing: "-0.05em",
            lineHeight: 0.88,
            margin: 0,
            color: "#fff",
          }}
        >
          Portfolio
        </h1>

        <div
          style={{
            marginTop: "clamp(2rem,4vw,3rem)",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.45)",
              maxWidth: "30rem",
              margin: 0,
            }}
          >
            Two disciplines, two showcases — motion work built for the feed, and design
            systems built to hold a brand together.
          </p>

          <dl style={{ display: "flex", gap: "clamp(1.5rem,4vw,3rem)", margin: 0, fontFamily: "'Satoshi',sans-serif" }}>
            {[
              { n: videos.length, l: "Videos" },
              { n: graphics.length, l: "Graphics" },
            ].map((s) => (
              <div key={s.l}>
                <dt style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)", marginBottom: 4 }}>
                  {s.l}
                </dt>
                <dd style={{ margin: 0, fontWeight: 700, fontSize: "1.4rem", letterSpacing: "-0.02em", color: "#fff", fontVariantNumeric: "tabular-nums" }}>
                  {String(s.n).padStart(2, "0")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ────────────────────────────────────────────── 01 Motion ───── */}
      <section id="motion" style={{ padding: "clamp(2rem,4vw,3rem) clamp(20px,5vw,72px) clamp(4rem,8vw,6.5rem)" }}>
        <VideoRail pieces={videos} />
      </section>

      {/* ────────────────────────────────────────────── 02 Design ───── */}
      <section
        id="design"
        style={{
          background: "#0B0B10",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "clamp(4rem,8vw,6.5rem) clamp(20px,5vw,72px)",
        }}
      >
        <GraphicGrid pieces={graphics} />
      </section>

      {/* ────────────────────────────────────────────────── CTA ───── */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "clamp(4rem,9vw,7rem) clamp(20px,5vw,72px)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Satoshi',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.75rem,5vw,3.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
            margin: "0 0 1.75rem",
            color: "#fff",
          }}
        >
          Let&rsquo;s make the next one.
        </h2>
        <Link
          href="/#contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            fontFamily: "'Satoshi',sans-serif",
            fontWeight: 600,
            fontSize: "0.9rem",
            color: "#08080B",
            background: "#fff",
            textDecoration: "none",
            padding: "0.95rem 2.4rem",
            borderRadius: 999,
          }}
        >
          Start a project
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </section>
    </main>
  );
}

const navLink: React.CSSProperties = {
  fontFamily: "'Satoshi',sans-serif",
  fontWeight: 500,
  fontSize: "0.78rem",
  letterSpacing: "0.06em",
  color: "rgba(255,255,255,0.65)",
  textDecoration: "none",
};
