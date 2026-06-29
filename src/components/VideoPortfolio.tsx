"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01",
    title: "Al Noor Town",
    category: "Real Estate",
    tags: ["Performance Marketing", "Brand Strategy", "Web Development"],
    result: "3.8× Lead Generation",
    bg: "linear-gradient(135deg, #0f1f3d 0%, #1D6FF2 60%, #06B6D4 100%)",
  },
  {
    num: "02",
    title: "Saghir Sultan Group",
    category: "Branding",
    tags: ["Brand Identity", "Videography", "Social Media"],
    result: "Full Brand Overhaul",
    bg: "linear-gradient(135deg, #111111 0%, #1a1a2e 50%, #1D6FF2 100%)",
  },
  {
    num: "03",
    title: "Pizza Fort",
    category: "F&B",
    tags: ["Social Media", "Videography", "Web Development"],
    result: "2.1× Online Orders",
    bg: "linear-gradient(135deg, #3d0f00 0%, #F97316 60%, #EF4444 100%)",
  },
  {
    num: "04",
    title: "Yemek Doner",
    category: "F&B",
    tags: ["Brand Identity", "Photography", "Social Media"],
    result: "40K+ Instagram Growth",
    bg: "linear-gradient(135deg, #2d1500 0%, #D97706 60%, #F59E0B 100%)",
  },
  {
    num: "05",
    title: "Vynixo",
    category: "SaaS",
    tags: ["Web Development", "UI/UX", "Brand Strategy"],
    result: "Launched in 3 Weeks",
    bg: "linear-gradient(135deg, #1a003d 0%, #7C3AED 50%, #1D6FF2 100%)",
  },
  {
    num: "06",
    title: "Rowdyz",
    category: "Lifestyle",
    tags: ["Social Media", "Photography", "Videography"],
    result: "5× Engagement Rate",
    bg: "linear-gradient(135deg, #0d001a 0%, #7C3AED 50%, #EC4899 100%)",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    if (!section || !stack) return;

    const cards = gsap.utils.toArray<HTMLElement>(".portfolio-card");
    const total = cards.length;

    const ctx = gsap.context(() => {
      // Each card starts below, slides up and stacks — pinned section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${total * 600}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;

        // New card slides fully into view (y: 100% → 0%)
        tl.fromTo(
          card,
          { y: "100%", scale: 1 },
          { y: "0%", scale: 1, duration: 1, ease: "none" },
          i - 1
        );

        // Push all previous cards back into stack behind
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          tl.to(
            cards[j],
            {
              scale: 1 - depth * 0.04,
              y: `${depth * 15}px`,
              duration: 1,
              ease: "none",
            },
            i - 1
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      style={{
        backgroundColor: "#0B0B0B",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          paddingLeft: "clamp(20px,4vw,40px)",
          paddingRight: "clamp(20px,4vw,40px)",
          paddingTop: "5rem",
          paddingBottom: "4rem",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.3)" }} />
              <span className="label" style={{ color: "rgba(255,255,255,0.4)" }}>Our Work</span>
            </div>
            <h2 className="h-large" style={{ color: "#ffffff" }}>Portfolio</h2>
          </div>
          <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "22rem" }}>
            Real clients. Real results. Scroll through work that moved the needle.
          </p>
        </div>

        {/* Card stack */}
        <div
          ref={stackRef}
          style={{
            position: "relative",
            height: "clamp(320px, 50vh, 480px)",
          }}
        >
          {projects.map((project, i) => (
            <div
              key={project.num}
              className="portfolio-card"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 24,
                background: project.bg,
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transformOrigin: "top center",
                willChange: "transform",
                // Stack visually — cards start translated down
                transform: i === 0 ? "translateY(0)" : "translateY(100%)",
                zIndex: i + 1,
                overflow: "hidden",
              }}
            >
              {/* Top row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)" }}>
                    {project.num}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {project.title}
                    </h3>
                    <span style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ffffff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 9999, padding: "0.25rem 0.85rem", background: "rgba(255,255,255,0.1)" }}>
                      {project.category}
                    </span>
                  </div>
                </div>
                <div style={{ background: "rgba(0,0,0,0.35)", borderRadius: 12, padding: "0.6rem 1rem", border: "1px solid rgba(255,255,255,0.15)", flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>Result</div>
                  <div style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#ffffff" }}>{project.result}</div>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.03em", color: "rgba(255,255,255,0.7)", background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 9999, padding: "0.35rem 0.9rem" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
