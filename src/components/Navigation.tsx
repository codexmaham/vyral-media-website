"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
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
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  const listRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const ctaRef = useRef<HTMLAnchorElement>(null);

  /* ── Show/hide on scroll ─────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastScrollY.current && y > 200 && !menuOpen);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, menuOpen ? 400 : 0);
  };

  // /portfolio ships its own header; rendering this one too stacked two bars
  // at top:0. Hooks above still run so their order stays stable.
  if (pathname !== "/") return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "border-b border-white/10 backdrop-blur-md" : ""}`}
        style={scrolled ? { background: "rgba(7,7,20,0.72)" } : { background: "transparent" }}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-[70px]">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 z-10"
          >
            <Image src="/vyral-icon.png" alt="Vyral Media" width={40} height={40} className="object-contain" />
            <Shuffle
              text="VYRAL."
              tag="span"
              className="font-['Satoshi'] font-black text-lg tracking-[-0.03em] hidden sm:block"
              style={{ color: "#ffffff" }}
              shuffleDirection="up"
              duration={0.4}
              stagger={0.04}
              animationMode="evenodd"
              triggerOnce={false}
              triggerOnHover={true}
              threshold={0}
              rootMargin="0px"
              textAlign="left"
            />
          </a>

          {/* Desktop links + active indicator */}
          <div ref={listRef} className="hidden md:flex items-center gap-8 relative">
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
          <div className="hidden md:flex items-center gap-4">
            <a
              ref={ctaRef}
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="group relative flex items-center gap-2 label px-5 py-3 rounded-full overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.35)", color: "#ffffff", willChange: "transform" }}
            >
              {/* Gradient wipes up from the bottom on hover */}
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-400 ease-out group-hover:scale-y-100"
                style={{ background: "linear-gradient(135deg,#1D6FF2,#06B6D4)" }}
              />
              <span className="relative z-10">Book a Call</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Mobile/Tablet — Menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center gap-2.5 cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className="font-['Satoshi'] font-medium text-sm tracking-[0.12em] uppercase"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              {menuOpen ? "Close" : "Menu"}
            </span>
            <div className="flex flex-col gap-[5px] w-6">
              <span className={`block h-px transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px] w-6" : "w-6"}`} style={{ background: "#ffffff" }} />
              <span className={`block h-px transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-4"}`} style={{ background: "#ffffff" }} />
              <span className={`block h-px transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px] w-6" : "w-6"}`} style={{ background: "#ffffff" }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile/Tablet fullscreen overlay menu */}
      <div
        className={`fixed inset-0 z-[99] flex flex-col justify-center px-8 transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "#07071A" }}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="font-['Satoshi'] font-black text-[clamp(2.5rem,8vw,4rem)] leading-tight tracking-[-0.03em] flex items-center gap-4"
              style={{
                color: active === link.href ? "#ffffff" : "rgba(255,255,255,0.15)",
                transform: menuOpen ? "translateY(0)" : "translateY(18px)",
                opacity: menuOpen ? 1 : 0,
                transition: "transform 520ms cubic-bezier(0.16,1,0.3,1), opacity 420ms ease, color 300ms ease",
                transitionDelay: menuOpen ? `${120 + i * 60}ms` : "0ms",
              }}
            >
              <span className="text-xs font-normal tracking-widest opacity-40 w-6">0{i + 1}</span>
              {link.label}
            </a>
          ))}
        </div>
        <div className="mt-10 flex items-center gap-6">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
            className="label px-6 py-3 rounded-full"
            style={{
              background: "#ffffff",
              color: "#07071A",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(18px)",
              transition: "transform 520ms cubic-bezier(0.16,1,0.3,1), opacity 420ms ease",
              transitionDelay: menuOpen ? `${120 + navLinks.length * 60}ms` : "0ms",
            }}
          >
            Book a Call →
          </a>
        </div>
      </div>
    </>
  );
}
