"use client";

import { useState } from "react";

const videoProjects = [
  {
    id: 1,
    title: "Al Noor Town - Brand Film",
    category: "Real Estate",
    duration: "2:34",
    url: "#",
  },
  {
    id: 2,
    title: "Pizza Fort - Launch Campaign",
    category: "F&B",
    duration: "0:45",
    url: "#",
  },
  {
    id: 3,
    title: "Rowdyz - Social Reel",
    category: "Lifestyle",
    duration: "0:30",
    url: "#",
  },
  {
    id: 4,
    title: "Lasania Medical - Corporate",
    category: "Healthcare",
    duration: "3:10",
    url: "#",
  },
  {
    id: 5,
    title: "Yemek Doner - Product Shoot",
    category: "F&B",
    duration: "1:05",
    url: "#",
  },
  {
    id: 6,
    title: "Vynixo - Tech Promo",
    category: "SaaS",
    duration: "1:20",
    url: "#",
  },
];

const webProjects = [
  {
    id: 1,
    title: "Vynixo",
    desc: "SaaS platform with AI-powered workflows, real-time dashboard, and custom onboarding.",
    tags: ["Next.js", "TypeScript", "Supabase"],
    category: "SaaS",
    gradient: "linear-gradient(135deg, #1D6FF2 0%, #7C3AED 100%)",
    url: "#",
  },
  {
    id: 2,
    title: "Al Noor Town",
    desc: "Real estate landing page with property listings, booking system, and WhatsApp CTA flow.",
    tags: ["React", "Tailwind", "Node.js"],
    category: "Real Estate",
    gradient: "linear-gradient(135deg, #06B6D4 0%, #1D6FF2 100%)",
    url: "#",
  },
  {
    id: 3,
    title: "Pizza Fort",
    desc: "Restaurant website with interactive menu, online ordering, and loyalty program integration.",
    tags: ["Next.js", "MongoDB", "Stripe"],
    category: "F&B",
    gradient: "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
    url: "#",
  },
  {
    id: 4,
    title: "Lasania Medical",
    desc: "Healthcare clinic website with appointment booking, doctor profiles, and patient portal.",
    tags: ["React", "Express", "MySQL"],
    category: "Healthcare",
    gradient: "linear-gradient(135deg, #10B981 0%, #06B6D4 100%)",
    url: "#",
  },
  {
    id: 5,
    title: "Rowdyz",
    desc: "Lifestyle brand e-commerce store with custom product builder and influencer affiliate system.",
    tags: ["Next.js", "Shopify", "Tailwind"],
    category: "E-commerce",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
    url: "#",
  },
  {
    id: 6,
    title: "ABS Developers",
    desc: "Property developer portal with project showcases, floor plan viewer, and lead capture.",
    tags: ["React", "Node.js", "MongoDB"],
    category: "Real Estate",
    gradient: "linear-gradient(135deg, #0B0B0B 0%, #1D6FF2 100%)",
    url: "#",
  },
];

const videoCategories = ["All", "Real Estate", "F&B", "Lifestyle", "Healthcare", "SaaS"];
const webCategories = ["All", "SaaS", "Real Estate", "F&B", "Healthcare", "E-commerce"];

const videoGradients = [
  "linear-gradient(135deg, #1D6FF2 0%, #06B6D4 100%)",
  "linear-gradient(135deg, #0B0B0B 0%, #1D6FF2 100%)",
  "linear-gradient(135deg, #06B6D4 0%, #7C3AED 100%)",
  "linear-gradient(135deg, #7C3AED 0%, #1D6FF2 100%)",
  "linear-gradient(135deg, #1D6FF2 0%, #0B0B0B 100%)",
  "linear-gradient(135deg, #06B6D4 0%, #0B0B0B 100%)",
];

