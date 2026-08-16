"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

const VISIBLE_COUNT = 7;
const CENTER_SLOT = 3;

const FIXED_SLOTS = [
  { rot: -21, scale: 0.72, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8, x: -22, y: 4, zIndex: 2 },
  { rot: -7, scale: 0.88, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0, scale: 1.22, x: 0, y: -1.4, zIndex: 25 },
  { rot: 7, scale: 0.88, x: 11, y: 1.3, zIndex: 3 },
  { rot: 14, scale: 0.8, x: 22, y: 4, zIndex: 2 },
  { rot: 21, scale: 0.72, x: 30, y: 7.3, zIndex: 1 },
] as const;

function getResponsiveMultiplier(width: number) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1;
}

function getHeightMultiplier(width: number) {
  let targetHeight: number;
  if (width < 480) targetHeight = 22 * 16;
  else if (width < 640) targetHeight = 26 * 16;
  else if (width < 768) targetHeight = 28 * 16;
  else if (width < 1024) targetHeight = 34 * 16;
  else targetHeight = 38 * 16;

  const maxHeight = window.innerHeight * 0.7;
  return maxHeight >= targetHeight ? 1 : maxHeight / targetHeight;
}

function getSlotConfig(visibleCount: number, slot: number) {
  const centerSlot = visibleCount >= VISIBLE_COUNT ? CENTER_SLOT : visibleCount >> 1;

  if (visibleCount >= VISIBLE_COUNT) {
    return FIXED_SLOTS[slot];
  }

  const center = visibleCount >> 1;
  const normalized = visibleCount > 1 ? (slot - center) / center : 0;
  const abs = Math.abs(normalized);

  const cfg = {
    rot: normalized * 21,
    scale: 1 - 0.2244 * abs * abs,
    x: normalized * 30,
    y: abs * abs * 7.3,
    zIndex: 10 - Math.abs(slot - center),
  };

  if (slot === centerSlot) {
    return { ...cfg, scale: 1.22, y: cfg.y - 1.4, zIndex: 25 };
  }

  return { ...cfg, scale: cfg.scale * 0.92 };
}

export type FanCard = {
  imgUrl: string;
  videoUrl?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  linkUrl?: string;
  onClick?: () => void;
};

function FanCardMedia({ card, isCenter }: { card: FanCard; isCenter: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isCenter) return;
    video.muted = true;
    void video.play().catch(() => {});
  }, [isCenter]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !card.videoUrl) return;

    if (isCenter) {
      video.currentTime = 0;
      tryPlay();
    } else {
      video.pause();
    }
  }, [card.videoUrl, isCenter, tryPlay]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", pointerEvents: "none" }}>
      {isCenter && card.videoUrl ? (
        <video
          ref={videoRef}
          src={card.videoUrl}
          poster={card.imgUrl}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          onLoadedData={tryPlay}
          onCanPlay={tryPlay}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 10,
          }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={card.imgUrl}
          loading="lazy"
          alt={card.alt ?? "Video poster"}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}

export type CardFanCarouselProps = {
  cards: FanCard[];
  className?: string;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  autoplay?: boolean;
  autoplayInterval?: number;
  showCaption?: boolean;
};

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );
}

