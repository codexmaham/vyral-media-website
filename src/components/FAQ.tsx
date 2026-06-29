"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What services does Vyral Media offer?",
    a: "We offer Performance Marketing (Meta, Google, TikTok), Brand Strategy & Design, Videography & Motion, Web Development, SEO, and AI Automation. We cover every digital touchpoint your brand needs.",
  },
  {
    q: "How long does a website or video project take?",
    a: "A website typically takes 3-6 weeks depending on complexity. A brand video or social reel can be turned around in 7-14 days. We always agree on a timeline before starting.",
  },
  {
    q: "Do you run ads on Meta, Google, and TikTok?",
    a: "Yes. We handle full campaign setup, creative production, audience targeting, A/B testing, and monthly reporting across all major ad platforms. We focus on real ROI, not vanity metrics.",
  },
  {
    q: "Can you help with video editing and social media content?",
    a: "Absolutely. We produce cinematic brand films, product videos, social reels, and motion graphics. Our in-house editor handles everything from shoot to final delivery.",
  },
  {
    q: "Do you offer AI automation services?",
    a: "Yes. We build custom AI workflows, chatbots, and automation pipelines using tools like n8n, Make, and OpenAI - saving your team hours of manual work every week.",
  },
  {
    q: "Do you work with Pakistani businesses and international clients?",
    a: "We work with both. Our clients include local Pakistani brands (real estate, F&B, healthcare) as well as US-based companies like Vynixo. We're flexible with time zones and communication.",
  },
  {
    q: "How do I get started with Vyral Media?",
    a: "Book a free 30-minute discovery call via our contact form or WhatsApp at +92 311 768 9887. We'll discuss your goals and send a proposal within 48 hours.",
  },
  {
    q: "What makes Vyral Media different from other agencies?",
    a: "We combine strategy, creative, tech, and AI under one roof. No outsourcing, no handoffs. You work directly with our core team and get full transparency on every project.",
  },
];

function FAQItem({ item, isOpen, onToggle }: { item: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  const answerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-[#D9D9D9] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
      >
        <span className="font-['Satoshi'] font-semibold text-[#0B0B0B] text-base md:text-lg pr-8 group-hover:text-[#1D6FF2] transition-colors duration-200">
          {item.q}
        </span>
        <div
          className="shrink-0 w-8 h-8 rounded-full border border-[#D9D9D9] flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: isOpen ? "#1D6FF2" : "transparent",
            borderColor: isOpen ? "#1D6FF2" : "#D9D9D9",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
          >
            <path d="M6 1v10M1 6h10" stroke={isOpen ? "white" : "#0B0B0B"} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </button>

      <div
        ref={answerRef}
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <p className="pb-6 text-[#0B0B0B]/60 text-sm leading-relaxed font-['Inter']">
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-container", {
        opacity: 0,
        y: 40,
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
    <section ref={sectionRef} className="bg-white py-24 md:py-32" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#1D6FF2]" />
              <span className="label text-[#0B0B0B]/40">FAQ</span>
            </div>
            <h2 className="h-large text-[#0B0B0B]">
              Frequently Asked
            </h2>
            <p className="mt-6 text-[#0B0B0B]/50 text-sm leading-relaxed font-['Inter'] max-w-sm">
              Have more questions? Book a free 30-minute call and we&apos;ll answer everything.
            </p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="mt-8 inline-flex items-center gap-2 bg-[#1D6FF2] font-['Satoshi'] font-semibold px-6 py-3.5 rounded-full hover:bg-[#0B0B0B] transition-colors duration-300"
              style={{ color: "#ffffff" }}
            >
              Talk to Us
            </a>
          </div>

          <div className="faq-container border-t border-[#D9D9D9]">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                item={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