export default function Portfolio() {
  const [tab, setTab] = useState<"video" | "web">("video");
  const [videoFilter, setVideoFilter] = useState("All");
  const [webFilter, setWebFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredVideos = videoFilter === "All" ? videoProjects : videoProjects.filter(v => v.category === videoFilter);
  const filteredWeb = webFilter === "All" ? webProjects : webProjects.filter(w => w.category === webFilter);

  return (
    <section style={{ backgroundColor: "#0B0B0B", padding: "6rem 0" }}>
      <div className="max-w-[1400px] mx-auto" style={{ paddingLeft: "clamp(20px,4vw,40px)", paddingRight: "clamp(20px,4vw,40px)" }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ width: 24, height: 1, background: "#1D6FF2" }} />
            <span className="label" style={{ color: "rgba(255,255,255,0.3)" }}>Our Work</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }} className="port-header-row">
            <h2 className="h-large" style={{ color: "#ffffff" }}>Portfolio</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: "28rem" }}>
              Real work. Real results. From cinematic films to high-performance websites.
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: "0.375rem", marginBottom: "2rem", background: "rgba(255,255,255,0.05)", borderRadius: "9999px", padding: "0.25rem", width: "fit-content" }}>
          {(["video", "web"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "0.5rem 1.5rem",
                borderRadius: "9999px",
                border: "none",
                background: tab === t ? "#1D6FF2" : "transparent",
                color: tab === t ? "#ffffff" : "rgba(255,255,255,0.4)",
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.25s",
              }}
            >
              {t === "video" ? "Video" : "Web Dev"}
            </button>
          ))}
        </div>

        {/* --- VIDEO TAB --- */}
        {tab === "video" && (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
              {videoCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setVideoFilter(cat)}
                  style={{
                    padding: "0.4rem 1.1rem",
                    borderRadius: "9999px",
                    border: "1px solid",
                    borderColor: videoFilter === cat ? "#1D6FF2" : "rgba(255,255,255,0.12)",
                    background: videoFilter === cat ? "#1D6FF2" : "transparent",
                    color: videoFilter === cat ? "#ffffff" : "rgba(255,255,255,0.45)",
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.25s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(1,1fr)", gap: "1rem" }} className="video-grid">
              {filteredVideos.map((video, i) => (
                <div
                  key={video.id}
                  onMouseEnter={() => setHoveredId(video.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    position: "relative",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    aspectRatio: "16/9",
                    background: videoGradients[i % videoGradients.length],
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    transform: hoveredId === video.id ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.3s",
                      transform: hoveredId === video.id ? "scale(1.15)" : "scale(1)",
                    }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M6 4l9 5-9 5V4z" fill="#ffffff"/>
                      </svg>
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem", background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                      <div>
                        <span className="label" style={{ color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.25rem" }}>{video.category}</span>
                        <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, color: "#ffffff", fontSize: "1rem", letterSpacing: "-0.01em" }}>{video.title}</h3>
                      </div>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", flexShrink: 0 }}>{video.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* --- WEB DEV TAB --- */}
        {tab === "web" && (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
              {webCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setWebFilter(cat)}
                  style={{
                    padding: "0.4rem 1.1rem",
                    borderRadius: "9999px",
                    border: "1px solid",
                    borderColor: webFilter === cat ? "#1D6FF2" : "rgba(255,255,255,0.12)",
                    background: webFilter === cat ? "#1D6FF2" : "transparent",
                    color: webFilter === cat ? "#ffffff" : "rgba(255,255,255,0.45)",
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.25s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(1,1fr)", gap: "1.25rem" }} className="web-grid">
              {filteredWeb.map((project) => (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredId(project.id + 100)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    border: "1px solid",
                    borderColor: hoveredId === project.id + 100 ? "rgba(29,111,242,0.3)" : "rgba(255,255,255,0.08)",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    transition: "all 0.3s",
                    transform: hoveredId === project.id + 100 ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: hoveredId === project.id + 100 ? "0 16px 48px rgba(29,111,242,0.1)" : "none",
                  }}
                >
                  {/* Gradient preview */}
                  <div style={{ height: 160, background: project.gradient, position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
                    {/* Browser chrome mockup */}
                    <div style={{ position: "absolute", top: 16, left: 16, right: 16, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ display: "flex", gap: "0.3rem" }}>
                        {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
                      </div>
                      <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: "0.25rem", height: 14, marginLeft: "0.25rem" }} />
                    </div>
                    <div style={{ position: "absolute", bottom: 16, right: 16 }}>
                      <span className="label" style={{ color: "rgba(255,255,255,0.5)" }}>{project.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "1.5rem", background: "rgba(255,255,255,0.03)" }}>
                    <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, color: "#ffffff", fontSize: "1.2rem", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>{project.title}</h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: "1.25rem" }}>{project.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {project.tags.map(tag => (
                        <span key={tag} style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.04em", color: "#1D6FF2", background: "rgba(29,111,242,0.1)", border: "1px solid rgba(29,111,242,0.2)", borderRadius: "9999px", padding: "0.2rem 0.65rem" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        @media (min-width: 640px) { .video-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (min-width: 1024px) { .video-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (min-width: 640px) { .web-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (min-width: 1024px) { .web-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (min-width: 768px) { .port-header-row { flex-direction: row !important; align-items: flex-end !important; justify-content: space-between !important; } }
      `}</style>
    </section>
  );
}
