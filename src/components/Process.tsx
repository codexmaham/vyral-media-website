"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discovery",
    description: "Deep-dive into your business, goals, audience, and competitors. We leave no stone unturned.",
  },
  {
    num: "02",
    title: "Research",
    description: "Market analysis, customer interviews, competitive mapping, and trend identification.",
  },
  {
    num: "03",
    title: "Strategy",
    description: "A clear roadmap with defined KPIs, channel selection, positioning, and creative direction.",
  },
  {
    num: "04",
    title: "Design",
    description: "Pixel-perfect execution of brand assets, creative, and digital interfaces.",
  },
  {
    num: "05",
    title: "Development",
    description: "Fast, scalable builds using modern technology - delivered on time and on spec.",
  },
  {
    num: "06",
    title: "Launch",
    description: "Strategic go-to-market with coordinated campaigns across every relevant channel.",
  },
  {
    num: "07",
    title: "Growth",
    description: "Ongoing optimization, testing, and scaling - we stay invested in your success.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !track || !wrapper) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - wrapper.offsetWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="bg-white overflow-hidden">
      <div ref={wrapperRef} className="relative">
        {/* Header - always visible */}
        <div className="pt-20 pb-12 px-6 md:px-10 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-[#1D6FF2]" />
            <span className="label text-[#0B0B0B]/40">How We Work</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <h2 className="h-large text-[#0B0B0B]">Our Process</h2>
            <p className="max-w-xs text-[#0B0B0B]/40 text-sm leading-relaxed font-['Inter']">
              Drag or scroll to explore each stage of our proven process.
            </p>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div className="pb-20 px-6 md:px-10">
          <div ref={trackRef} className="flex gap-6 w-max">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="w-[300px] md:w-[340px] shrink-0 border border-[#D9D9D9] rounded-2xl p-8 hover:border-[#1D6FF2]/40 transition-colors duration-300 group"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="label text-[#1D6FF2]">{step.num}</span>
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center group-hover:bg-[#1D6FF2] transition-colors duration-300">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:[&>path]:stroke-white">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="#0B0B0B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <h3 className="font-['Satoshi'] font-black text-[#0B0B0B] text-3xl tracking-[-0.03em] mb-4">
                  {step.title}
                </h3>
                <p className="text-[#0B0B0B]/50 text-sm leading-relaxed font-['Inter']">
                  {step.description}
                </p>

                {/* Progress line */}
                <div className="mt-10 flex items-center gap-1">
                  {steps.map((_, j) => (
                    <div
                      key={j}
                      className="h-px flex-1 transition-colors duration-200"
                      style={{ backgroundColor: j <= i ? "#1D6FF2" : "#D9D9D9" }}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* End card */}
            <div className="w-[300px] md:w-[340px] shrink-0 bg-[#1D6FF2] rounded-2xl p-8 flex flex-col justify-between">
              <div className="font-['Satoshi'] font-black text-white text-4xl tracking-[-0.03em] leading-tight">
                Ready to start?
              </div>
              <div>
                <p className="text-white/60 text-sm mb-6 font-['Inter']">
                  Book a free 30-minute discovery call and let&apos;s map out your growth plan.
                </p>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-2 bg-white font-['Satoshi'] font-bold text-sm px-5 py-3 rounded-full transition-colors duration-300"
                  style={{ color: "#ffffff", backgroundColor: "#1D6FF2" }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.backgroundColor = "#0B0B0B"; el.style.color = "#ffffff"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.backgroundColor = "#1D6FF2"; el.style.color = "#ffffff"; }}
                >
                  Book a Call
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
