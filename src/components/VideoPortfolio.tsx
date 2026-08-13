"use client";

import Link from "next/link";
import PortfolioGrid from "./PortfolioGrid";
import { featured, allPieces } from "@/data/portfolio";

export default function Portfolio() {
  return (
    <section id="work" style={{ background: "#08080B", padding: "clamp(5rem,10vw,8rem) clamp(20px,5vw,72px)" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "2rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          marginBottom: "clamp(1.5rem,3vw,2.5rem)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem" }}>
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
          <h2
            style={{
              fontFamily: "'Satoshi',sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.25rem,6vw,4.5rem)",
              letterSpacing: "-0.045em",
              lineHeight: 0.92,
              margin: 0,
              color: "#fff",
            }}
          >
            Portfolio
          </h2>
        </div>

        <p
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "0.88rem",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.42)",
            maxWidth: "24rem",
            margin: 0,
          }}
        >
          Motion and design for brands that refuse to blend in. Hover to preview — click to view full screen.
        </p>
      </div>

      <PortfolioGrid pieces={featured} />

      {/* CTA */}
      <div
        style={{
          marginTop: "clamp(2.5rem,5vw,4rem)",
          paddingTop: "1.75rem",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.25rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Satoshi',sans-serif",
            fontWeight: 500,
            fontSize: "0.72rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          {featured.length} of {allPieces.length} shown
        </span>

        <Link
          href="/portfolio"
          className="portfolio-cta"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.65rem",
            fontFamily: "'Satoshi',sans-serif",
            fontWeight: 600,
            fontSize: "0.88rem",
            color: "#fff",
            textDecoration: "none",
            padding: "0.85rem 2rem",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.18)",
            transition: "background 320ms, border-color 320ms, color 320ms",
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
          View all work
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
