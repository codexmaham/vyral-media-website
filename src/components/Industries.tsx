"use client";

const industries = [
  { name: "Healthcare", icon: "⊕", count: "12 Projects" },
  { name: "E-commerce", icon: "◈", count: "28 Projects" },
  { name: "Real Estate", icon: "⬡", count: "15 Projects" },
  { name: "SaaS", icon: "◎", count: "22 Projects" },
  { name: "Education", icon: "◑", count: "8 Projects" },
  { name: "Finance", icon: "◧", count: "10 Projects" },
  { name: "Hospitality", icon: "◉", count: "7 Projects" },
  { name: "Automotive", icon: "◈", count: "6 Projects" },
];

export default function Industries() {
  return (
    <section style={{ backgroundColor: "#F8F8F8", padding: "6rem 0" }}>
      <div className="max-w-[1400px] mx-auto" style={{ paddingLeft: "clamp(20px,4vw,40px)", paddingRight: "clamp(20px,4vw,40px)" }}>
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ width: 24, height: 1, background: "#1D6FF2" }} />
            <span className="label" style={{ color: "rgba(11,11,11,0.4)" }}>Expertise</span>
          </div>
          <h2 className="h-large" style={{ color: "#0B0B0B" }}>Industries</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }} className="industries-grid">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="industry-card"
              style={{
                border: "1px solid #D9D9D9",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                transition: "all 0.3s",
                cursor: "default",
                background: "#ffffff00",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(29,111,242,0.4)";
                el.style.background = "#ffffff";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "#D9D9D9";
                el.style.background = "#ffffff00";
              }}
            >
              <div style={{ fontSize: "1.875rem", marginBottom: "1rem", color: "rgba(11,11,11,0.2)", fontFamily: "monospace" }}>
                {industry.icon}
              </div>
              <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, color: "#0B0B0B", fontSize: "1.125rem", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
                {industry.name}
              </h3>
              <span className="label" style={{ color: "rgba(11,11,11,0.3)" }}>
                {industry.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .industries-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
