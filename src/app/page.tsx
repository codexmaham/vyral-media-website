"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import MarqueeBar from "@/components/MarqueeBar";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Metrics from "@/components/Metrics";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import Portfolio from "@/components/VideoPortfolio";
import MeetTeam from "@/components/MeetTeam";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div style={{ opacity: loading ? 0 : 1, transition: "opacity 0.3s ease" }}>
        <Hero />
        <Portfolio />
        <MarqueeBar />
        <Services />
        <WhyUs />
        <Process />
        <Metrics />
        <TechStack />
        <Testimonials />
        <MeetTeam />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
