"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressVal = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 320;
    canvas.width = SIZE;
    canvas.height = SIZE;

    const img = new window.Image();
    img.src = "/vyral-icon.png";

    img.onload = () => {
      // Initial draw: greyscale
      draw(0);

      // Entrance animation
      gsap.fromTo(canvas,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)", delay: 0.1 }
      );

      // Progress tick
      const interval = setInterval(() => {
        progressVal.current += Math.random() * 3 + 1.5;
        if (progressVal.current >= 100) {
          progressVal.current = 100;
          clearInterval(interval);
          draw(100);

          setTimeout(() => {
            gsap.to(canvas, { scale: 1.1, opacity: 0, duration: 0.4, ease: "power3.in" });
            gsap.to(container, {
              clipPath: "inset(0 0 100% 0)",
              duration: 0.65,
              delay: 0.25,
              ease: "power4.inOut",
              onComplete,
            });
          }, 400);
          return;
        }
        draw(Math.min(progressVal.current, 100));
      }, 55);
    };

    function draw(pct: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, SIZE, SIZE);

      // 1. Draw greyscale logo (full)
      ctx.save();
      ctx.filter = "grayscale(1) brightness(0.35)";
      ctx.drawImage(img, 0, 0, SIZE, SIZE);
      ctx.restore();

      // 2. Clip from bottom upward based on pct, draw color logo inside
      if (pct > 0) {
        const fillY = SIZE - (SIZE * pct) / 100; // top of the fill band
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, fillY, SIZE, SIZE - fillY);
        ctx.clip();
        ctx.drawImage(img, 0, 0, SIZE, SIZE);
        ctx.restore();

        // 3. Draw a glowing horizontal "wave" line at the fill boundary
        const lineY = fillY;
        const lineGrad = ctx.createLinearGradient(0, 0, SIZE, 0);
        lineGrad.addColorStop(0, "rgba(29,111,242,0)");
        lineGrad.addColorStop(0.3, "rgba(29,111,242,0.9)");
        lineGrad.addColorStop(0.5, "rgba(6,182,212,1)");
        lineGrad.addColorStop(0.7, "rgba(124,58,237,0.9)");
        lineGrad.addColorStop(1, "rgba(124,58,237,0)");

        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 3;
        ctx.shadowColor = "#06B6D4";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(SIZE, lineY);
        ctx.stroke();
        ctx.restore();
      }
    }

    return () => { /* cleanup handled by clearInterval above */ };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-[#0B0B0B] flex items-center justify-center"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <canvas
        ref={canvasRef}
        style={{ opacity: 0, imageRendering: "crisp-edges" }}
      />
    </div>
  );
}
