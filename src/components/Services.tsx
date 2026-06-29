"use client";

import { useState, useRef } from "react";
import AnimatedList from "./AnimatedList";

const services = [
  {
    num: "01",
    title: "Performance Marketing",
    description:
      "Data-driven campaigns across Google, Meta, and TikTok that maximize ROI. From funnel architecture to creative testing - we scale what works and cut what doesn't.",
    color: "#1D6FF2",
    bg: "#EFF4FF",
  },
  {
    num: "02",
    title: "Brand Strategy & Design",
    description:
      "Full brand identities that resonate with your audience and stand the test of time. Positioning, visual systems, brand voice, and guidelines that unlock growth.",
    color: "#0B0B0B",
    bg: "#F5F5F5",
  },
  {
    num: "03",
    title: "Videography & Motion",
    description:
      "Cinematic commercial videos, social-first content, and motion graphics that capture attention in seconds. From concept to final cut - in-house.",
    color: "#C2410C",
    bg: "#FFF7ED",
  },
  {
    num: "04",
    title: "Web Development",
    description:
      "High-performance websites and web apps built with Next.js, React, and modern tooling. Pixel-perfect design implementation with Core Web Vitals in mind.",
    color: "#1D6FF2",
    bg: "#EFF4FF",
  },
  {
    num: "05",
    title: "AI Solutions & Automation",
    description:
      "Custom AI workflows, chatbots, and automation pipelines using OpenAI, Claude, n8n, and Make. We make AI practical and profitable for your business.",
    color: "#059669",
    bg: "#ECFDF5",
  },
  {
    num: "06",
    title: "Hiring Lead Generation",
    description:
      "We generate qualified hiring leads for companies looking to recruit top talent. Our in-house customer support team screens, filters, and delivers only the right candidates.",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
];

export default function Services() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const active = services[selectedIndex];
  const sectionRef = useRef<HTMLElement>(null);


  return (
    <section
      ref={sectionRef}
      id="services"
      className="pt-20 pb-16"
      style={{ backgroundColor: "#0B0B0B", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      <div
        className="max-w-[1400px] mx-auto w-full"
        style={{ paddingLeft: "clamp(20px,4vw,40px)", paddingRight: "clamp(20px,4vw,40px)" }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#1D6FF2]" />
              <span className="label text-white/40">What We Do</span>
            </div>
            <h2 className="h-large text-white">Services</h2>
          </div>
          <p className="max-w-xs text-white/50 leading-relaxed font-['Inter'] text-sm">
            End-to-end digital solutions that cover every touchpoint of your brand.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          {/* Left: animated list */}
          <div className="w-full md:w-1/2">
            <AnimatedList
              items={services.map((s) => s.title)}
              onItemSelect={(_, index) => setSelectedIndex(index)}
              showGradients={true}
              enableArrowNavigation={true}
              displayScrollbar={false}
              initialSelectedIndex={0}
              renderItem={(item, index, selected) => {
                const service = services[index];
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1.25rem 1.5rem",
                      borderRadius: 16,
                      background: selected ? service.bg : "transparent",
                      border: `1px solid ${selected ? "transparent" : "rgba(255,255,255,0.1)"}`,
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <span
                        style={{
                          fontFamily: "'Satoshi', sans-serif",
                          fontWeight: 900,
                          fontSize: "0.65rem",
                          letterSpacing: "0.12em",
                          color: selected ? service.color : "rgba(0,0,0,0.3)",
                          transition: "color 0.25s ease",
                        }}
                      >
                        {service.num}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Satoshi', sans-serif",
                          fontWeight: 800,
                          fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
                          color: selected ? service.color : "rgba(255,255,255,0.85)",
                          letterSpacing: "-0.02em",
                          transition: "color 0.25s ease",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: selected ? service.color : "transparent",
                        border: `1px solid ${selected ? service.color : "rgba(0,0,0,0.15)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.25s ease",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{
                          transform: selected ? "rotate(-45deg)" : "rotate(0deg)",
                          transition: "transform 0.25s ease",
                          stroke: selected ? "white" : "#0B0B0B",
                        }}
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                );
              }}
            />
          </div>

          {/* Right: sticky detail panel */}
          <div className="w-full md:w-1/2 md:sticky md:top-32">
            {/* Sticky note card */}
            <div
              style={{
                borderRadius: "4px 24px 24px 24px",
                background: active.bg,
                position: "relative",
                minHeight: 340,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "6px 6px 0px rgba(0,0,0,0.08), 0 20px 60px rgba(0,0,0,0.08)",
                transition: "background 0.3s ease",
              }}
            >
              {/* Top pin strip */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 6,
                  borderRadius: "4px 24px 0 0",
                  background: active.color,
                  transition: "background 0.3s ease",
                }}
              />

              {/* Folded corner */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 0,
                  height: 0,
                  borderStyle: "solid",
                  borderWidth: "0 0 40px 40px",
                  borderColor: `transparent transparent rgba(0,0,0,0.1) transparent`,
                }}
              />

              {/* Content */}
              <div style={{ padding: "2.5rem 2.5rem 0", marginTop: "0.5rem" }}>
                <span
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 900,
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    color: active.color,
                    display: "block",
                    marginBottom: "1rem",
                    transition: "color 0.3s ease",
                    opacity: 0.8,
                  }}
                >
                  {active.num}
                </span>
                <h3
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                    color: "#0B0B0B",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    margin: 0,
                  }}
                >
                  {active.title}
                </h3>
              </div>

              {/* Divider */}
              <div style={{ margin: "2rem 2.5rem", height: 1, background: "rgba(0,0,0,0.08)" }} />

              {/* Description */}
              <div style={{ padding: "0 2.5rem 2.5rem" }}>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.925rem",
                    color: "rgba(0,0,0,0.55)",
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {active.description}
                </p>

                {/* Tag */}
                <div
                  style={{
                    marginTop: "2rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "rgba(0,0,0,0.06)",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: 9999,
                    padding: "0.45rem 1rem",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: active.color,
                      transition: "background 0.3s ease",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      letterSpacing: "0.08em",
                      color: "rgba(0,0,0,0.4)",
                    }}
                  >
                    IN-HOUSE SERVICE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
