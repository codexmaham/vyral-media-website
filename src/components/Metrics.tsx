"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 50, suffix: "+", label: "Brands Built", description: "In the past 4 years across multiple industries" },
  { value: 13, suffix: "", label: "Team Members", description: "Inhouse & remote specialists working for you" },
  { value: 145, suffix: "K+", label: "Ad Spend Managed", description: "$100K Meta Ads + $45K Google Ads in 2026" },
  { value: 4, suffix: " Yrs", label: "In Business", description: "Consistently delivering results since day one" },
];

function Counter({ value, suffix, triggered }: { value: number; suffix: string; triggered: boolean }) {
  const [current, setCurrent] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!triggered || started.current) return;
    started.current = true;

    const duration = 1500;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
      else setCurrent(value);
    };

    requestAnimationFrame(tick);
  }, [triggered, value]);

  return (
    <span>
      {current}{suffix}
    </span>
  );
}

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => setTriggered(true),
      });

      gsap.from(".metric-item", {
        opacity: 0,
        y: 40,
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
    <section ref={sectionRef} className="bg-white py-24 md:py-32 border-t border-[#D9D9D9]/60" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-[#1D6FF2]" />
            <span className="label text-[#0B0B0B]/40">By The Numbers</span>
          </div>
          <h2 className="h-large text-[#0B0B0B] max-w-lg">Results that speak for themselves.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#D9D9D9]">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-item bg-white p-10">
              <div
                className="font-['Satoshi'] font-black text-[#0B0B0B] tracking-[-0.04em] mb-3"
                style={{ fontSize: "clamp(48px, 5vw, 72px)" }}
              >
                <Counter value={metric.value} suffix={metric.suffix} triggered={triggered} />
              </div>
              <div className="font-['Satoshi'] font-bold text-[#0B0B0B] text-lg mb-2">{metric.label}</div>
              <div className="text-[#0B0B0B]/40 text-xs font-['Inter'] leading-relaxed">{metric.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
