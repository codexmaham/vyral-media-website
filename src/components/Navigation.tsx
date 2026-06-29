"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastScrollY.current && y > 200);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "border-b border-white/10" : "bg-transparent"}`}
        style={scrolled ? {
          backgroundImage: "linear-gradient(rgba(7,7,20,0.2), rgba(7,7,20,0.2)), url('/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        } : {}}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-[70px]">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 z-10"
          >
            <Image src="/vyral-icon.png" alt="Vyral Media" width={40} height={40} className="object-contain" />
            <span className="font-['Satoshi'] font-black text-lg tracking-[-0.03em] hidden sm:block" style={{ color: "#ffffff" }}>
              VYRAL<span style={{ background: "linear-gradient(135deg,#1D6FF2,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>.</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="label transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="hidden md:flex items-center gap-2 label px-5 py-3 rounded-full transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.35)", color: "#ffffff" }}
            >
              Book a Call
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 w-6 cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className={`h-px transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[10px] w-6" : "w-6"}`} style={{ background: "#ffffff" }} />
              <span className={`h-px transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-4"}`} style={{ background: "#ffffff" }} />
              <span className={`h-px transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[10px] w-6" : "w-6"}`} style={{ background: "#ffffff" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[99] bg-[#0B0B0B] flex flex-col justify-center px-8 transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="mb-12">
          <Image src="/vyral-icon.png" alt="Vyral Media" width={60} height={60} className="object-contain" />
        </div>
        <nav className="flex flex-col gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="font-['Satoshi'] font-black text-5xl tracking-[-0.03em]"
              style={{ color: '#ffffff', transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
            className="w-fit label px-6 py-3 rounded-full mt-4"
            style={{ background: '#ffffff', color: '#0B0B0B' }}
          >
            Book a Call
          </a>
        </nav>
      </div>
    </>
  );
}
