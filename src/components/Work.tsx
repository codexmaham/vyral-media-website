"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01",
    title: "Al Noor Town",
    client: "Ramsa Developers",
    category: "Real Estate",
    services: ["Performance Marketing", "Brand Strategy", "Web Development"],
    result: "3.8× Lead Generation Increase",
    bg: "#0B1A2E",
    accent: "#1D6FF2",
    tag: "Real Estate",
  },
  {
    num: "02",
    title: "Saghir Sultan Group",
    client: "Group of Companies",
    category: "Corporate",
    services: ["Brand Identity", "Videography", "Social Media"],
    result: "Est. 1989 — Legacy Brand Refresh",
    bg: "#1A1200",
    accent: "#C9A84C",
    tag: "Branding",
  },
  {
    num: "03",
    title: "Pizza Fort",
    client: "F&B Chain",
    category: "Food & Beverage",
    services: ["Meta Ads", "Content Production", "Web Development"],
    result: "4.2× ROAS on Meta Ads",
    bg: "#200505",
    accent: "#E03030",
    tag: "F&B",
  },
  {
    num: "04",
    title: "Rowdyz",
    client: "Lifestyle Brand",
    category: "Lifestyle",
    services: ["E-commerce", "Social Campaigns", "Video Production"],
    result: "18M+ Organic Reach",
    bg: "#0F0F00",
    accent: "#D4C000",
    tag: "Lifestyle",
  },
  {
    num: "05",
    title: "Vynixo",
    client: "US Based SaaS",
    category: "Technology",
    services: ["Web Development", "AI Automation", "Growth Strategy"],
    result: "60% Ops Cost Reduction",
    bg: "#060614",
    accent: "#7C3AED",
    tag: "SaaS",
  },
  {
    num: "06",
    title: "Fazal Din's Pharma",
    client: "Pharma Plus",
    category: "Healthcare",
    services: ["Hiring Leads", "Digital Marketing", "Brand Strategy"],
    result: "200+ Qualified Hires Generated",
    bg: "#030A18",
    accent: "#06B6D4",
    tag: "Healthcare",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each project row animates in as it enters viewport
      gsap.utils.toArray<HTMLElement>(".work-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      // Heading slide in
      gsap.fromTo(
        ".work-heading",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" style={{ background: "#0B0B0B", padding: "6rem 0" }}>
      <div className="max-w-[1400px] mx-auto" style={{ paddingLeft: "clamp(20px,4vw,40px)", paddingRight: "clamp(20px,4vw,40px)" }}>

        {/* Header */}
        <div className="work-heading" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "5rem", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 24, height: 1, background: "#1D6FF2" }} />
            <span className="label" style={{ color: "rgba(255,255,255,0.3)" }}>Portfolio</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }} className="work-head-row">
            <h2 className="h-large" style={{ color: "#ffffff" }}>Selected Work</h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "26rem" }}>
              Real clients. Real results. A curated look at work that moved the needle.
            </p>
          </div>
        </div>

        {/* Projects list */}
        <div>
          {projects.map((project, i) => (
            <div
              key={project.num}
              className="work-row"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                opacity: 0,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                padding: "2.5rem 0",
                display: "grid",
                gridTemplateColumns: "80px 1fr auto",
                alignItems: "center",
                gap: "2rem",
                cursor: "pointer",
                transition: "background 0.3s",
                background: hoveredIdx === i ? "rgba(255,255,255,0.03)" : "transparent",
                borderRadius: hoveredIdx === i ? "1rem" : "0",
                paddingLeft: hoveredIdx === i ? "1.5rem" : "0",
                paddingRight: hoveredIdx === i ? "1.5rem" : "0",
              }}
            >
              {/* Number */}
              <span style={{
                fontFamily: "'Satoshi',sans-serif",
                fontWeight: 900,
                fontSize: "0.75rem",
                color: hoveredIdx === i ? project.accent : "rgba(255,255,255,0.2)",
                letterSpacing: "0.1em",
                transition: "color 0.3s",
              }}>
                {project.num}
              </span>

              {/* Content */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }} className="work-row-content">
                {/* Top row: title + services */}
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                  <h3 style={{
                    fontFamily: "'Satoshi',sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.4rem,3vw,2.2rem)",
                    color: "#ffffff",
                    letterSpacing: "-0.03em",
                    transition: "color 0.3s",
                    lineHeight: 1,
                  }}>
                    {project.title}
                  </h3>
                  <span style={{
                    fontFamily: "'Satoshi',sans-serif",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: project.accent,
                    background: `${project.accent}18`,
                    border: `1px solid ${project.accent}30`,
                    padding: "0.2rem 0.75rem",
                    borderRadius: "9999px",
                  }}>
                    {project.tag}
                  </span>
                </div>

                {/* Services chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {project.services.map((s) => (
                    <span key={s} style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.35)",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "9999px",
                    }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Result — visible on hover */}
                <div style={{
                  maxHeight: hoveredIdx === i ? "40px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingTop: "0.4rem" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: project.accent, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                      {project.result}
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: `1px solid ${hoveredIdx === i ? project.accent : "rgba(255,255,255,0.12)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: hoveredIdx === i ? project.accent : "transparent",
                transition: "all 0.3s",
                transform: hoveredIdx === i ? "rotate(-45deg)" : "rotate(0deg)",
                flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}

          {/* Last border */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        </div>

        {/* View all CTA */}
        <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              fontFamily: "'Satoshi',sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"; }}
          >
            Start Your Project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .work-head-row { flex-direction: row !important; align-items: flex-end !important; justify-content: space-between !important; }
          .work-row { grid-template-columns: 80px 1fr auto !important; }
        }
        @media (max-width: 640px) {
          .work-row { grid-template-columns: 48px 1fr auto !important; gap: 1rem !important; }
        }
      `}</style>
    </section>
  );
}
