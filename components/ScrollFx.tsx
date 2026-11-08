"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Effets de défilement « format GD Concept », pour toutes les pages :
// - header flottant qui remonte (.scrolled), barre d'action mobile (.mbar.show)
// - parallaxe douce des photos ([data-parallax="0.15"] = vitesse relative)
// - révélation au scroll ([data-reveal] : fondu + 16 px, léger décalage entre voisins)
export default function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const header = document.querySelector<HTMLElement>(".header");
    const mbar = document.querySelector<HTMLElement>(".mbar");
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;

    const frame = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      header?.classList.toggle("scrolled", y > 40);
      mbar?.classList.toggle("show", y > vh * 0.6);
      if (reduce) return;
      for (const el of layers) {
        const box = (el.parentElement ?? el).getBoundingClientRect();
        if (box.bottom < -200 || box.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallax || "0.15");
        // Héros (data-parallax-top) : 0 en haut de page. Ailleurs : 0 quand le bloc est centré.
        const center = "parallaxTop" in el.dataset ? box.top : box.top + box.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    let io: IntersectionObserver | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      document.documentElement.classList.add("reveal-armed");
      const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      // décalage entre éléments voisins d'un même parent
      items.forEach((el) => {
        const siblings = Array.from(el.parentElement?.children ?? []).filter((c) => c.hasAttribute("data-reveal"));
        const i = siblings.indexOf(el);
        if (i > 0) el.style.transitionDelay = `${Math.min(i, 5) * 90}ms`;
      });
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io?.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
      items.forEach((el) => io?.observe(el));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
