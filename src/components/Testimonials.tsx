"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "VELO completely transformed our digital presence. Within 3 months of the rebrand and new website launch, our inbound leads increased by 340%. Worth every penny.",
    name: "Sarah Mitchell",
    role: "CEO, Nexus Health",
    initial: "SM",
    color: "#1A2B4A",
  },
  {
    quote: "Their paid media team is exceptional. They took our ROAS from 1.8× to 7.4× in 60 days without increasing our ad spend. They just made it smarter.",
    name: "James Okafor",
    role: "Marketing Director, Orbit Commerce",
    initial: "JO",
    color: "#2A1A0A",
  },
  {
    quote: "The AI automation VELO built saves my team 20 hours per week. It's not just code - they truly understood our operations and built something that fits perfectly.",
    name: "Priya Sharma",
    role: "COO, Synapse AI",
    initial: "PS",
    color: "#0A2A1A",
  },
  {
    quote: "From strategy to execution, VELO is the most thoughtful agency I've ever worked with. They push back when needed and always bring fresh ideas to the table.",
    name: "David Chen",
    role: "Founder, Luminary SaaS",
    initial: "DC",
    color: "#2A0A1A",
  },
  {
    quote: "Our video content from VELO consistently hits 500K+ views organically. Their creative direction is genuinely world-class.",
    name: "Amara Diallo",
    role: "Brand Manager, Apex Realty",
    initial: "AD",
    color: "#1A1A2A",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, scrollLeft: trackRef.current.scrollLeft };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const delta = e.clientX - dragStart.current.x;
    trackRef.current.scrollLeft = dragStart.current.scrollLeft - delta;
  };

  const onMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        opacity: 0,
        x: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-[#1D6FF2]" />
          <span className="label text-[#0B0B0B]/40">Client Stories</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="h-large text-[#0B0B0B]">What Clients Say</h2>
          <p className="text-[#0B0B0B]/40 text-sm font-['Inter']">Drag to scroll →</p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 px-6 md:px-10 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing pb-4"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="testimonial-card shrink-0 w-[320px] md:w-[380px] border border-[#D9D9D9] rounded-2xl p-8 flex flex-col gap-6 select-none"
            style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}
          >
            {/* Quote mark */}
            <div className="text-6xl font-['Satoshi'] font-black text-[#D9D9D9] leading-none">&ldquo;</div>

            <p className="text-[#0B0B0B] text-sm leading-relaxed font-['Inter'] flex-1">
              {t.quote}
            </p>

            <div className="flex items-center gap-4 pt-4 border-t border-[#D9D9D9]">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: t.color }}
              >
                <span className="text-white font-['Satoshi'] font-bold text-xs">{t.initial}</span>
              </div>
              <div>
                <div className="font-['Satoshi'] font-bold text-[#0B0B0B] text-sm">{t.name}</div>
                <div className="text-[#0B0B0B]/40 text-xs font-['Inter']">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
