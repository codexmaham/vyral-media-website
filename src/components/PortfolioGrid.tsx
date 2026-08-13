"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Piece } from "@/data/portfolio";

/* ────────────────────────────────────────────────────────────── Card ───── */

function Card({ piece, index, onOpen }: { piece: Piece; index: number; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);

  const enter = () => {
    setHover(true);
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  };
  const leave = () => {
    setHover(false);
    const v = videoRef.current;
    if (v) { v.pause(); v.currentTime = 0; }
  };

  const isFeature = piece.span === 2;

  return (
    <figure
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={onOpen}
      style={{
        gridColumn: isFeature ? "span 2" : "span 1",
        position: "relative",
        margin: 0,
        cursor: "pointer",
        aspectRatio: piece.type === "video"
          ? (isFeature ? "4 / 3" : "9 / 16")
          : (isFeature ? "4 / 3" : "1 / 1"),
        overflow: "hidden",
        background: "#0E0E10",
        borderRadius: 2,
      }}
    >
      {/* Media */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: hover ? "scale(1.045)" : "scale(1)",
          transition: "transform 900ms cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
        }}
      >
        {piece.type === "video" ? (
          <video
            ref={videoRef}
            // #t=0.1 makes the browser seek and paint a first frame as a poster
            src={`${piece.src}#t=0.1`}
            muted
            loop
            playsInline
            preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <Image
            src={piece.src}
            alt={piece.title}
            fill
            sizes={isFeature ? "(max-width:900px) 100vw, 66vw" : "(max-width:900px) 50vw, 33vw"}
            style={{ objectFit: "cover" }}
          />
        )}
      </div>

      {/* Veil */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 42%, rgba(0,0,0,0) 70%)",
          opacity: hover ? 1 : 0,
          transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1)",
          pointerEvents: "none",
        }}
      />

      {/* Index — top right */}
      <span
        style={{
          position: "absolute",
          top: 16,
          right: 18,
          fontFamily: "'Satoshi',sans-serif",
          fontWeight: 500,
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.75)",
          opacity: hover ? 1 : 0,
          transform: hover ? "translateY(0)" : "translateY(-6px)",
          transition: "all 520ms cubic-bezier(0.16,1,0.3,1)",
          pointerEvents: "none",
          mixBlendMode: "difference",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Metadata — bottom left */}
      <figcaption
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 18,
          pointerEvents: "none",
          opacity: hover ? 1 : 0,
          transform: hover ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 520ms cubic-bezier(0.16,1,0.3,1), transform 620ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            height: 1,
            width: hover ? "100%" : "0%",
            background: "rgba(255,255,255,0.35)",
            marginBottom: 12,
            transition: "width 760ms cubic-bezier(0.16,1,0.3,1) 60ms",
          }}
        />
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem" }}>
          <h3
            style={{
              margin: 0,
              fontFamily: "'Satoshi',sans-serif",
              fontWeight: 700,
              fontSize: isFeature ? "1.15rem" : "0.95rem",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#fff",
            }}
          >
            {piece.title}
          </h3>
          <span
            style={{
              flexShrink: 0,
              fontFamily: "'Satoshi',sans-serif",
              fontWeight: 500,
              fontSize: "0.66rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {piece.client}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

/* ───────────────────────────────────────────────────────── Lightbox ───── */

function Lightbox({
  pieces,
  index,
  onClose,
  onIndex,
}: {
  pieces: Piece[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const piece = pieces[index];

  const prev = useCallback(() => onIndex((index - 1 + pieces.length) % pieces.length), [index, pieces.length, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % pieces.length), [index, pieces.length, onIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(6,6,10,0.96)",
        backdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        animation: "lbFade 260ms ease",
      }}
    >
      <style>{`
        @keyframes lbFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes lbRise { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>

      {/* Top bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem clamp(16px,4vw,40px)",
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#fff", letterSpacing: "-0.01em" }}>
            {piece.title}
          </div>
          <div style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 500, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: 3 }}>
            {piece.client}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <span style={{ fontFamily: "'Satoshi',sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)" }}>
            {String(index + 1).padStart(2, "0")} / {String(pieces.length).padStart(2, "0")}
          </span>
          <button onClick={onClose} aria-label="Close" style={iconBtn}>✕</button>
        </div>
      </div>

      {/* Stage */}
      <div
        onClick={onClose}
        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 clamp(16px,4vw,40px) 1rem", minHeight: 0, gap: "1rem" }}
      >
        <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous" style={{ ...iconBtn, width: 46, height: 46, fontSize: 20, flexShrink: 0 }}>‹</button>

        <div
          key={piece.src}
          onClick={(e) => e.stopPropagation()}
          style={{ flex: 1, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", animation: "lbRise 380ms cubic-bezier(0.16,1,0.3,1)", minWidth: 0 }}
        >
          {piece.type === "video" ? (
            <video src={piece.src} controls autoPlay playsInline style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 4, display: "block" }} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={piece.src} alt={piece.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 4, display: "block" }} />
          )}
        </div>

        <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next" style={{ ...iconBtn, width: 46, height: 46, fontSize: 20, flexShrink: 0 }}>›</button>
      </div>
    </div>
  );
}

const iconBtn: React.CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.14)",
  color: "#fff",
  fontSize: 15,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "background 200ms",
};

/* ───────────────────────────────────────────────────────────── Grid ───── */

export default function PortfolioGrid({ pieces }: { pieces: Piece[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
          gap: "clamp(6px, 0.9vw, 14px)",
          gridAutoFlow: "dense",
        }}
      >
        {pieces.map((piece, i) => (
          <Card key={piece.src} piece={piece} index={i} onOpen={() => setOpen(i)} />
        ))}
      </div>

      {open !== null && (
        <Lightbox pieces={pieces} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      )}
    </>
  );
}
