"use client";

import { useRef, useState } from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Performance Marketing",
    description:
      "Data-driven campaigns across Google, Meta, and TikTok that maximize ROI. From funnel architecture to creative testing - we scale what works and cut what doesn't.",
    color: "#1D6FF2",
    bg: "#FFF0F0",
  },
  {
    num: "02",
    title: "Brand Strategy & Design",
    description:
      "Full brand identities that resonate with your audience and stand the test of time. Positioning, visual systems, brand voice, and guidelines that unlock growth.",
    color: "#0B0B0B",
    bg: "#F5F5F5",
  },
  {
    num: "03",
    title: "Videography & Motion",
    description:
      "Cinematic commercial videos, social-first content, and motion graphics that capture attention in seconds. From concept to final cut - in-house.",
    color: "#4A3728",
    bg: "#FDF6F0",
  },
  {
    num: "04",
    title: "Web Development",
    description:
      "High-performance websites and web apps built with Next.js, React, and modern tooling. Pixel-perfect design implementation with Core Web Vitals in mind.",
    color: "#0F2C4A",
    bg: "#F0F4FF",
  },
  {
    num: "05",
    title: "AI Solutions & Automation",
    description:
      "Custom AI workflows, chatbots, and automation pipelines using OpenAI, Claude, n8n, and Make. We make AI practical and profitable for your business.",
    color: "#1A3A2A",
    bg: "#F0FFF5",
  },
  {
    num: "06",
    title: "Hiring Lead Generation",
    description:
      "We generate qualified hiring leads for companies looking to recruit top talent. Our inhouse customer support team screens, filters, and delivers only the right candidates — saving your HR team time and cost.",
    color: "#3A1A3A",
    bg: "#FDF0FF",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-row", {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.7,
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
    <section ref={sectionRef} id="services" className="bg-white pt-20 pb-8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#1D6FF2]" />
              <span className="label text-[#0B0B0B]/40">What We Do</span>
            </div>
            <h2 className="h-large text-[#0B0B0B]">Services</h2>
          </div>
          <p className="max-w-xs text-[#0B0B0B]/50 leading-relaxed font-['Inter'] text-sm">
            End-to-end digital solutions that cover every touchpoint of your brand.
          </p>
        </div>

        <div className="border-t border-[#D9D9D9]">
          {services.map((service, i) => (
            <div
              key={service.num}
              className="service-row group relative border-b border-[#D9D9D9] cursor-pointer overflow-hidden"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Hover bg */}
              <div
                className="absolute inset-0 transition-opacity duration-400"
                style={{
                  backgroundColor: service.bg,
                  opacity: activeIndex === i ? 1 : 0,
                }}
              />

              <div className="relative z-10 flex items-center justify-between py-6 md:py-8 gap-6">
                <div className="flex items-center gap-6 md:gap-12 flex-1 min-w-0">
                  <span
                    className="label shrink-0 transition-colors duration-300"
                    style={{ color: activeIndex === i ? service.color : "#0B0B0B" + "50" }}
                  >
                    {service.num}
                  </span>
                  <h3
                    className="font-['Satoshi'] font-black text-[#0B0B0B] tracking-[-0.02em] transition-all duration-300"
                    style={{ fontSize: "clamp(20px, 3vw, 40px)" }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Description - appears on hover */}
                <p
                  className="hidden md:block max-w-xs text-[#0B0B0B]/60 text-sm leading-relaxed font-['Inter'] transition-all duration-400"
                  style={{
                    opacity: activeIndex === i ? 1 : 0,
                    transform: activeIndex === i ? "translateX(0)" : "translateX(20px)",
                  }}
                >
                  {service.description}
                </p>

                <div
                  className="shrink-0 w-10 h-10 rounded-full border border-[#0B0B0B]/20 flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: activeIndex === i ? service.color : "transparent",
                    borderColor: activeIndex === i ? service.color : undefined,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-300"
                    style={{
                      transform: activeIndex === i ? "rotate(-45deg)" : "rotate(0deg)",
                      stroke: activeIndex === i ? "white" : "#0B0B0B",
                    }}
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Mobile description */}
              <div
                className="md:hidden relative z-10 overflow-hidden transition-all duration-400"
                style={{ maxHeight: activeIndex === i ? "200px" : "0px" }}
              >
                <p className="pb-6 text-[#0B0B0B]/60 text-sm leading-relaxed font-['Inter']">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
