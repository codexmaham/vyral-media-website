"use client";

const clients = [
  { name: "Al Noor Town", sub: "Ramsa Developers" },
  { name: "ABS Developers", sub: null },
  { name: "Saghir Sultan Co.", sub: null },
  { name: "Pizza Fort", sub: null },
  { name: "Pizza Bites & Cafe", sub: null },
  { name: "Rowdyz", sub: null },
  { name: "Lasania Medical", sub: "Complex" },
  { name: "Yemek Doner", sub: "& Coffee" },
  { name: "Rahim Impex", sub: null },
  { name: "Vynixo", sub: "US Based" },
  { name: "Guy Leroy", sub: "@iknowrealty" },
];

export default function MarqueeBar() {
  return (
    <section style={{
      background: "linear-gradient(135deg, #0a0a0a 0%, #0f1a2e 50%, #0a0a0a 100%)",
      overflow: "hidden",
      borderTop: "1px solid rgba(29,111,242,0.15)",
      borderBottom: "1px solid rgba(29,111,242,0.15)",
      padding: "2.5rem 0",
      position: "relative",
    }}>
      {/* Glow line top */}
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
        background: "linear-gradient(90deg, transparent, #1D6FF2, #06B6D4, transparent)",
      }} />

      {/* Trusted by */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
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
          position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", zIndex: 2,
          background: "linear-gradient(90deg, #0a0a0a, transparent)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", zIndex: 2,
          background: "linear-gradient(270deg, #0a0a0a, transparent)",
          pointerEvents: "none",
        }} />

        <div style={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div className="marquee-track" style={{ display: "flex", alignItems: "center", minWidth: "max-content", gap: "0" }}>
            {[...clients, ...clients].map((client, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                {/* Client card */}
                <div style={{
                  padding: "0 2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                }}>
                  <span style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "#ffffff",
                    whiteSpace: "nowrap",
                    letterSpacing: "-0.01em",
                  }}>
                    {client.name}
                  </span>
                  {client.sub && (
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.6rem",
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}>
                      {client.sub}
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div style={{
                  width: "1px",
                  height: "28px",
                  background: "linear-gradient(to bottom, transparent, rgba(29,111,242,0.5), transparent)",
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
    </section>
  );
}
