"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────
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

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => { videoRef.current?.play().then(() => setPlaying(true)).catch(() => {}); }}
      onMouseLeave={() => { const v = videoRef.current; if (v) { v.pause(); v.currentTime = 0; } setPlaying(false); }}
      style={{ position: "relative", aspectRatio: "9/16", borderRadius: 20, overflow: "hidden", cursor: "pointer", background: "#111", flexShrink: 0 }}
    >
      <video ref={videoRef} src={src} muted playsInline preload="none" loop
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        opacity: playing ? 0 : 1, transition: "opacity 0.25s", background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)", border: "1.5px solid rgba(255,255,255,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>
    </div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ src, type, onClose, onPrev, onNext }: {
  src: string; type: "video" | "image";
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} style={navBtn}>‹</button>
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "90vh" }}>
        {type === "video"
          ? <video src={src} controls autoPlay playsInline style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: 16, display: "block" }} />
          : <img src={src} alt="" style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: 16, display: "block", objectFit: "contain" }} />
        }
      </div>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} style={{ ...navBtn, left: "auto", right: 16 }}>›</button>
      <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: 40, height: 40,
        color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
    </div>
  );
}

const navBtn: React.CSSProperties = {
  position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "50%", width: 48, height: 48, color: "#fff", fontSize: 24,
  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [tab, setTab] = useState<"video" | "graphic">("video");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = tab === "video" ? videos : graphics;
  const type = tab === "video" ? "video" : "image";

  const prev = useCallback(() => setLightbox((i) => i !== null ? (i - 1 + items.length) % items.length : null), [items.length]);
  const next = useCallback(() => setLightbox((i) => i !== null ? (i + 1) % items.length : null), [items.length]);

  return (
    <div style={{ minHeight: "100vh", background: "#07071A", color: "#fff" }}>

      {/* Nav */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px)", background: "rgba(7,7,26,0.8)", padding: "0 clamp(20px,5vw,80px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Image src="/vyral-icon.png" alt="Vyral" width={36} height={36} style={{ objectFit: "contain" }} />
            <span style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: "1.1rem",
              letterSpacing: "-0.03em", color: "#fff" }}>
              VYRAL<span style={{ background: "linear-gradient(135deg,#1D6FF2,#06B6D4)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>.</span>
            </span>
          </Link>
          <Link href="/" style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 600, fontSize: "0.85rem",
            color: "rgba(255,255,255,0.6)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
            padding: "0.5rem 1rem", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 999,
            transition: "all 0.2s" }}>
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div style={{ padding: "5rem clamp(20px,5vw,80px) 3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.3)" }} />
          <span style={{ fontFamily: "'Satoshi',sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Our Work</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <h1 style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 900,
              fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: "-0.04em", lineHeight: 1, color: "#fff", marginBottom: "0.75rem" }}>
              Portfolio
            </h1>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.45)", maxWidth: "36rem" }}>
              Real work. Real results. Hover videos to preview, click to watch full screen.
            </p>
          </div>

          {/* Tab switcher */}
          <div style={{ display: "flex", gap: "0.5rem", background: "rgba(255,255,255,0.06)",
            borderRadius: 999, padding: "0.3rem" }}>
            {(["video", "graphic"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: "0.85rem",
                letterSpacing: "0.04em", textTransform: "capitalize",
                padding: "0.55rem 1.5rem", borderRadius: 999, border: "none", cursor: "pointer",
                transition: "all 0.2s",
                background: tab === t ? "#1D6FF2" : "transparent",
                color: tab === t ? "#fff" : "rgba(255,255,255,0.5)",
              }}>
                {t === "video" ? "Video" : "Graphic"}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.25)",
          marginTop: "1.5rem" }}>{items.length} pieces</p>
      </div>

      {/* Grid */}
      <div style={{ padding: "0 clamp(20px,5vw,80px) 6rem" }}>
        {tab === "video" ? (
          // Video — 3-col with staggered heights via rows of 3
          <div style={{ columns: "3", columnGap: 12 }}>
            {videos.map((src, i) => (
              <div key={src} style={{ breakInside: "avoid", marginBottom: 12 }}>
                <VideoCard src={src} onClick={() => setLightbox(i)} />
              </div>
            ))}
          </div>
        ) : (
          // Graphics — masonry 3-col
          <div style={{ columns: "3", columnGap: 12 }}>
            {graphics.map((src, i) => (
              <div key={src} onClick={() => setLightbox(i)}
                style={{ breakInside: "avoid", marginBottom: 12, borderRadius: 20,
                  overflow: "hidden", cursor: "pointer", position: "relative" }}>
                <Image
                  src={src} alt={`Graphic ${i + 1}`}
                  width={600} height={600}
                  style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.3s" }}
                  loading="lazy"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox src={items[lightbox]} type={type as "video" | "image"}
          onClose={() => setLightbox(null)} onPrev={prev} onNext={next} />
      )}
    </div>
  );
}
