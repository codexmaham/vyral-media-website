"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function formatCurrency(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${Math.floor(n / 1000)}K`;
  return `$${n}`;
}

export default function ROICalculator() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revenue, setRevenue] = useState(50000);
  const [adBudget, setAdBudget] = useState(5000);
  // Projections
  const projectedRevenue = Math.round(revenue * 1.4 + adBudget * 4.2);
  const projectedROI = adBudget > 0 ? Math.round(((projectedRevenue - revenue) / adBudget) * 10) / 10 : 0;
  const savedBudget = Math.round(adBudget * 0.18);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {},
      });

      gsap.from(".calc-panel", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
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
    <section ref={sectionRef} className="bg-[#0B0B0B] py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-[#1D6FF2]" />
            <span className="label text-white/30">ROI Calculator</span>
          </div>
          <h2 className="h-large text-white max-w-xl">
            See your potential growth.
          </h2>
          <p className="mt-4 text-white/40 text-sm font-['Inter'] max-w-md">
            Enter your current numbers and we&apos;ll estimate the impact of working with VYRAL MEDIA.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="calc-panel bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
            <h3 className="font-['Satoshi'] font-bold text-white text-xl mb-8">Your Numbers</h3>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="label text-white/50">Monthly Revenue</label>
                  <span className="font-['Satoshi'] font-bold text-white text-sm">{formatCurrency(revenue)}</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={500000}
                  step={5000}
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full accent-[#1D6FF2] h-1 rounded-full cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-white/20 text-xs font-['Inter']">$5K</span>
                  <span className="text-white/20 text-xs font-['Inter']">$500K</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="label text-white/50">Monthly Ad Budget</label>
                  <span className="font-['Satoshi'] font-bold text-white text-sm">{formatCurrency(adBudget)}</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={100000}
                  step={500}
                  value={adBudget}
                  onChange={(e) => setAdBudget(Number(e.target.value))}
                  className="w-full accent-[#1D6FF2] h-1 rounded-full cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-white/20 text-xs font-['Inter']">$500</span>
                  <span className="text-white/20 text-xs font-['Inter']">$100K</span>
                </div>
              </div>
            </div>

            <p className="mt-8 text-white/20 text-xs font-['Inter'] leading-relaxed">
              * Projections based on average results across our client portfolio. Actual results vary.
            </p>
          </div>

          {/* Results */}
          <div className="calc-panel bg-[#1D6FF2] rounded-2xl p-8 md:p-10 flex flex-col justify-between">
            <h3 className="font-['Satoshi'] font-bold text-white text-xl mb-8">Projected With VELO</h3>

            <div className="space-y-6">
              <div>
                <div className="label text-white/50 mb-2">Projected Monthly Revenue</div>
                <div className="font-['Satoshi'] font-black text-white tracking-[-0.04em]" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
                  {formatCurrency(projectedRevenue)}
                </div>
                <div className="text-white/60 text-sm mt-1 font-['Inter']">
                  +{formatCurrency(projectedRevenue - revenue)} vs. current
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
                <div>
                  <div className="label text-white/50 mb-1">ROAS</div>
                  <div className="font-['Satoshi'] font-black text-white text-3xl">{projectedROI}×</div>
                </div>
                <div>
                  <div className="label text-white/50 mb-1">Budget Saved</div>
                  <div className="font-['Satoshi'] font-black text-white text-3xl">{formatCurrency(savedBudget)}</div>
                  <div className="text-white/50 text-xs font-['Inter']">via automation</div>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="mt-8 inline-flex items-center justify-center gap-2 bg-white font-['Satoshi'] font-bold px-6 py-4 rounded-full transition-colors duration-300"
              style={{ color: "#1D6FF2" }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.backgroundColor = "#0B0B0B"; el.style.color = "#ffffff"; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.backgroundColor = "#ffffff"; el.style.color = "#1D6FF2"; }}
            >
              Claim Your Growth Plan
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
