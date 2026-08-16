"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type MarqueeLogo = {
  src: string;
  alt: string;
  color?: string;
};

export type MarqueeLogoScrollerProps = {
  title: string;
  description?: string;
  logos: MarqueeLogo[];
  speed?: "slow" | "normal" | "fast";
  className?: string;
};

const speedMap = {
  slow: "42s",
  normal: "28s",
  fast: "18s",
} as const;

const FALLBACK = { r: 29, g: 111, b: 242 };

function extractLogoColor(img: HTMLImageElement): { r: number; g: number; b: number } {
  const canvas = document.createElement("canvas");
  const size = 72;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return FALLBACK;

  ctx.drawImage(img, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);

  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += 4) {
    const pr = data[i]!;
    const pg = data[i + 1]!;
    const pb = data[i + 2]!;
    const alpha = data[i + 3]!;

    if (alpha < 40) continue;
    if (pr > 238 && pg > 238 && pb > 238) continue;
    if (pr < 20 && pg < 20 && pb < 20) continue;

    const max = Math.max(pr, pg, pb);
    const min = Math.min(pr, pg, pb);
    const saturation = max === 0 ? 0 : (max - min) / max;
    if (saturation < 0.1 && max > 70) continue;

    r += pr;
    g += pg;
    b += pb;
    count++;
  }

  if (!count) return FALLBACK;
  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
  };
}

function parseHex(color: string): { r: number; g: number; b: number } | null {
  const hex = color.replace("#", "");
  if (hex.length !== 6) return null;
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

function toRgb(color?: string): { r: number; g: number; b: number } {
  if (!color) return FALLBACK;
  const hex = parseHex(color);
  if (hex) return hex;
  const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (match) {
    return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) };
  }
  return FALLBACK;
}

function LogoTile({ logo }: { logo: MarqueeLogo }) {
  const [extractedRgb, setExtractedRgb] = useState<ReturnType<typeof toRgb> | null>(null);

  useEffect(() => {
    if (logo.color) return;

    const img = new window.Image();
    img.src = logo.src;
    img.onload = () => setExtractedRgb(extractLogoColor(img));
  }, [logo.src, logo.color]);

  const rgb = logo.color ? toRgb(logo.color) : (extractedRgb ?? FALLBACK);

  const bg = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`;
  const border = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.38)`;

  return (
    <div
      className="group flex aspect-square w-[clamp(6.5rem,11vw,8.75rem)] shrink-0 items-center justify-center rounded-[1.35rem] p-5 transition-transform duration-300 hover:scale-[0.98]"
      style={{
        backgroundColor: bg,
        border: `1px solid ${border}`,
      }}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={120}
        height={120}
        className="max-h-[58%] max-w-[78%] object-contain"
      />
    </div>
  );
}

export function MarqueeLogoScroller({
  title,
  description,
  logos,
  speed = "normal",
  className,
}: MarqueeLogoScrollerProps) {
  const duration = speedMap[speed];
  const track = [...logos, ...logos];

  return (
    <section className={cn("w-full overflow-hidden", className)}>
      <style>{`
        @keyframes marquee-logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-logo-track {
          animation: marquee-logo-scroll ${duration} linear infinite;
        }
        .marquee-logo-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "clamp(1.5rem, 4vw, 3rem)",
          flexWrap: "wrap",
          padding: "0 clamp(20px, 4vw, 40px)",
          marginBottom: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        <h2
          className="h-large"
          style={{
            color: "#000000",
            maxWidth: "14ch",
            margin: 0,
            lineHeight: 0.95,
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              color: "rgba(0,0,0,0.45)",
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.875rem",
              lineHeight: 1.65,
              maxWidth: "22rem",
              margin: "0.35rem 0 0",
              flex: "1 1 16rem",
            }}
          >
            {description}
          </p>
        )}
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <div className="marquee-logo-track flex w-max items-center gap-3 px-4 sm:gap-4">
          {track.map((logo, index) => (
            <LogoTile key={`${logo.alt}-${index}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MarqueeLogoScroller;
