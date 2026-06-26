"use client";

import { useState } from "react";
import Image from "next/image";

const footerLinks = {
  Services: [
    "Performance Marketing",
    "Brand Strategy",
    "Videography",
    "Web Development",
    "AI Solutions",
  ],
  Company: ["About", "Work", "Process", "Careers", "Blog"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const socials = [
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Twitter/X", href: "#" },
  { name: "Behance", href: "#" },
];

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <footer style={{ backgroundColor: "#0B0B0B", paddingTop: "7rem", paddingBottom: "2.5rem" }}>
      <div className="max-w-[1400px] mx-auto" style={{ paddingLeft: "clamp(20px,4vw,40px)", paddingRight: "clamp(20px,4vw,40px)" }}>
        {/* Big CTA */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "4rem", marginBottom: "4rem" }}>
          <p className="label" style={{ color: "rgba(255,255,255,0.3)", marginBottom: "1.5rem" }}>Have a project in mind?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }} className="footer-cta-row">
            <h2
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                fontSize: "clamp(40px, 6vw, 90px)",
              }}
            >
              Let&apos;s Talk.
            </h2>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#ffffff",
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 600,
                padding: "1rem 2rem",
                borderRadius: "9999px",
                transition: "all 0.3s",
                width: "fit-content",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.backgroundColor = "#ffffff"; el.style.color = "#0B0B0B"; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.backgroundColor = "transparent"; el.style.color = "#ffffff"; }}
            >
              Book a Discovery Call
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          <a href="mailto:info@vyralmedia.net" style={{ marginTop: "1.5rem", display: "block", color: "#1D6FF2", fontFamily: "'Inter', sans-serif", fontSize: "1.125rem", width: "fit-content" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none"; }}
          >
            info@vyralmedia.net
          </a>
        </div>

        {/* Links grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2.5rem", marginBottom: "4rem" }} className="footer-links-grid">
          {/* Logo column */}
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <Image src="/vyral-icon.png" alt="Vyral Media" width={44} height={44} className="object-contain" />
              <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 900, fontSize: "1.25rem", color: "#ffffff", letterSpacing: "-0.03em" }}>VYRAL MEDIA</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", fontFamily: "'Inter', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Driven by Data, Powered by Ideas
            </p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.875rem", fontFamily: "'Inter', sans-serif", lineHeight: 1.625, maxWidth: "20rem", marginBottom: "1rem" }}>
              Premium digital agency building brands that people remember and businesses that grow.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", fontFamily: "'Inter', sans-serif" }}>Founded by Muttahir Imtiaz</p>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", fontFamily: "'Inter', sans-serif" }}>Sultan Plaza, Ghanta Ghar Chowk, Sialkot Cantt</p>
              <a href="mailto:info@vyralmedia.net" style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", fontFamily: "'Inter', sans-serif" }}>info@vyralmedia.net</a>
              <a href="tel:+923117689887" style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", fontFamily: "'Inter', sans-serif" }}>+92 311 768 9887</a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="label" style={{ color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>{category}</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{ color: hoveredLink === `${category}-${link}` ? "#ffffff" : "rgba(255,255,255,0.5)", fontSize: "0.875rem", fontFamily: "'Inter', sans-serif", transition: "color 0.2s" }}
                      onMouseEnter={() => setHoveredLink(`${category}-${link}`)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem" }} className="footer-bottom-row">
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", fontFamily: "'Inter', sans-serif" }}>
            © {new Date().getFullYear()} Vyral Media. All rights reserved.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                style={{ fontSize: "0.75rem", fontFamily: "'Inter', sans-serif", transition: "color 0.2s", color: hoveredSocial === social.name ? "#1D6FF2" : "rgba(255,255,255,0.3)" }}
                onMouseEnter={() => setHoveredSocial(social.name)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                {social.name}
              </a>
            ))}
          </div>

          <p style={{ color: "rgba(255,255,255,0.1)", fontSize: "0.75rem", fontFamily: "'Inter', sans-serif" }}>Crafted with precision.</p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-cta-row { flex-direction: row !important; align-items: center !important; justify-content: space-between !important; }
          .footer-links-grid { grid-template-columns: repeat(5, 1fr) !important; }
          .footer-links-grid > div:first-child { grid-column: span 2 !important; }
          .footer-bottom-row { flex-direction: row !important; justify-content: space-between !important; }
        }
      `}</style>
    </footer>
  );
}
