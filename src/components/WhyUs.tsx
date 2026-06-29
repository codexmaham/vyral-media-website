"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    num: "01",
    title: "Strategy First",
    description:
      "Every project starts with deep discovery. We research your market, competitors, and customers before a single pixel is designed or a single ad is launched.",
  },
  {
    num: "02",
    title: "$145K+ Ad Spend Managed",
    description:
      "In 2026 alone, we managed over $100,000 on Meta Ads and $45,000 on Google Ads — delivering measurable ROI for brands across real estate, F&B, healthcare, and e-commerce.",
  },
  {
    num: "03",
    title: "Hiring Lead Generation",
    description:
      "Beyond marketing, we generate qualified hiring leads for companies like Fazal Din Pharma. Our inhouse customer support team filters and qualifies every lead before it reaches you.",
  },
  {
    num: "04",
    title: "13-Person Expert Team",
    description:
      "A full-service team of 13 specialists — inhouse and remote — covering performance marketing, videography, web development, SEO, AI automation, and customer support.",
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".why-item");

      items.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          x: -40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
          },
        });
      });

      gsap.from(".why-heading", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why-us" style={{ backgroundColor: "#0B0B0B", paddingTop: "6rem", paddingBottom: "8rem", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="max-w-[1400px] mx-auto" style={{ paddingLeft: "clamp(20px,4vw,40px)", paddingRight: "clamp(20px,4vw,40px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }} className="md-grid-2">
          {/* Left heading */}
          <div className="why-heading">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "24px", height: "1px", backgroundColor: "#1D6FF2" }} />
              <span className="label" style={{ color: "rgba(255,255,255,0.3)" }}>Why Choose Us</span>
            </div>
            <h2 className="h-large" style={{ color: "#ffffff", lineHeight: 0.95 }}>
              Why brands choose us over everyone else.
            </h2>
            <p style={{ marginTop: "2rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.625, fontFamily: "'Inter', sans-serif", maxWidth: "24rem", fontSize: "0.875rem" }}>
              We&apos;ve turned around stagnant brands, launched new ones from zero, and scaled profitable ad accounts across every major platform.
            </p>
            <div style={{ marginTop: "3rem" }}>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 600,
                  padding: "0.875rem 1.5rem",
                  borderRadius: "9999px",
                  transition: "all 0.3s",
                  fontSize: "0.875rem",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#ffffff";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#0B0B0B";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                }}
              >
                Start a Conversation
              </a>
            </div>
          </div>

          {/* Right reasons */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {reasons.map((reason) => (
              <div
                key={reason.num}
                className="why-item"
                style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "2rem 0" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}>
                  <span className="label" style={{ color: "#1D6FF2", marginTop: "2px", flexShrink: 0 }}>{reason.num}</span>
                  <div>
                    <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, color: "#ffffff", fontSize: "1.375rem", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                      {reason.title}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", lineHeight: 1.625, fontFamily: "'Inter', sans-serif" }}>
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md-grid-2 { grid-template-columns: 1fr 1fr !important; gap: 6rem !important; }
        }
      `}</style>
    </section>
  );
}
