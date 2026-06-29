"use client";

import { useEffect, useRef, useState } from "react";

const techs = [
  {
    name: "MongoDB",
    category: "Database",
    color: "#00ED64",
    svg: (
      <svg viewBox="0 0 256 549" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 00-1.492 0c-4.048 5.759-23.863 33.487-46.874 60.788-197.507 251.896 31.108 421.89 31.108 421.89l1.917 1.28c1.704 26.234 5.966 64.18 5.966 64.18h17.045s4.26-37.725 5.965-64.18l1.917-1.28s228.612-169.994 31.321-421.89zm-47.726 438.29s-8.96-7.68-11.2-11.733v-.427l10.347-228.203c0-.853 1.493-.853 1.493 0l10.347 228.203v.427c-2.24 4.053-10.987 11.733-10.987 11.733z" fill="#00ED64"/>
      </svg>
    ),
  },
  {
    name: "Express",
    category: "Backend",
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 256 128" width="52" height="26" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0v128h256V0H0zm227.478 103.696c-5.136 5.136-11.584 7.804-19.956 7.804-6.5 0-12.532-1.876-17.516-5.472-4.984-3.596-8.632-8.58-10.508-14.612h55.764c.26-1.772.416-3.596.416-5.42 0-10.768-3.804-20.84-10.716-28.544-6.968-7.7-16.328-12.064-27.304-12.064-10.872 0-20.44 4.208-27.46 11.64-7.024 7.38-10.924 17.252-10.924 27.88 0 10.976 4.108 20.96 11.532 28.076 7.484 7.168 17.68 11.012 28.852 11.012 14.456 0 27.096-6.76 35.06-18.3l-7.24-2.0zm-92.36 8.476c-5.68 5.68-12.948 8.58-21.268 8.58-8.268 0-15.38-2.9-20.852-8.372-5.472-5.472-8.372-12.636-8.372-20.852V57.54h-13.04v33.988c0 11.636 3.96 21.76 11.48 29.28 7.52 7.524 17.64 11.588 29.284 11.588 11.428 0 21.508-4.108 29.024-11.588L141.118 91.528zm-62.492-46.148h-13.04V118.08h13.04V66.024zM128 24.96c-5.576 0-10.088 4.512-10.088 10.088S122.424 45.136 128 45.136s10.088-4.512 10.088-10.088S133.576 24.96 128 24.96z" fill="white"/>
      </svg>
    ),
  },
  {
    name: "React",
    category: "Frontend",
    color: "#61DAFB",
    svg: (
      <svg viewBox="0 0 256 256" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="128" cy="128" r="20" fill="#61DAFB"/>
        <ellipse cx="128" cy="128" rx="110" ry="42" fill="none" stroke="#61DAFB" strokeWidth="10"/>
        <ellipse cx="128" cy="128" rx="110" ry="42" fill="none" stroke="#61DAFB" strokeWidth="10" transform="rotate(60 128 128)"/>
        <ellipse cx="128" cy="128" rx="110" ry="42" fill="none" stroke="#61DAFB" strokeWidth="10" transform="rotate(120 128 128)"/>
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: "Runtime",
    color: "#8CC84B",
    svg: (
      <svg viewBox="0 0 256 289" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 0L0 72v144l128 72 128-72V72L128 0zm0 22.4l105.6 59.2v118.8L128 259.2 22.4 200.4V81.6L128 22.4z" fill="#8CC84B"/>
        <path d="M128 55.2L55.2 96v80l72.8 40.8 72.8-40.8V96L128 55.2zm0 20l54.4 30.4v61.6L128 196.8l-54.4-29.6V105.6L128 75.2z" fill="#8CC84B"/>
      </svg>
    ),
  },
  {
    name: "Next.js",
    category: "Framework",
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 256 256" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="128" cy="128" r="128" fill="white"/>
        <path d="M212.634 224.028L98.755 76.8H76.8v102.357h17.228V98.68l105.268 136.148a128.207 128.207 0 0013.338-10.8zM163.84 76.8h17.066v102.4H163.84z" fill="black"/>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    color: "#38BDF8",
    svg: (
      <svg viewBox="0 0 256 154" width="40" height="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z" fill="#38BDF8"/>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    category: "Language",
    color: "#3178C6",
    svg: (
      <svg viewBox="0 0 256 256" width="30" height="30" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" rx="20" fill="#3178C6"/>
        <path d="M150.5 200.5v27.4c4.5 2.3 9.8 4 15.9 5.2 6.1 1.2 12.5 1.8 19.2 1.8 6.5 0 12.7-.7 18.7-2 6-1.4 11.3-3.6 15.9-6.7 4.6-3.1 8.2-7.2 10.9-12.2 2.7-5 4-11.2 4-18.6 0-5.4-.8-10.1-2.4-14.1-1.6-4-3.9-7.5-6.9-10.6-3-3-6.6-5.8-10.8-8.2-4.2-2.4-8.9-4.7-14.1-6.9-3.8-1.6-7.2-3.1-10.1-4.7-2.9-1.5-5.3-3.1-7.3-4.7-2-1.6-3.5-3.4-4.5-5.3-1-1.9-1.5-4.1-1.5-6.5 0-2.2.5-4.2 1.4-5.9.9-1.7 2.3-3.2 4-4.4 1.7-1.2 3.8-2.1 6.2-2.7 2.4-.6 5.1-.9 8-.9 2.1 0 4.3.2 6.6.5 2.3.3 4.6.8 6.9 1.5 2.3.7 4.5 1.6 6.6 2.7 2.1 1.1 4 2.4 5.7 3.9v-25.6c-3.9-1.5-8.2-2.6-12.8-3.3-4.6-.7-9.7-1-15.3-1-6.4 0-12.5.8-18.3 2.3-5.8 1.5-10.9 3.9-15.3 7.1-4.4 3.2-7.9 7.2-10.5 12.1-2.6 4.9-3.9 10.7-3.9 17.5 0 8.7 2.5 16 7.6 22.1 5.1 6.1 12.8 11.3 23.3 15.6 4 1.6 7.7 3.2 11.1 4.8 3.4 1.6 6.3 3.3 8.8 5.1 2.5 1.8 4.4 3.8 5.8 6.1 1.4 2.3 2.1 4.9 2.1 7.9 0 2.1-.4 4-.1 5.8-.3 1.8-.9 3.4-1.8 4.8-.9 1.4-2.2 2.5-3.9 3.3-1.7.8-3.9 1.2-6.5 1.2-5.4 0-10.8-1-16.2-3.1-5.3-2.1-10.2-5.3-14.5-9.5zM93.3 101.6H128v-22H30v22h34.5V216h28.8V101.6z" fill="white"/>
      </svg>
    ),
  },
  {
    name: "GSAP",
    category: "Animation",
    color: "#88CE02",
    svg: (
      <svg viewBox="0 0 100 100" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#88CE02"/>
        <text x="50" y="62" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="28" fill="#0B0B0B">GSAP</text>
      </svg>
    ),
  },
  {
    name: "Framer Motion",
    category: "Animation",
    color: "#BB4BFF",
    svg: (
      <svg viewBox="0 0 14 21" width="24" height="36" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h14v7H7z" fill="#BB4BFF"/>
        <path d="M0 7h7l7 7H0z" fill="#BB4BFF" opacity=".7"/>
        <path d="M0 14h7v7z" fill="#BB4BFF" opacity=".4"/>
      </svg>
    ),
  },
  {
    name: "OpenAI",
    category: "AI",
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 41 41" width="30" height="30" xmlns="http://www.w3.org/2000/svg" fill="white">
        <path d="M37.532 16.87a9.963 9.963 0 00-.856-8.184 10.078 10.078 0 00-10.855-4.835 9.964 9.964 0 00-7.505-3.357 10.078 10.078 0 00-9.612 6.977 9.967 9.967 0 00-6.664 4.834 10.08 10.08 0 001.24 11.817 9.965 9.965 0 00.856 8.185 10.079 10.079 0 0010.855 4.835 9.965 9.965 0 007.504 3.357 10.078 10.078 0 009.617-6.981 9.967 9.967 0 006.663-4.834 10.079 10.079 0 00-1.243-11.814zM22.498 37.886a7.474 7.474 0 01-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 00.655-1.134V19.054l3.366 1.944a.12.12 0 01.066.092v9.299a7.505 7.505 0 01-7.49 7.496zM6.392 31.006a7.471 7.471 0 01-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 001.308 0l9.724-5.614v3.888a.12.12 0 01-.048.103l-8.051 4.649a7.504 7.504 0 01-10.24-2.744zM4.297 13.62A7.469 7.469 0 018.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 00.654 1.132l9.723 5.614-3.366 1.944a.12.12 0 01-.114.012L7.044 23.86a7.504 7.504 0 01-2.747-10.24zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 01.114-.012l8.048 4.648a7.498 7.498 0 01-1.158 13.528v-9.476a1.293 1.293 0 00-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 00-1.308 0l-9.723 5.614v-3.888a.12.12 0 01.048-.103l8.05-4.645a7.497 7.497 0 0111.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 01-.065-.092v-9.299a7.497 7.497 0 0112.293-5.756 6.94 6.94 0 00-.236.134l-7.965 4.6a1.294 1.294 0 00-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.498v4.996l-4.331 2.5-4.331-2.5V18z"/>
      </svg>
    ),
  },
  {
    name: "n8n",
    category: "Automation",
    color: "#EA4B71",
    svg: (
      <svg viewBox="0 0 60 60" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="60" rx="12" fill="#EA4B71"/>
        <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="18" fill="white">n8n</text>
      </svg>
    ),
  },
  {
    name: "Make",
    category: "Automation",
    color: "#6D4AFF",
    svg: (
      <svg viewBox="0 0 60 60" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="60" rx="12" fill="#6D4AFF"/>
        <text x="50%" y="56%" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="15" fill="white">Make</text>
      </svg>
    ),
  },
];

