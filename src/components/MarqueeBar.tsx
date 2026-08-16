"use client";

import { MarqueeLogoScroller, type MarqueeLogo } from "@/components/ui/marquee-logo-scroller";

const clients: MarqueeLogo[] = [
  { src: "/logos/Asset 33x.png", alt: "Client 1" },
  { src: "/logos/Asset 43x.png", alt: "Client 2" },
  { src: "/logos/Asset 53x.png", alt: "Client 3" },
  { src: "/logos/Asset 63x.png", alt: "Client 4" },
  { src: "/logos/FDPP.png", alt: "Fazal Din's Pharma" },
  { src: "/logos/GuyLeroy1.png", alt: "Guy Leroy" },
  { src: "/logos/YemekLogoPNG.png", alt: "Yemek" },
  { src: "/logos/logo.png", alt: "Partner" },
];

export default function MarqueeBar() {
  return (
    <section
      id="marquee"
      style={{
        background: "#ffffff",
        padding: "clamp(4rem, 8vw, 6rem) 0",
        position: "relative",
      }}
    >
      <MarqueeLogoScroller
        title="Trusted by Brands Worldwide"
        description="Real estate, F&B, healthcare, and SaaS teams chose us to build and grow their digital presence."
        logos={clients}
        speed="normal"
      />
    </section>
  );
}
