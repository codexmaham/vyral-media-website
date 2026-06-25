"use client";

import { useEffect, useRef, useState } from "react";

export default function StickyBookCTA() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      ref={btnRef}
      href="#contact"
      onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        backgroundColor: "#0B0B0B",
        color: "#ffffff",
        fontFamily: "'Satoshi', sans-serif",
        fontWeight: 600,
        fontSize: "0.875rem",
        padding: "0.875rem 1.75rem",
        borderRadius: "9999px",
        whiteSpace: "nowrap",
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? "0px" : "16px"})`,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        textDecoration: "none",
      }}
    >
      {/* Animated dot */}
      <span style={{ position: "relative", display: "flex", height: "8px", width: "8px" }}>
        <span className="animate-ping" style={{ position: "absolute", display: "inline-flex", height: "100%", width: "100%", borderRadius: "9999px", backgroundColor: "#06B6D4", opacity: 0.75 }} />
        <span style={{ position: "relative", display: "inline-flex", borderRadius: "9999px", height: "8px", width: "8px", backgroundColor: "#1D6FF2" }} />
      </span>
      Book a Discovery Call
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}