export default function TechStack() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section style={{ backgroundColor: "#0B0B0B", padding: "6rem 0", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="max-w-[1400px] mx-auto" style={{ paddingLeft: "clamp(20px,4vw,40px)", paddingRight: "clamp(20px,4vw,40px)" }}>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 24, height: 1, background: "#1D6FF2" }} />
            <span className="label" style={{ color: "rgba(255,255,255,0.3)" }}>Technology</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }} className="tech-header-row">
            <h2 className="h-large" style={{ color: "#ffffff" }}>Tech Stack</h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.65, maxWidth: "28rem" }}>
              MERN stack at the core, enhanced with modern frameworks, AI tools, and automation. No compromises on performance or scalability.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }} className="tech-grid">
          {techs.map((tech, i) => (
            <div
              key={tech.name}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                position: "relative",
                border: "1px solid",
                borderColor: hoveredIdx === i ? tech.color + "55" : "rgba(255,255,255,0.08)",
                borderRadius: "1rem",
                padding: "1.5rem",
                background: hoveredIdx === i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                transition: "all 0.25s",
                overflow: "hidden",
                cursor: "default",
              }}
            >
              {/* Glow dot */}
              <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: tech.color,
                opacity: hoveredIdx === i ? 0.08 : 0,
                filter: "blur(30px)",
                transition: "opacity 0.3s",
                pointerEvents: "none",
              }} />

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "0.75rem",
                  background: "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.25s",
                  ...(hoveredIdx === i ? { background: "rgba(255,255,255,0.1)" } : {}),
                }}>
                  {tech.svg}
                </div>
                <div>
                  <div style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, color: "#ffffff", fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
                    {tech.name}
                  </div>
                  <div className="label" style={{ color: "rgba(255,255,255,0.3)", marginTop: "0.1rem" }}>
                    {tech.category}
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: 2,
                width: hoveredIdx === i ? "100%" : "0%",
                background: tech.color,
                transition: "width 0.35s ease",
                borderRadius: "0 0 0 1rem",
              }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 480px) { .tech-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (min-width: 768px) { .tech-grid { grid-template-columns: repeat(4,1fr) !important; } }
        @media (min-width: 1024px) { .tech-grid { grid-template-columns: repeat(6,1fr) !important; } }
        @media (min-width: 768px) { .tech-header-row { flex-direction: row !important; align-items: flex-end !important; justify-content: space-between !important; } }
      `}</style>
    </section>
  );
}
