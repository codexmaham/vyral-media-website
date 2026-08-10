"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Shuffle from "./Shuffle";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "border-b border-white/10 backdrop-blur-md" : ""}`}
        style={scrolled ? { background: "rgba(7,7,20,0.7)" } : { background: "transparent" }}
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

          {/* Desktop Links — md and above */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="label transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                <Shuffle
                  text={link.label}
                  tag="span"
                  style={{ color: "rgba(255,255,255,0.8)", fontSize: "inherit", fontFamily: "inherit", fontWeight: "inherit", letterSpacing: "inherit" }}
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
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="flex items-center gap-2 label px-5 py-3 rounded-full transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.35)", color: "#ffffff" }}
            >
              Book a Call
            </a>
          </div>

          {/* Mobile/Tablet — Menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center gap-2.5 cursor-pointer"
            aria-label="Toggle menu"
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
                color: "rgba(255,255,255,0.15)",
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.15)"; }}
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
            style={{ background: "#ffffff", color: "#07071A" }}
          >
            Book a Call →
          </a>
        </div>
      </div>
    </>
  );
}