export default function CardFanCarousel({
  cards,
  className,
  activeIndex: controlledIndex,
  onActiveIndexChange,
  autoplay = false,
  autoplayInterval = 3500,
  showCaption = false,
}: CardFanCarouselProps) {
  const layoutRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const enteredRef = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const visibleRef = useRef(new Set<number>());
  const autoplayPausedRef = useRef(false);
  const prevIndexRef = useRef<number | null>(null);

  const count = cards.length;
  const paginated = count > VISIBLE_COUNT;
  const isControlled = controlledIndex !== undefined;
  const defaultIndex = paginated ? CENTER_SLOT : count >> 1;
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultIndex);
  const activeIndex = isControlled ? controlledIndex : uncontrolledIndex;

  const setIndex = useCallback(
    (next: number) => {
      const normalized = ((next % count) + count) % count;
      if (!isControlled) setUncontrolledIndex(normalized);
      onActiveIndexChange?.(normalized);
    },
    [count, isControlled, onActiveIndexChange],
  );

  useEffect(() => {
    if (!isControlled) return;
    const prev = prevIndexRef.current;
    if (prev !== null && prev !== controlledIndex) {
      directionRef.current = controlledIndex! > prev ? "right" : "left";
      autoplayPausedRef.current = true;
      window.setTimeout(() => {
        autoplayPausedRef.current = false;
      }, autoplayInterval * 2);
    }
    prevIndexRef.current = controlledIndex ?? null;
  }, [autoplayInterval, controlledIndex, isControlled]);

  const getSlotMap = useCallback(
    (center: number) => {
      const map = new Map<number, number>();
      if (!paginated) {
        cards.forEach((_, i) => map.set(i, i));
        return map;
      }
      for (let slot = 0; slot < VISIBLE_COUNT; slot++) {
        map.set(((center + slot - CENTER_SLOT) % count + count) % count, slot);
      }
      return map;
    },
    [cards, count, paginated],
  );

  const paginate = useCallback(
    (dir: "left" | "right") => {
      if (animatingRef.current || !paginated) return;
      animatingRef.current = true;
      directionRef.current = dir;
      setIndex(dir === "right" ? activeIndex + 1 : activeIndex - 1);
    },
    [activeIndex, paginated, setIndex],
  );

  const paginateRef = useRef(paginate);
  useEffect(() => {
    paginateRef.current = paginate;
  }, [paginate]);

  useEffect(() => {
    if (!autoplay || !paginated || count < 2) return;

    const tick = () => {
      if (autoplayPausedRef.current) return;
      paginateRef.current("right");
    };

    const id = window.setInterval(tick, autoplayInterval);
    return () => window.clearInterval(id);
  }, [autoplay, autoplayInterval, count, paginated]);

  useEffect(() => {
    const root = layoutRef.current;
    if (!root || !count) return;

    const cardEls = Array.from(root.querySelectorAll<HTMLElement>(".fan-card"));
    if (!cardEls.length) return;

    const slotMap = getSlotMap(activeIndex);
    const prevVisible = visibleRef.current;
    const direction = directionRef.current;
    const isFirst = !enteredRef.current;
    const widthMul = getResponsiveMultiplier(window.innerWidth);
    const heightMul = getHeightMultiplier(window.innerWidth);
    const visibleCount = paginated ? VISIBLE_COUNT : count;
    const config = (slot: number) => getSlotConfig(visibleCount, slot);

    if (isFirst) animatingRef.current = true;

    let done = 0;
    const total = slotMap.size;
    const onDone = () => {
      done += 1;
      if (done >= total) {
        animatingRef.current = false;
        if (isFirst) enteredRef.current = true;
      }
    };

    cardEls.forEach((el, cardIndex) => {
      const slot = slotMap.get(cardIndex);
      const wasVisible = prevVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * widthMul}rem`,
          y: `${y * heightMul}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        if (isFirst) {
          gsap.set(el, { x: 0, y: `${12 * heightMul}rem`, rotation: 0, scale: 0.5, opacity: 0 });
          gsap.to(el, {
            ...target,
            duration: 1.2,
            ease: "elastic.out(1.05, 0.78)",
            delay: 0.2 + slot * 0.06,
            onComplete: onDone,
          });
        } else if (wasVisible) {
          gsap.to(el, { ...target, duration: 0.5, ease: "power2.out", onComplete: onDone });
        } else {
          const enterX = direction === "right" ? 40 : -40;
          gsap.set(el, {
            x: `${enterX}rem`,
            y: `${y * heightMul}rem`,
            rotation: direction === "right" ? 30 : -30,
            scale: 0.5,
            opacity: 0,
          });
          gsap.to(el, { ...target, duration: 0.6, ease: "power2.out", onComplete: onDone });
        }
      } else if (wasVisible) {
        const exitX = direction === "right" ? -40 : 40;
        gsap.to(el, {
          x: `${exitX}rem`,
          opacity: 0,
          scale: 0.5,
          rotation: direction === "right" ? -30 : 30,
          duration: 0.4,
          ease: "power2.in",
          zIndex: 0,
        });
      } else if (isFirst) {
        gsap.set(el, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
      }
    });

    visibleRef.current = new Set(slotMap.keys());

    const relayout = () => {
      const wMul = getResponsiveMultiplier(window.innerWidth);
      const hMul = getHeightMultiplier(window.innerWidth);

      cardEls.forEach((el, cardIndex) => {
        const slot = slotMap.get(cardIndex);
        if (slot === undefined) return;
        const { x, y, rot, scale, zIndex } = config(slot);
        gsap.set(el, {
          x: `${x * wMul}rem`,
          y: `${y * hMul}rem`,
          rotation: rot,
          scale,
          zIndex,
        });
      });
    };

    window.addEventListener("resize", relayout);
    return () => {
      window.removeEventListener("resize", relayout);
      gsap.killTweensOf(cardEls);
    };
  }, [activeIndex, count, getSlotMap, paginated]);

  const pauseAutoplay = (ms = autoplayInterval * 2) => {
    autoplayPausedRef.current = true;
    window.setTimeout(() => {
      autoplayPausedRef.current = false;
    }, ms);
  };

  const activeCard = cards[activeIndex];

  if (!count) return null;

  return (
    <section className={cn("flex flex-col items-center w-full relative z-20", className)} style={{ padding: "0.5rem 0 1rem" }}>
      <div
        className="relative w-full"
        style={{ maxWidth: "90rem", margin: "0 auto", padding: paginated ? "0 clamp(2.5rem, 4vw, 3.5rem)" : 0 }}
      >
        {paginated && (
          <>
            <button
              type="button"
              onClick={() => {
                pauseAutoplay();
                paginate("left");
              }}
              aria-label="Previous"
              style={sideNavBtn}
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              onClick={() => {
                pauseAutoplay();
                paginate("right");
              }}
              aria-label="Next"
              style={{ ...sideNavBtn, left: "auto", right: "clamp(0px, 1vw, 12px)" }}
            >
              <Chevron direction="right" />
            </button>
          </>
        )}

        <div ref={layoutRef} className="fan-layout flex relative justify-center items-center w-full max-w-[80rem] mx-auto">
          {cards.map((card, index) => {
            const isCenter = index === activeIndex;
            const inner = <FanCardMedia card={card} isCenter={isCenter} />;

            if (card.onClick) {
              return (
                <button
                  key={`${card.imgUrl}-${index}`}
                  type="button"
                  className={`fan-card block cursor-pointer border-0 p-0 text-left${isCenter ? " fan-card--center" : ""}`}
                  style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
                  onClick={() => {
                    pauseAutoplay();
                    card.onClick?.();
                  }}
                  aria-label={card.alt ?? `Play ${card.title ?? `card ${index + 1}`}`}
                >
                  {inner}
                </button>
              );
            }

            if (card.linkUrl) {
              return (
                <a
                  key={`${card.imgUrl}-${index}`}
                  href={card.linkUrl}
                  target={card.linkUrl.startsWith("http") ? "_blank" : undefined}
                  rel={card.linkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="fan-card block cursor-pointer"
                >
                  {inner}
                </a>
              );
            }

            return (
              <div key={`${card.imgUrl}-${index}`} className="fan-card">
                {inner}
              </div>
            );
          })}
        </div>
      </div>

      {showCaption && activeCard?.title && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            padding: "0 1.5rem",
            marginTop: "clamp(0.5rem, 2vh, 1rem)",
            position: "relative",
            zIndex: 60,
            minHeight: "4.25rem",
            animation: "heroCaptionIn 320ms ease",
          }}
        >
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)",
              letterSpacing: "-0.03em",
              color: "#fff",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            {activeCard.title}
          </p>
          {activeCard.subtitle && (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.5)",
                margin: "0.4rem 0 0",
                lineHeight: 1.4,
              }}
            >
              Made for {activeCard.subtitle}
            </p>
          )}
        </div>
      )}

      {paginated && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: showCaption && activeCard?.title ? "0.85rem" : "1rem",
            position: "relative",
            zIndex: 60,
          }}
        >
          {cards.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to video ${index + 1}`}
              onClick={() => {
                if (index === activeIndex || animatingRef.current) return;
                pauseAutoplay();
                animatingRef.current = true;
                directionRef.current = index > activeIndex ? "right" : "left";
                setIndex(index);
              }}
              style={{
                width: index === activeIndex ? 10 : 8,
                height: index === activeIndex ? 10 : 8,
                borderRadius: "9999px",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: index === activeIndex ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
                transition: "all 300ms ease",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

const sideNavBtn: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "clamp(0px, 1vw, 12px)",
  transform: "translateY(-50%)",
  zIndex: 200,
  width: "clamp(2.75rem, 4vw, 3.25rem)",
  height: "clamp(2.75rem, 4vw, 3.25rem)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "9999px",
  border: "1.5px solid rgba(255,255,255,0.22)",
  background: "rgba(8,8,11,0.82)",
  backdropFilter: "blur(16px)",
  color: "#fff",
  cursor: "pointer",
  boxShadow: "0 8px 28px rgba(0,0,0,0.45)",
};
