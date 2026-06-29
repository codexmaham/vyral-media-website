"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";

// Lazy load everything below the fold
const Portfolio  = lazy(() => import("@/components/VideoPortfolio"));
const Process    = lazy(() => import("@/components/Process"));
const WhyUs      = lazy(() => import("@/components/WhyUs"));
const Metrics    = lazy(() => import("@/components/Metrics"));
const TechStack  = lazy(() => import("@/components/TechStack"));
const MarqueeBar = lazy(() => import("@/components/MarqueeBar"));
const Services   = lazy(() => import("@/components/Services"));
const MeetTeam   = lazy(() => import("@/components/MeetTeam"));
const FAQ        = lazy(() => import("@/components/FAQ"));
const Contact    = lazy(() => import("@/components/Contact"));
const Footer     = lazy(() => import("@/components/Footer"));

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div style={{ opacity: loading ? 0 : 1, transition: "opacity 0.3s ease" }}>
        <Hero />
        <Suspense fallback={null}>
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
        </Suspense>
      </div>
    </>
  );
}
