"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.08;
      curY += (mouseY - curY) * 0.08;
      cursor.style.left = `${curX}px`;
      cursor.style.top = `${curY}px`;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMouseMove);

    // Interaction states
    const onMouseEnterLink = () => {
      cursor.classList.add("scale-[2.5]", "border-[#1D6FF2]", "bg-[#1D6FF2]/10");
      dot.classList.add("opacity-0");
    };
    const onMouseLeaveLink = () => {
      cursor.classList.remove("scale-[2.5]", "border-[#1D6FF2]", "bg-[#1D6FF2]/10");
      dot.classList.remove("opacity-0");
    };

    const links = document.querySelectorAll("a, button, [data-cursor]");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    // Observer for dynamic links
    const observer = new MutationObserver(() => {
      const newLinks = document.querySelectorAll("a, button, [data-cursor]");
      newLinks.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Large trailing circle */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-10 h-10 rounded-full border border-[#0B0B0B]/40 -translate-x-1/2 -translate-y-1/2 transition-[transform,border-color,background-color] duration-300 ease-out mix-blend-multiply"
        style={{ left: -100, top: -100 }}
      />
      {/* Small instant dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-[#1D6FF2] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{ left: -100, top: -100 }}
      />
    </>
  );
}
