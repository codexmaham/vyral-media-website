"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

function FloatingInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
}: {
  label: string;
  type?: string;
  name: keyof FormData;
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full border-b border-[#D9D9D9] focus:border-[#0B0B0B] bg-transparent py-4 pt-6 text-[#0B0B0B] text-base font-['Inter'] outline-none transition-colors duration-200 placeholder-transparent"
        placeholder={label}
      />
      <label
        className="absolute left-0 transition-all duration-200 pointer-events-none font-['Inter']"
        style={{
          top: isActive ? "4px" : "20px",
          fontSize: isActive ? "10px" : "14px",
          color: isActive ? (focused ? "#1D6FF2" : "#0B0B0B80") : "#0B0B0B40",
          letterSpacing: isActive ? "0.1em" : "0",
          textTransform: isActive ? "uppercase" : "none",
        }}
      >
        {label}
      </label>
      <div
        className="absolute bottom-0 left-0 h-px bg-[#1D6FF2] transition-all duration-300"
        style={{ width: focused ? "100%" : "0%" }}
      />
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (name: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-left", {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
      gsap.from(".contact-right", {
        opacity: 0,
        x: 50,
        duration: 1,
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
    <section ref={sectionRef} id="contact" className="bg-[#F8F8F8] py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left */}
          <div className="contact-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#1D6FF2]" />
              <span className="label text-[#0B0B0B]/40">Get In Touch</span>
            </div>
            <h2 className="h-large text-[#0B0B0B] leading-[0.95] mb-8">
              Let&apos;s Build Something Extraordinary.
            </h2>
            <p className="text-[#0B0B0B]/50 text-sm leading-relaxed font-['Inter'] mb-10 max-w-sm">
              Tell us about your project and we&apos;ll get back to you within 24 hours with a tailored proposal.
            </p>

            <div className="space-y-5">
              {[
                { icon: "✦", text: "vyralmedia@gmail.com" },
                { icon: "✦", text: "+92 311 768 9887" },
                { icon: "✦", text: "Response within 24 hours" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-[#1D6FF2] text-xs">{item.icon}</span>
                  <span className="text-[#0B0B0B]/60 text-sm font-['Inter']">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-right">
            {submitted ? (
              <div className="bg-white border border-[#D9D9D9] rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-[#1D6FF2] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-['Satoshi'] font-black text-[#0B0B0B] text-2xl mb-3">Message Received!</h3>
                <p className="text-[#0B0B0B]/50 text-sm font-['Inter']">
                  We&apos;ll be in touch within 24 hours to schedule your discovery call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-[#D9D9D9] rounded-2xl p-8 md:p-10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FloatingInput label="Full Name" name="name" value={form.name} onChange={handleChange} required />
                  <FloatingInput label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <FloatingInput label="Company" name="company" value={form.company} onChange={handleChange} />

                <div className="relative">
                  <label className="label text-[#0B0B0B]/40 block mb-3">Monthly Budget</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["<$5K", "$5K–$20K", "$20K+"].map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => handleChange("budget", range)}
                        className="border rounded-lg py-3 text-xs font-['Satoshi'] font-semibold transition-all duration-200"
                        style={{
                          borderColor: form.budget === range ? "#1D6FF2" : "#D9D9D9",
                          backgroundColor: form.budget === range ? "#1D6FF2" : "transparent",
                          color: form.budget === range ? "white" : "#0B0B0B",
                        }}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full border border-[#D9D9D9] rounded-xl p-4 text-[#0B0B0B] text-sm font-['Inter'] outline-none focus:border-[#1D6FF2] transition-colors duration-200 resize-none placeholder:text-[#0B0B0B]/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1D6FF2] font-['Satoshi'] font-bold py-4 rounded-full hover:bg-[#0B0B0B] transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-70"
                  style={{ color: "#ffffff" }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
