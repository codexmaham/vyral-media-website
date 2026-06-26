"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "Saghir Sultan Group", logo: "/logos/saghir-sultan-group.png" },
  { name: "Saghir Sultan Flour Mills", logo: "/logos/saghir-sultan-flour.png" },
  { name: "Pizza Fort", logo: "/logos/pizza-fort.png" },
  { name: "Rowdyz", logo: "/logos/rowdyz.png" },
  { name: "Fazal Din's Pharma", logo: "/logos/fazal-din.png" },
  { name: "Tax Sale Guy", logo: "/logos/tax-sale-guy.png" },
  { name: "Vynixo", logo: "/logos/vynixo.png" },
  { name: "Yemek", logo: "/logos/yemek.png" },
  { name: "Al Noor Town", logo: null },
  { name: "ABS Developers", logo: null },
  { name: "Pizza Bites & Cafe", logo: null },
  { name: "Lasania Medical", logo: null },
  { name: "Rahim Impex", logo: null },
  { name: "Guy Leroy", logo: null },
];

type Client = typeof clients[0];

function ClientLogo({ client }: { client: Client }) {
  const [errored, setErrored] = useState(false);

  if (!client.logo || errored) {
    return (
      <span style={{
        fontFamily: "'Satoshi', sans-serif",
        fontWeight: 800,
        fontSize: "clamp(1rem,1.4vw,1.3rem)",
        color: "rgba(255,255,255,0.7)",
        whiteSpace: "nowrap",
        letterSpacing: "-0.01em",
      }}>
        {client.name}
      </span>
    );
  }

  return (
    <div style={{ position: "relative", height: 56, width: 140, flexShrink: 0 }}>
      <Image
        src={client.logo}
        alt={client.name}
        fill
        onError={() => setErrored(true)}
        style={{ objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.85 }}
      />
    </div>
  );
}

export default function MarqueeBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !track || !wrapper) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - wrapper.offsetWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="marquee" style={{
      background: "linear-gradient(135deg, #0a0a0a 0%, #0c1525 50%, #0a0a0a 100%)",
      overflow: "hidden",
    }}>
      <div ref={wrapperRef} style={{ position: "relative" }}>
        {/* Header */}
        <div style={{ padding: "5rem clamp(20px,4vw,40px) 3rem", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ width: 24, height: 1, background: "#1D6FF2" }} />
            <span className="label" style={{ color: "rgba(255,255,255,0.3)" }}>Trusted By</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }} className="marquee-head-row">
            <h2 className="h-large" style={{ color: "#ffffff" }}>Our Clients</h2>
            <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Inter',sans-serif", fontSize: "0.875rem", maxWidth: "24rem" }}>
              Scroll to meet the brands we&apos;ve helped grow.
            </p>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div style={{ paddingBottom: "5rem", paddingLeft: "clamp(20px,4vw,40px)", paddingRight: "clamp(20px,4vw,40px)" }}>
          <div ref={trackRef} style={{ display: "flex", gap: "1.5rem", width: "max-content" }}>
            {clients.map((client, i) => (
              <div
                key={i}
                style={{
                  width: "clamp(200px,22vw,280px)",
                  flexShrink: 0,
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "1.25rem",
                  padding: "2.5rem 2rem",
                  background: "rgba(255,255,255,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Number */}
                <span style={{
                  fontFamily: "'Satoshi',sans-serif",
                  fontWeight: 900,
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  color: "#1D6FF2",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Logo or name */}
                <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <ClientLogo client={client} />
                </div>

                {/* Bottom accent */}
                <div style={{
                  height: 2,
                  background: "linear-gradient(90deg, #1D6FF2, #06B6D4)",
                  borderRadius: "9999px",
                  width: "40%",
                  opacity: 0.5,
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .marquee-head-row { flex-direction: row !important; align-items: flex-end !important; justify-content: space-between !important; }
        }
      `}</style>
    </section>
  );
}
