"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Piece } from "@/data/portfolio";

/* ══════════════════════════════════════════════════════ Section head ═════ */

function SectionHead({
  index,
  kind,
  title,
  blurb,
  count,
  action,
}: {
  index: string;
  kind: string;
  title: string;
  blurb: string;
  count: number;
  action?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "2rem",
        paddingBottom: "1.4rem",
        borderBottom: "1px solid rgba(255,255,255,0.09)",
        marginBottom: "clamp(1.75rem,3.5vw,2.75rem)",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
          <span style={label}>{index}</span>
          <div style={{ width: 22, height: 1, background: "rgba(255,255,255,0.25)" }} />
          <span style={label}>{kind}</span>
        </div>
        <h2
          style={{
            fontFamily: "'Satoshi',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.25rem,6.5vw,5rem)",
            letterSpacing: "-0.045em",
            lineHeight: 0.9,
            margin: 0,
            color: "#fff",
          }}
        >
          {title}
          <sup
            style={{
              fontSize: "0.24em",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.35)",
              marginLeft: "0.5em",
              top: "-1.4em",
              position: "relative",
            }}
          >
            {String(count).padStart(2, "0")}
          </sup>
        </h2>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: "1.5rem", flexWrap: "wrap" }}>
        <p
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "0.85rem",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.4)",
            maxWidth: "20rem",
            margin: 0,
          }}
        >
          {blurb}
        </p>
        {action}
      </div>
    </div>
  );
}

const label: React.CSSProperties = {
  fontFamily: "'Satoshi',sans-serif",
  fontWeight: 500,
  fontSize: "0.68rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.38)",
};

/* ══════════════════════════════════════════════════════════ Overlay ══════ */

function Overlay({ piece, index, hover }: { piece: Piece; index: number; hover: boolean }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.12) 45%, transparent 72%)",
          opacity: hover ? 1 : 0,
          transition: "opacity 560ms cubic-bezier(0.16,1,0.3,1)",
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          position: "absolute",
          top: 14,
          right: 16,
          fontFamily: "'Satoshi',sans-serif",
          fontWeight: 500,
          fontSize: "0.68rem",
          letterSpacing: "0.12em",
          color: "#fff",
          mixBlendMode: "difference",
          opacity: hover ? 1 : 0,
          transform: hover ? "translateY(0)" : "translateY(-6px)",
          transition: "all 500ms cubic-bezier(0.16,1,0.3,1)",
          pointerEvents: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <figcaption
        style={{
          position: "absolute",
          left: 18,
          right: 18,
          bottom: 16,
          pointerEvents: "none",
          opacity: hover ? 1 : 0,
          transform: hover ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            height: 1,
            width: hover ? "100%" : "0%",
            background: "rgba(255,255,255,0.35)",
            marginBottom: 10,
            transition: "width 720ms cubic-bezier(0.16,1,0.3,1) 60ms",
          }}
        />
        <h3
          style={{
            margin: "0 0 3px",
            fontFamily: "'Satoshi',sans-serif",
            fontWeight: 700,
            fontSize: "0.92rem",
            letterSpacing: "-0.015em",
            lineHeight: 1.2,
            color: "#fff",
          }}
        >
          {piece.title}
        </h3>
        <span
          style={{
            fontFamily: "'Satoshi',sans-serif",
            fontWeight: 500,
            fontSize: "0.63rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {piece.client}
        </span>
      </figcaption>
    </>
  );
}

