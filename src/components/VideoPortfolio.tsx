"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

// ── Video files ──────────────────────────────────────────────────────────────
const videos = [
  "Speedster Windbreaker.mp4",
  "windbrreaker.mp4",
  "gemstone jacket v1.mp4.mp4",
  "kickster Product #1.mp4",
  "DE STONER .mp4",
  "Avora May  P4.mp4",
  "Avora may P#2.mp4",
  "Final Dr Zarak C#2.mp4",
  "Sialkot Mandi 2026.mp4",
  "SS Intro.mp4",
  "Mela .1.mp4",
  "Do you Know 1 to 5.mp4",
  "TH 1.mp4",
  "Th 2 final.mp4",
  "Th 2.mp4",
  "Creative 1 Lasnia medical complex  - Copy.mp4",
  "C4.mp4",
  "c3 final.mp4",
  "1..mp4",
  "lv_0_20241014134514.mp4",
  "IMG_1195.MP4",
  "IMG_1503.MP4",
  "IMG_7783.MP4",
  "IMG_0198.MOV",
  "IMG_0199.MOV",
  "IMG_4701.MOV",
  "IMG_9050.MOV",
].map((f) => `/Video Portfolio/${encodeURIComponent(f)}`);

// ── Graphic files ─────────────────────────────────────────────────────────────
const graphics = [
  "alnoortownsialkot_1757140059_3715482569388094541_54847221192.jpg",
  "alnoortownsialkot_1760012700_3739580030373081280_54847221192.jpg",
  "alnoortownsialkot_1760541862_3744018966600225708_54847221192.jpg",
  "alnoortownsialkot_1766624362_3795042668712086294_54847221192.jpg",
  "alnoortownsialkot_1771421315_3835277426406492914_54847221192.jpg",
  "officialvynixo.co_1781704871_3921547138899174291_42014251022.jpg",
  "officialvynixo.co_1781964007_3923720931553442068_42014251022.jpg",
  "officialvynixo.co_1783112410_3933354434221955642_42014251022.jpg",
  "officialvynixo.co_1783162806_3933777190092648352_42014251022 (1).jpg",
  "officialvynixo.co_1783162806_3933777190092648352_42014251022.jpg",
  "officialvynixo.co_1783198817_3934079268045049251_42014251022.jpg",
  "officialvynixo.co_1783508418_3936676395644421431_42014251022.jpg",
  "ssflourmills_1774270602_3859183640584708111_77639780635.jpg",
  "ssflourmills_1775770938_3871769678549155115_77639780635.jpg",
  "ssflourmills_1779883592_3906269154751969537_77639780635.jpg",
  "ssflourmills_1780236253_3909227455406159077_77639780635.jpg",
  "yemekdoner.skt_1743500112_3601062397686797594_45215707328.jpg",
  "yemekdoner.skt_1751986827_3672254126007435182_45215707328.jpg",
  "yemekdoner.skt_1755511565_3701821775159502275_45215707328(1).jpg",
  "yemekdoner.skt_1755511565_3701821775159502275_45215707328.jpg",
  "yemekdoner.skt_1756217770_3707745845338334029_45215707328.jpg",
  "yemekdoner.skt_1780376415_3910403237882813378_45215707328.jpg",
  "yemekdoner.skt_1781460034_3919493304438029639_45215707328.jpg",
].map((f) => `/Graphic Portfolio/${encodeURIComponent(f)}`);

// ── Video card ────────────────────────────────────────────────────────────────
function VideoCard({ src, onClick }: { src: string; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };

  const handleLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: "relative",
        aspectRatio: "9/16",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        background: "#111",
        flexShrink: 0,
      }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="none"
        loop
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* Play icon overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: playing ? 0 : 1,
          transition: "opacity 0.2s",
          background: "rgba(0,0,0,0.35)",
        }}
      >
        <div style={{
          width: 52, height: 52, borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255,255,255,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Image card ────────────────────────────────────────────────────────────────
function ImageCard({ src, onClick }: { src: string; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        aspectRatio: "1/1",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        background: "#111",
        flexShrink: 0,
      }}
    >
      <Image
        src={src}
        alt="Portfolio graphic"
        fill
        sizes="(max-width:768px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
        loading="lazy"
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0)",
        transition: "background 0.2s",
      }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(29,111,242,0.15)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0)"; }}
      />
    </div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ src, type, onClose, onPrev, onNext }: {
  src: string; type: "video" | "image";
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
    >
      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        style={{
          position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%", width: 44, height: 44, color: "#fff", fontSize: 20,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >‹</button>

      {/* Media */}
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "90vh" }}>
        {type === "video" ? (
          <video
            src={src}
            controls
            autoPlay
            playsInline
            style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: 12, display: "block" }}
          />
        ) : (
          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh" }}>
            <img
              src={src}
              alt="Portfolio"
              style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: 12, display: "block", objectFit: "contain" }}
            />
          </div>
        )}
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={{
          position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%", width: 44, height: 44, color: "#fff", fontSize: 20,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >›</button>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 16, right: 16,
          background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%", width: 40, height: 40, color: "#fff", fontSize: 18,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >✕</button>
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [tab, setTab] = useState<"video" | "graphic">("video");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = tab === "video" ? videos : graphics;
  const type = tab === "video" ? "video" : "image";

  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => i !== null ? (i - 1 + items.length) % items.length : null), [items.length]);
  const next = useCallback(() => setLightbox((i) => i !== null ? (i + 1) % items.length : null), [items.length]);

  return (
    <section
      id="work"
      style={{ background: "#0B0B0B", padding: "6rem clamp(20px,5vw,80px)" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.3)" }} />
          <span style={{ fontFamily: "'Satoshi',sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Our Work</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <h2 style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
            Portfolio
          </h2>

          {/* Tab switcher */}
          <div style={{ display: "flex", gap: "0.5rem", background: "rgba(255,255,255,0.06)", borderRadius: 999, padding: "0.3rem" }}>
            {(["video", "graphic"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  fontFamily: "'Satoshi',sans-serif", fontWeight: 700,
                  fontSize: "0.8rem", letterSpacing: "0.05em", textTransform: "capitalize",
                  padding: "0.5rem 1.25rem", borderRadius: 999, border: "none",
                  cursor: "pointer", transition: "all 0.2s",
                  background: tab === t ? "#1D6FF2" : "transparent",
                  color: tab === t ? "#fff" : "rgba(255,255,255,0.5)",
                }}
              >
                {t === "video" ? "🎬 Video" : "🎨 Graphic"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(clamp(140px,22vw,260px), 1fr))",
        gap: "clamp(8px,1.5vw,16px)",
      }}>
        {items.map((src, i) =>
          tab === "video" ? (
            <VideoCard key={src} src={src} onClick={() => openLightbox(i)} />
          ) : (
            <ImageCard key={src} src={src} onClick={() => openLightbox(i)} />
          )
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          src={items[lightbox]}
          type={type as "video" | "image"}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
