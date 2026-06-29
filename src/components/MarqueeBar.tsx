"use client";

import { useState } from "react";

const clients = [
  { name: "Client 1", logo: "/logos/Asset 33x.png" },
  { name: "Client 2", logo: "/logos/Asset 43x.png" },
  { name: "Client 3", logo: "/logos/Asset 53x.png" },
  { name: "Client 4", logo: "/logos/Asset 63x.png" },
  { name: "Fazal Din's Pharma", logo: "/logos/FDPP.png" },
  { name: "Guy Leroy", logo: "/logos/GuyLeroy1.png" },
  { name: "Yemek", logo: "/logos/YemekLogoPNG.png" },
  { name: "Logo", logo: "/logos/logo.png" },
];

function ClientLogo({ client }: { client: typeof clients[0] }) {
  const [errored, setErrored] = useState(false);

  if (!client.logo || errored) {
    return (
      <span style={{
        fontFamily: "'Satoshi', sans-serif",
        fontWeight: 900,
        fontSize: "clamp(1.1rem,1.8vw,1.5rem)",
        color: "#000000",
        textAlign: "center",
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        whiteSpace: "nowrap",
      }}>
        {client.name}
      </span>
    );
  }

  return (
    <img
      src={client.logo}
      alt={client.name}
      onError={() => setErrored(true)}
      style={{ height: 80, width: "auto", maxWidth: 200, objectFit: "contain", opacity: 0.9 }}
    />
  );
}

export default function MarqueeBar() {
  return (
    <section
      id="marquee"
      style={{
        background: "#ffffff",
        overflow: "hidden",
        padding: "6rem 0",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          gap: 80px;
          align-items: center;
          width: max-content;
          animation: marquee-scroll 35s linear infinite;
        }
      `}</style>

      {/* Header */}
      <div style={{ padding: "0 clamp(20px,4vw,40px) 4rem", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <div style={{ width: 24, height: 1, background: "#1D6FF2" }} />
          <span className="label" style={{ color: "rgba(0,0,0,0.4)" }}>Trusted By</span>
          <div style={{ width: 24, height: 1, background: "#1D6FF2" }} />
        </div>
        <h2 className="h-large" style={{ color: "#000000" }}>Our Clients</h2>
        <p style={{ color: "rgba(0,0,0,0.45)", fontFamily: "'Inter',sans-serif", fontSize: "0.875rem", marginTop: "0.5rem" }}>
          Brands we&apos;ve helped grow.
        </p>
      </div>

      {/* Infinite marquee */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Fade edges */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to right, #ffffff 0%, transparent 12%, transparent 88%, #ffffff 100%)",
        }} />

        {/* Two copies back-to-back — CSS animates the whole thing by -50% so it loops seamlessly */}
        <div className="marquee-track">
          {[...clients, ...clients].map((client, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: 140, flexShrink: 0 }}>
              <ClientLogo client={client} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
