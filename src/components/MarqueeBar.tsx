"use client";

import Image from "next/image";

// Clients with logos — files must be placed in public/logos/
const clients = [
  { name: "Saghir Sultan Group", logo: "/logos/saghir-sultan-group.png", invert: false, h: 64 },
  { name: "Saghir Sultan Flour Mills", logo: "/logos/saghir-sultan-flour.png", invert: false, h: 64 },
  { name: "Pizza Fort", logo: "/logos/pizza-fort.png", invert: false, h: 56 },
  { name: "Rowdyz", logo: "/logos/rowdyz.png", invert: false, h: 52 },
  { name: "Fazal Din's Pharma", logo: "/logos/fazal-din.png", invert: false, h: 44 },
  { name: "Tax Sale Guy", logo: "/logos/tax-sale-guy.png", invert: false, h: 64 },
  { name: "Vynixo", logo: "/logos/vynixo.png", invert: false, h: 36 },
  { name: "Yemek", logo: "/logos/yemek.png", invert: false, h: 60 },
  { name: "Al Noor Town", logo: null, invert: false, h: 48 },
  { name: "ABS Developers", logo: null, invert: false, h: 48 },
  { name: "Pizza Bites & Cafe", logo: null, invert: false, h: 48 },
  { name: "Lasania Medical", logo: null, invert: false, h: 48 },
  { name: "Rahim Impex", logo: null, invert: false, h: 48 },
  { name: "Guy Leroy", logo: null, invert: false, h: 48 },
];

export default function MarqueeBar() {
  return (
    <section id="marquee" style={{
      background: "linear-gradient(135deg, #0a0a0a 0%, #0f1a2e 50%, #0a0a0a 100%)",
      overflow: "hidden",
      borderTop: "1px solid rgba(29,111,242,0.15)",
      borderBottom: "1px solid rgba(29,111,242,0.15)",
      padding: "3rem 0",
      position: "relative",
    }}>
      {/* Glow line top */}
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
        background: "linear-gradient(90deg, transparent, #1D6FF2, #06B6D4, transparent)",
      }} />

      {/* Trusted by label */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
        }}>
          Brands we&apos;ve worked with
        </span>
      </div>

      {/* Fade masks */}
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "140px", zIndex: 2,
          background: "linear-gradient(90deg, #0a0a0a, transparent)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "140px", zIndex: 2,
          background: "linear-gradient(270deg, #0a0a0a, transparent)",
          pointerEvents: "none",
        }} />

        <div style={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div className="marquee-track" style={{ display: "flex", alignItems: "center", minWidth: "max-content", gap: "0" }}>
            {[...clients, ...clients].map((client, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                <div style={{
                  padding: "0 2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "72px",
                }}>
                  {client.logo ? (
                    <div style={{
                      position: "relative",
                      height: 48,
                      width: 120,
                      flexShrink: 0,
                    }}>
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        style={{
                          objectFit: "contain",
                          filter: "brightness(0) invert(1)",
                          opacity: 0.8,
                        }}
                      />
                    </div>
                  ) : (
                    <span style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "rgba(255,255,255,0.6)",
                      whiteSpace: "nowrap",
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                    }}>
                      {client.name}
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div style={{
                  width: "1px",
                  height: "32px",
                  background: "linear-gradient(to bottom, transparent, rgba(29,111,242,0.4), transparent)",
                  flexShrink: 0,
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Glow line bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: "20%", right: "20%", height: "1px",
        background: "linear-gradient(90deg, transparent, #06B6D4, #1D6FF2, transparent)",
      }} />

      <style>{`
        .marquee-track {
          animation: marquee 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
