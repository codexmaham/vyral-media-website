"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Nexus Health",
    category: "Branding + Web",
    result: "3.2× Patient Acquisition",
    bg: "#1A2B4A",
    accent: "#4A90D9",
    year: "2024",
  },
  {
    title: "Orbit Commerce",
    category: "Performance Marketing",
    result: "$2.4M Revenue in 90 Days",
    bg: "#2A1A0A",
    accent: "#D97B4A",
    year: "2024",
  },
  {
    title: "Luminary SaaS",
    category: "Brand Strategy + UI",
    result: "440% Trial Signups",
    bg: "#0A2A1A",
    accent: "#4AD98A",
    year: "2023",
  },
  {
    title: "Apex Realty",
    category: "Video + Social",
    result: "18M Organic Views",
    bg: "#2A0A1A",
    accent: "#D94A90",
    year: "2023",
  },
  {
    title: "Ember Skincare",
    category: "E-commerce + Email",
    result: "8× ROAS",
    bg: "#1A1A0A",
    accent: "#D9C44A",
    year: "2024",
  },
  {
    title: "Synapse AI",
    category: "AI Solutions + Web",
    result: "60% Ops Cost Reduction",
    bg: "#0A1A2A",
    accent: "#4AD9D9",
    year: "2024",
  },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="work-card group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: project.bg }}
    >
      {/* Abstract visual fill */}
      <div className="absolute inset-0">
        {/* Main accent circle */}
        <div
          className="absolute rounded-full transition-all duration-700"
          style={{
            width: hovered ? "140%" : "80%",
            height: hovered ? "140%" : "80%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${project.accent}15 0%, transparent 70%)`,
          }}
        />
        {/* Geometric shapes */}
        <div
          className="absolute border rounded-full transition-all duration-500"
          style={{
            width: 200,
            height: 200,
            top: "20%",
            right: "-10%",
            borderColor: `${project.accent}30`,
            transform: hovered ? "scale(1.2) rotate(15deg)" : "scale(1) rotate(0deg)",
          }}
        />
        <div
          className="absolute transition-all duration-700"
          style={{
            width: 120,
            height: 120,
            bottom: "15%",
            left: "10%",
            borderLeft: `1px solid ${project.accent}20`,
            borderTop: `1px solid ${project.accent}20`,
            transform: hovered ? "rotate(60deg)" : "rotate(0deg)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 8,
            height: 8,
            top: "30%",
            left: "30%",
            backgroundColor: project.accent,
            opacity: 0.6,
            transition: "transform 0.5s",
            transform: hovered ? "scale(3)" : "scale(1)",
          }}
        />
      </div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-7">
        <div
          className="transition-all duration-400"
          style={{ transform: hovered ? "translateY(0)" : "translateY(10px)", opacity: hovered ? 1 : 0.8 }}
        >
          <span className="label text-white/40 mb-2 block">{project.year} - {project.category}</span>
          <h3 className="font-['Satoshi'] font-black text-white text-2xl md:text-3xl tracking-[-0.02em] mb-3">
            {project.title}
          </h3>
          <div
            className="transition-all duration-400 overflow-hidden"
            style={{ maxHeight: hovered ? "60px" : "0px", opacity: hovered ? 1 : 0 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
              <span className="text-white/60 text-sm font-['Inter']">{project.result}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div
        className="absolute top-6 right-6 w-9 h-9 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: hovered ? project.accent : "transparent",
          borderColor: hovered ? project.accent : "rgba(255,255,255,0.2)",
          transform: hovered ? "rotate(-45deg)" : "rotate(0deg)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M7 3l4 4-4 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-card", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="bg-[#F8F8F8] py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#1D6FF2]" />
              <span className="label text-[#0B0B0B]/40">Portfolio</span>
            </div>
            <h2 className="h-large text-[#0B0B0B]">Selected Work</h2>
          </div>
          <p className="max-w-xs text-[#0B0B0B]/40 text-sm leading-relaxed font-['Inter']">
            A curated selection of projects that moved the needle for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
