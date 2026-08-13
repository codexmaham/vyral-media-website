"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const featuredVideos = [
  "Speedster Windbreaker.mp4",
  "kickster Product #1.mp4",
  "DE STONER .mp4",
  "Avora May  P4.mp4",
  "Sialkot Mandi 2026.mp4",
  "SS Intro.mp4",
].map((f) => `/Video Portfolio/${encodeURIComponent(f)}`);

const featuredGraphics = [
  "alnoortownsialkot_1760012700_3739580030373081280_54847221192.jpg",
  "officialvynixo.co_1781704871_3921547138899174291_42014251022.jpg",
  "ssflourmills_1774270602_3859183640584708111_77639780635.jpg",
  "yemekdoner.skt_1756217770_3707745845338334029_45215707328.jpg",
  "officialvynixo.co_1783112410_3933354434221955642_42014251022.jpg",
  "alnoortownsialkot_1766624362_3795042668712086294_54847221192.jpg",
].map((f) => `/Graphic Portfolio/${encodeURIComponent(f)}`);

function VideoCard({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <div
      onMouseEnter={() => { ref.current?.play().then(() => setPlaying(true)).catch(() => {}); }}
      onMouseLeave={() => { const v = ref.current; if (v) { v.pause(); v.currentTime = 0; } setPlaying(false); }}
      style={{ position: "relative", aspectRatio: "9/16", borderRadius: 16, overflow: "hidden", background: "#111", flexShrink: 0 }}
    >
      <video ref={ref} src={src} muted playsInline preload="none" loop
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        opacity: playing ? 0 : 1, transition: "opacity 0.25s",
        background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [tab, setTab] = useState<"video" | "graphic">("video");
  const items = tab === "video" ? featuredVideos : featuredGraphics;

  return (
    <section id="work" style={{ background: "#0B0B0B", padding: "6rem clamp(20px,5vw,80px)" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.3)" }} />
            <span style={{ fontFamily: "'Satoshi',sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Our Work</span>
          </div>
          <h2 style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
            Portfolio
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", background: "rgba(255,255,255,0.06)", borderRadius: 999, padding: "0.3rem" }}>
          {(["video", "graphic"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: "0.82rem",
              textTransform: "capitalize", padding: "0.5rem 1.25rem", borderRadius: 999,
              border: "none", cursor: "pointer", transition: "all 0.2s",
              background: tab === t ? "#1D6FF2" : "transparent",
              color: tab === t ? "#fff" : "rgba(255,255,255,0.5)",
            }}>{t === "video" ? "Video" : "Graphic"}</button>
          ))}
        </div>
      </div>

      {/* Featured grid — 3 cols */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(8px,1.5vw,14px)", marginBottom: "2.5rem" }}>
        {tab === "video"
          ? items.map((src) => <VideoCard key={src} src={src} />)
          : items.map((src, i) => (
              <div key={src} style={{ position: "relative", aspectRatio: "1/1", borderRadius: 16, overflow: "hidden", background: "#111" }}>
                <Image src={src} alt={`graphic ${i}`} fill sizes="33vw" style={{ objectFit: "cover" }} loading="lazy" />
              </div>
            ))
        }
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center" }}>
        <Link href="/portfolio" style={{
          display: "inline-flex", alignItems: "center", gap: "0.6rem",
          fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: "0.95rem",
          color: "#fff", textDecoration: "none",
          padding: "0.9rem 2.2rem", borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.05)",
          transition: "all 0.2s",
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1D6FF2"; (e.currentTarget as HTMLElement).style.borderColor = "#1D6FF2"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
        >
          View Full Portfolio
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </section>
  );
}
