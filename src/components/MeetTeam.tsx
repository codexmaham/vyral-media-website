"use client";

import { useState } from "react";

const team = [
  {
    name: "Video Editor",
    role: "Lead Videographer & Editor",
    bio: "Cinematic storyteller with an eye for detail. Handles all production and post-production work.",
    initials: "VE",
    gradient: "linear-gradient(135deg, #1D6FF2, #06B6D4)",
    social: { linkedin: "#", instagram: "#" },
  },
  {
    name: "SEO Specialist",
    role: "Search & Growth Expert",
    bio: "Drives organic growth through technical SEO, content strategy, and on-page optimization across all platforms.",
    initials: "SE",
    gradient: "linear-gradient(135deg, #06B6D4, #7C3AED)",
    social: { linkedin: "#", instagram: "#" },
  },
  {
    name: "Web Developer",
    role: "Full-Stack & AI Automation",
    bio: "Builds high-performance websites, web apps, and AI-powered automation workflows using n8n, Make, and OpenAI.",
    initials: "WD",
    gradient: "linear-gradient(135deg, #7C3AED, #1D6FF2)",
    social: { linkedin: "#", instagram: "#" },
  },
  {
    name: "Marketing Strategist",
    role: "Performance Marketing Lead",
    bio: "Data-obsessed marketer running Meta, Google & TikTok campaigns that consistently 4x client ROI.",
    initials: "MS",
    gradient: "linear-gradient(135deg, #1D6FF2, #0B0B0B)",
    social: { linkedin: "#", instagram: "#" },
  },
];

export default function MeetTeam() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="team" style={{ backgroundColor: "#ffffff", padding: "6rem 0", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="max-w-[1400px] mx-auto" style={{ paddingLeft: "clamp(20px,4vw,40px)", paddingRight: "clamp(20px,4vw,40px)" }}>
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ width: 24, height: 1, background: "#1D6FF2" }} />
            <span className="label" style={{ color: "rgba(11,11,11,0.4)" }}>The People</span>
          </div>
          <h2 className="h-large" style={{ color: "#0B0B0B" }}>Meet the Team</h2>
          <p style={{ marginTop: "0.75rem", color: "rgba(11,11,11,0.4)", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.65, maxWidth: "26rem" }}>
            A small, focused team of specialists who care deeply about the work we put out.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(1,1fr)", gap: "1.5rem" }} className="team-grid">
          {team.map((member, i) => (
            <div
              key={member.name}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                border: "1px solid",
                borderColor: hoveredIdx === i ? "rgba(29,111,242,0.25)" : "#E8E8E8",
                borderRadius: "1.25rem",
                padding: "2rem",
                transition: "all 0.3s",
                transform: hoveredIdx === i ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hoveredIdx === i ? "0 12px 40px rgba(29,111,242,0.08)" : "none",
              }}
            >
              <div style={{ width: 68, height: 68, borderRadius: "50%", background: member.gradient, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "1.2rem", color: "#ffffff" }}>{member.initials}</span>
              </div>
              <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, color: "#0B0B0B", fontSize: "1.2rem", letterSpacing: "-0.02em", marginBottom: "0.2rem" }}>{member.name}</h3>
              <p className="label" style={{ color: "#1D6FF2", marginBottom: "0.875rem" }}>{member.role}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(11,11,11,0.5)", lineHeight: 1.65 }}>{member.bio}</p>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                {[
                  { href: member.social.linkedin, d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z", filled: true },
                  { href: member.social.instagram, d: null, filled: false },
                ].map((s, si) => (
                  <a key={si} href={s.href}
                    style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #E8E8E8", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(11,11,11,0.35)", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "#1D6FF2"; el.style.color = "#1D6FF2"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "#E8E8E8"; el.style.color = "rgba(11,11,11,0.35)"; }}
                  >
                    {si === 0 ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) { .team-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (min-width: 1024px) { .team-grid { grid-template-columns: repeat(4,1fr) !important; } }
      `}</style>
    </section>
  );
}
