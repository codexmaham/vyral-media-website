"use client";

import { useState, useEffect } from "react";
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

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div>
        <Hero ready={!loading} />
        <Portfolio />
        <Process />
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