/* ═════════════════════════════════════════════════════════ Lightbox ══════ */

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
        background: "rgba(6,6,10,0.97)",
        backdropFilter: "blur(24px)",
        display: "flex",
        flexDirection: "column",
        animation: "lbFade 240ms ease",
      }}
    >
      <style>{`
        @keyframes lbFade { from { opacity:0 } to { opacity:1 } }
        @keyframes lbRise { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.15rem clamp(16px,4vw,40px)", flexShrink: 0 }}
      >
        <div>
          <div style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>{piece.title}</div>
          <div style={{ ...label, fontSize: "0.63rem", marginTop: 3 }}>{piece.client}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <span style={{ fontFamily: "'Satoshi',sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", fontVariantNumeric: "tabular-nums" }}>
            {String(index + 1).padStart(2, "0")} / {String(pieces.length).padStart(2, "0")}
          </span>
          <button onClick={onClose} aria-label="Close" style={iconBtn}>✕</button>
        </div>
      </div>

      <div
        onClick={onClose}
        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 clamp(16px,4vw,40px) 1.25rem", minHeight: 0, gap: "1rem" }}
      >
        <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous" style={{ ...iconBtn, width: 46, height: 46, fontSize: 20 }}>‹</button>
        <div
          key={piece.src}
          onClick={(e) => e.stopPropagation()}
          style={{ flex: 1, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", animation: "lbRise 360ms cubic-bezier(0.16,1,0.3,1)", minWidth: 0 }}
        >
          {piece.type === "video" ? (
            <video src={piece.src} poster={piece.poster} controls autoPlay playsInline style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 4 }} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={piece.src} alt={piece.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 4 }} />
          )}
        </div>
        <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next" style={{ ...iconBtn, width: 46, height: 46, fontSize: 20 }}>›</button>
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
};

/* ═══════════════════════════════════════════════════════ Video rail ══════ */

function ReelCard({ piece, index, onOpen }: { piece: Piece; index: number; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantPlay = useRef(false);
  const [hover, setHover] = useState(false);
  const [playing, setPlaying] = useState(false);

  // With preload="none" the first play() often rejects because no data has
  // arrived yet — retry once the element reports it can play.
  const tryPlay = () => {
    if (wantPlay.current) videoRef.current?.play().catch(() => {});
  };

  const enter = () => {
    wantPlay.current = true;
    setHover(true);
    tryPlay();
  };

  const leave = () => {
    wantPlay.current = false;
    setHover(false);
    setPlaying(false);
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <figure
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={onOpen}
      style={{
        position: "relative",
        margin: 0,
        flexShrink: 0,
        width: "clamp(200px, 21vw, 290px)",
        aspectRatio: "9 / 16",
        borderRadius: 3,
        overflow: "hidden",
        background: "#0E0E10",
        cursor: "pointer",
        scrollSnapAlign: "start",
      }}
    >
      <video
        ref={videoRef}
        src={piece.src}
        muted
        loop
        playsInline
        // The source files run up to 123 MB — nothing is fetched until hover.
        preload="none"
        onCanPlay={tryPlay}
        onLoadedData={tryPlay}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: hover ? "scale(1.05)" : "scale(1)",
          transition: "transform 900ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Poster sits above the video and only clears once playback actually
          starts. Using the video's own `poster` attribute instead would leave
          a decoded frame — frequently black — on screen after pausing. */}
      <Image
        src={piece.poster ?? piece.src}
        alt={piece.title}
        fill
        sizes="(max-width:640px) 60vw, 290px"
        style={{
          objectFit: "cover",
          opacity: playing ? 0 : 1,
          transition: "opacity 260ms ease",
          transform: hover ? "scale(1.05)" : "scale(1)",
          transitionProperty: "opacity, transform",
          transitionDuration: "260ms, 900ms",
          transitionTimingFunction: "ease, cubic-bezier(0.16,1,0.3,1)",
          pointerEvents: "none",
        }}
      />
      {/* Idle play glyph — stays up until playback really starts, so a slow
          video still gives feedback instead of an empty card. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: playing ? 0 : 1,
          transition: "opacity 400ms",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(6px)",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
        </span>
      </div>
      <Overlay piece={piece} index={index} hover={hover} />
    </figure>
  );
}

export function VideoRail({ pieces, action }: { pieces: Piece[]; action?: React.ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => () => { if (tweenRef.current) cancelAnimationFrame(tweenRef.current); }, []);

  const syncEdges = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(syncEdges, [syncEdges, pieces]);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;

    const first = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const pitch = first ? first.getBoundingClientRect().width + gap : el.clientWidth;
    const step = Math.max(1, Math.floor(el.clientWidth / pitch));

    // Absolute target from the current card index, so a click always lands on a
    // card boundary regardless of where a previous animation stopped.
    const currentCard = Math.round(el.scrollLeft / pitch);
    const maxScroll = el.scrollWidth - el.clientWidth;
    const to = Math.min(maxScroll, Math.max(0, (currentCard + dir * step) * pitch));

    // Hand-rolled tween: native `behavior: "smooth"` gets cancelled here after
    // the first animation (re-renders from the scroll handler interrupt it),
    // which left the arrows stuck. Writing scrollLeft directly always sticks.
    if (tweenRef.current) cancelAnimationFrame(tweenRef.current);
    const from = el.scrollLeft;
    const distance = to - from;
    if (!distance) return;

    const duration = 480;
    const start = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      el.scrollLeft = from + distance * easeOut(t);
      if (t < 1) tweenRef.current = requestAnimationFrame(frame);
      else tweenRef.current = null;
    };
    tweenRef.current = requestAnimationFrame(frame);
  };

  const arrow = (dir: 1 | -1, disabled: boolean) => (
    <button
      onClick={() => scrollBy(dir)}
      disabled={disabled}
      aria-label={dir === 1 ? "Scroll right" : "Scroll left"}
      style={{
        ...iconBtn,
        opacity: disabled ? 0.3 : 1,
        cursor: disabled ? "default" : "pointer",
        transition: "opacity 260ms",
      }}
    >
      {dir === 1 ? "›" : "‹"}
    </button>
  );

  return (
    <>
      <style>{`.reel-rail::-webkit-scrollbar{display:none}`}</style>

      <SectionHead
        index="01"
        kind="Motion"
        title="Video"
        count={pieces.length}
        blurb="Short-form reels and brand films built for the feed. Hover to preview, click for full screen."
        action={
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {arrow(-1, atStart)}
            {arrow(1, atEnd)}
          </div>
        }
      />

      <div
        ref={railRef}
        className="reel-rail"
        onScroll={syncEdges}
        style={{
          display: "flex",
          gap: "clamp(8px,1vw,14px)",
          overflowX: "auto",
          // `mandatory` re-snaps mid-animation and cancels programmatic
          // scrolls, which made the arrow buttons look broken.
          scrollSnapType: "x proximity",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: 4,
        }}
      >
        {pieces.map((piece, i) => (
          <ReelCard key={piece.src} piece={piece} index={i} onOpen={() => setOpen(i)} />
        ))}
      </div>

      {action && <div style={{ marginTop: "1.75rem" }}>{action}</div>}

      {open !== null && <Lightbox pieces={pieces} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}
    </>
  );
}

/* ════════════════════════════════════════════════════ Graphic grid ══════ */

function GraphicCard({ piece, index, onOpen }: { piece: Piece; index: number; onOpen: () => void }) {
  const [hover, setHover] = useState(false);

  return (
    <figure
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onOpen}
      style={{
        position: "relative",
        margin: 0,
        aspectRatio: "1 / 1",
        borderRadius: 3,
        overflow: "hidden",
        background: "#0E0E10",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: hover ? "scale(1.05)" : "scale(1)",
          transition: "transform 900ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Image
          src={piece.src}
          alt={piece.title}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1100px) 33vw, 25vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <Overlay piece={piece} index={index} hover={hover} />
    </figure>
  );
}

export function GraphicGrid({ pieces, action }: { pieces: Piece[]; action?: React.ReactNode }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <SectionHead
        index="02"
        kind="Design"
        title="Graphic"
        count={pieces.length}
        blurb="Social campaigns, brand systems and key visuals. Click any frame to open it full size."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(230px,100%), 1fr))",
          gap: "clamp(8px,1vw,14px)",
        }}
      >
        {pieces.map((piece, i) => (
          <GraphicCard key={piece.src} piece={piece} index={i} onOpen={() => setOpen(i)} />
        ))}
      </div>

      {action && <div style={{ marginTop: "1.75rem" }}>{action}</div>}

      {open !== null && <Lightbox pieces={pieces} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}
    </>
  );
}
