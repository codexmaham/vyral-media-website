"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import Portfolio from "@/components/VideoPortfolio";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Metrics from "@/components/Metrics";
import TechStack from "@/components/TechStack";
import MarqueeBar from "@/components/MarqueeBar";
import Services from "@/components/Services";
import MeetTeam from "@/components/MeetTeam";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 2000);
    return () => window.clearTimeout(t);
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div>
        <Hero ready={!loading} />
        <Portfolio ready={!loading} />
        <Process ready={!loading} />
        <WhyUs />
        <Metrics />
        <TechStack />
        <MarqueeBar />
        <Services />
        <MeetTeam />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
