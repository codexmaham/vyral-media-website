"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) rotate(-30deg)`;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99999,
        pointerEvents: "none",
        willChange: "transform",
        marginLeft: -2,
        marginTop: -2,
      }}
    >
      <svg
        width="32"
        height="52"
        viewBox="0 0 32 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))" }}
      >
        {/* Stick */}
        <rect x="13" y="10" width="4" height="40" rx="2" fill="white" />
        {/* Tip glow */}
        <circle cx="15" cy="10" r="6" fill="#1D6FF2" opacity="0.3" />
        <circle cx="15" cy="10" r="4" fill="#1D6FF2" />
        <circle cx="15" cy="10" r="2" fill="white" />
        {/* Handle grip lines */}
        <rect x="11" y="42" width="8" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
        <rect x="11" y="46" width="8" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
      </svg>
    </div>
  );
}
