import type Lenis from "lenis";

let lenisRef: Lenis | null = null;

export function registerLenis(lenis: Lenis) {
  lenisRef = lenis;
}

export function unregisterLenis() {
  lenisRef = null;
}

/** Smooth-scroll to a section id/hash, compatible with Lenis + ScrollTrigger. */
export function scrollToSection(selector: string, offset = -70) {
  const el = document.querySelector(selector);
  if (!el) return;

  if (lenisRef) {
    lenisRef.scrollTo(el as HTMLElement, { offset });
    return;
  }

  el.scrollIntoView({ behavior: "smooth" });
}
