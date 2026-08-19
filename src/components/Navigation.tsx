"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { scrollToSection } from "@/lib/scroll-to";
import Shuffle from "./Shuffle";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [ctaHover, setCtaHover] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", closeOnDesktop);
    closeOnDesktop();
    return () => mq.removeEventListener("change", closeOnDesktop);
  }, []);

  /* ── Which section am I in? ──────────────────────────────────────────── */
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    // Whichever section covers the middle of the viewport wins, so the
    // indicator tracks reading position rather than section entry.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive("#" + hit.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => io.observe(s));

    // Above the first section (hero) nothing should read as active.
    const clearAtTop = () => { if (window.scrollY < 120) setActive(null); };
    window.addEventListener("scroll", clearAtTop, { passive: true });

    return () => { io.disconnect(); window.removeEventListener("scroll", clearAtTop); };
  }, [pathname]);

  /* ── Slide the indicator under the active link ───────────────────────── */
  const moveIndicator = useCallback(() => {
    const bar = indicatorRef.current;
    if (!bar) return;

    const el = active ? linkRefs.current[active] : null;
    if (!el) {
      gsap.to(bar, { opacity: 0, duration: 0.25, ease: "power2.out" });
      return;
    }
    gsap.to(bar, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      opacity: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [active]);

  useEffect(() => { moveIndicator(); }, [moveIndicator]);

  useEffect(() => {
    window.addEventListener("resize", moveIndicator);
    return () => window.removeEventListener("resize", moveIndicator);
  }, [moveIndicator]);

  /* ── Magnetic CTA ────────────────────────────────────────────────────── */
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      // Pull a fraction of the way toward the cursor — enough to feel alive,
      // not enough to make the button hard to click.
      xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
    };
    const onLeave = () => { xTo(0); yTo(0); };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [pathname]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => scrollToSection(href), menuOpen ? 400 : 0);
  };

  // /portfolio ships its own header; rendering this one too stacked two bars
  // at top:0. Hooks above still run so their order stays stable.
  if (pathname !== "/") return null;

  const ctaStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: "'Satoshi',sans-serif",
    fontWeight: 600,
    fontSize: "0.82rem",
    color: "#ffffff",
    textDecoration: "none",
    padding: "0.72rem 1.35rem",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.35)",
    willChange: "transform",
    position: "relative",
    overflow: "hidden",
  };

  const mobileCtaStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.55rem",
    fontFamily: "'Satoshi',sans-serif",
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "#fff",
    textDecoration: "none",
    padding: "0.9rem 1.65rem",
    borderRadius: 10,
    background: "linear-gradient(135deg,#1D6FF2,#06B6D4)",
    boxShadow: "0 8px 30px rgba(29,111,242,0.35)",
  };

  return (
    <>
      <nav
        className={`absolute top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? "border-b border-white/10 backdrop-blur-md" : ""
        }`}
        style={scrolled ? { background: "rgba(7,7,20,0.72)" } : { background: "transparent" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem",
            height: 70,
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center z-10"
            aria-label="Vyral Media home"
          >
            <div className="vyral-brand-logo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/vyral-logo-nav.png" alt="Vyral Media" className="vyral-brand-logo" />
            </div>
          </a>

          {/* Desktop links + active indicator */}
          <div
            ref={listRef}
            className="nav-desktop-only"
            style={{ alignItems: "center", gap: "2rem", position: "relative" }}
          >
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  ref={(el) => { linkRefs.current[link.href] = el; }}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="label relative py-1"
                  style={{
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.62)",
                    transition: "color 320ms ease",
                  }}
                >
                  <Shuffle
                    text={link.label}
                    tag="span"
                    style={{
                      color: "inherit",
                      fontSize: "inherit",
                      fontFamily: "inherit",
                      fontWeight: "inherit",
                      letterSpacing: "inherit",
                    }}
                    shuffleDirection="up"
                    duration={0.3}
                    stagger={0.03}
                    animationMode="evenodd"
                    triggerOnce={false}
                    triggerOnHover={true}
                    threshold={0}
                    rootMargin="0px"
                    textAlign="left"
                  />
                </a>
              );
            })}

            {/* Slides between links as you scroll the page */}
            <span
              ref={indicatorRef}
              aria-hidden
              style={{
                position: "absolute",
                left: 0,
                bottom: -6,
                height: 2,
                width: 0,
                opacity: 0,
                borderRadius: 2,
                background: "linear-gradient(90deg,#1D6FF2,#06B6D4)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Desktop CTA */}
          <div className="nav-desktop-only" style={{ alignItems: "center", gap: "1rem" }}>
            <a
              ref={ctaRef}
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              style={ctaStyle}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  transformOrigin: "bottom",
                  transform: ctaHover ? "scaleY(1)" : "scaleY(0)",
                  transition: "transform 400ms ease-out",
                  background: "linear-gradient(135deg,#1D6FF2,#06B6D4)",
                }}
              />
              <span style={{ position: "relative", zIndex: 1 }}>Book a Call</span>
              <span
                style={{
                  position: "relative",
                  zIndex: 1,
                  transition: "transform 300ms ease",
                  transform: ctaHover ? "translateX(4px)" : "none",
                }}
              >
                →
              </span>
            </a>
          </div>

          {/* Mobile — Menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="nav-mobile-only"
            style={{
              alignItems: "center",
              gap: "0.65rem",
              cursor: "pointer",
              background: "transparent",
              border: "none",
              padding: 0,
              color: "#fff",
            }}
          >
            <span
              style={{
                fontFamily: "'Satoshi',sans-serif",
                fontWeight: 600,
                fontSize: "0.78rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              {menuOpen ? "Close" : "Menu"}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, width: 24 }}>
              <span
                style={{
                  display: "block",
                  height: 1,
                  width: menuOpen ? 24 : 24,
                  background: "#ffffff",
                  transition: "transform 300ms ease, opacity 300ms ease, width 300ms ease",
                  transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
                  transformOrigin: "center",
                }}
              />
              <span
                style={{
                  display: "block",
                  height: 1,
                  width: menuOpen ? 0 : 16,
                  background: "#ffffff",
                  opacity: menuOpen ? 0 : 1,
                  transition: "transform 300ms ease, opacity 300ms ease, width 300ms ease",
                }}
              />
              <span
                style={{
                  display: "block",
                  height: 1,
                  width: menuOpen ? 24 : 24,
                  background: "#ffffff",
                  transition: "transform 300ms ease, opacity 300ms ease, width 300ms ease",
                  transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
                  transformOrigin: "center",
                }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay menu */}
      <div
        className={`nav-mobile-overlay fixed inset-0 z-[99] ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{
          background: "#07071A",
          flexDirection: "column",
          justifyContent: "center",
          padding: "5.5rem 2rem 2.5rem",
          transition: "opacity 500ms ease",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                fontFamily: "'Satoshi',sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 9vw, 3.25rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                textDecoration: "none",
                color: active === link.href ? "#ffffff" : "rgba(255,255,255,0.38)",
                transform: menuOpen ? "translateY(0)" : "translateY(18px)",
                opacity: menuOpen ? 1 : 0,
                transition: "transform 520ms cubic-bezier(0.16,1,0.3,1), opacity 420ms ease, color 300ms ease",
                transitionDelay: menuOpen ? `${120 + i * 60}ms` : "0ms",
              }}
            >
              <span
                style={{
                  fontFamily: "'Satoshi',sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  color: "rgba(255,255,255,0.35)",
                  width: "1.75rem",
                  flexShrink: 0,
                }}
              >
                0{i + 1}
              </span>
              {link.label}
            </a>
          ))}
        </div>
        <div style={{ marginTop: "2.25rem" }}>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
            style={{
              ...mobileCtaStyle,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(18px)",
              transition: "transform 520ms cubic-bezier(0.16,1,0.3,1), opacity 420ms ease",
              transitionDelay: menuOpen ? `${120 + navLinks.length * 60}ms` : "0ms",
            }}
          >
            Book a Call
            <span>→</span>
          </a>
        </div>
      </div>
    </>
  );
}
