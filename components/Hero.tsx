"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

// Réglages de l'effet "révélation au curseur"
const REVEAL_SRC = "/hero/hero-reveal.webp";
const RADIUS = 130; // rayon du rond (px)
const LIFETIME = 1800; // durée avant disparition complète (ms)
const SPACING = RADIUS * 0.3; // écart entre deux "tampons" le long du trajet
const MAX_POINTS = 400;
const NAV_FEATHER = 40; // fondu sous la navbar (px)
const BASE_POSITION = "50% 43%"; // cadrage de la photo principale

type Point = { x: number; y: number; t: number };

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    // Pas d'effet : mouvement réduit demandé, ou appareil sans souris (mobile/tablette)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const ctx = canvas.getContext("2d");
    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d");
    if (!ctx || !mctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let points: Point[] = [];
    let last: Point | null = null;
    let raf = 0;

    // Chargée après le montage pour ne pas concurrencer l'image principale
    const img = new window.Image();
    let loaded = false;
    img.decoding = "async";
    img.onload = () => {
      loaded = true;
    };
    const loadTimer = window.setTimeout(() => {
      img.src = REVEAL_SRC;
    }, 600);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = section.clientWidth;
      h = section.clientHeight;
      for (const c of [canvas, mask]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const draw = (now: number) => {
      points = points.filter((p) => now - p.t < LIFETIME);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      if (points.length === 0) {
        raf = 0;
        return;
      }

      // 1. Masque : un dégradé radial par point, de plus en plus transparent avec l'âge
      mctx.clearRect(0, 0, w, h);
      for (const p of points) {
        const life = 1 - (now - p.t) / LIFETIME;
        const a = life * life;
        const g = mctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, RADIUS);
        g.addColorStop(0, `rgba(0,0,0,${a})`);
        g.addColorStop(0.55, `rgba(0,0,0,${a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        mctx.fillStyle = g;
        mctx.fillRect(p.x - RADIUS, p.y - RADIUS, RADIUS * 2, RADIUS * 2);
      }

      // 2. Photo cachée (cadrage "cover"), puis découpée par le masque
      if (loaded && img.naturalWidth) {
        const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
        const dw = img.naturalWidth * s;
        const dh = img.naturalHeight * s;
        ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(mask, 0, 0, w, h);

        // Rien derrière la navbar : on coupe sous son bord bas, avec un léger fondu
        const nav = document.querySelector("nav");
        const navBottom = nav ? nav.getBoundingClientRect().bottom - section.getBoundingClientRect().top : 0;
        if (navBottom > 0) {
          const g = ctx.createLinearGradient(0, navBottom, 0, navBottom + NAV_FEATHER);
          g.addColorStop(0, "rgba(0,0,0,0)");
          g.addColorStop(1, "rgba(0,0,0,1)");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
        }
        ctx.globalCompositeOperation = "source-over";
      }

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = section.getBoundingClientRect();
      const now = performance.now();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Points intermédiaires pour éviter les trous quand la souris va vite
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.floor(dist / SPACING);
        for (let i = 1; i <= steps; i++) {
          const k = i / (steps + 1);
          points.push({ x: last.x + dx * k, y: last.y + dy * k, t: now });
        }
      }
      const pt = { x, y, t: now };
      points.push(pt);
      last = pt;
      if (points.length > MAX_POINTS) points = points.slice(-MAX_POINTS);
      start();
    };
    const onLeave = () => {
      last = null;
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);

    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      window.clearTimeout(loadTimer);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[85vh] flex flex-col items-center justify-center text-center pt-[120px] pb-24 px-6 md:px-12"
      style={{ backgroundColor: "#F2A65E" }}
    >
      {/* Photo principale, toujours visible */}
      {/* Sur grand écran, l'image est élargie et calée à gauche : l'oiseau finit à droite, hors du texte */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[180%]">
        {/* Mobile / tablette : version sans l'oiseau (il passerait derrière le texte) */}
        <Image
          src="/hero/hero-base-mobile.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover lg:hidden"
          style={{ objectPosition: BASE_POSITION }}
        />
        {/* Grand écran : photo d'origine avec l'oiseau */}
        <Image
          src="/hero/hero-base.webp"
          alt=""
          fill
          sizes="180vw"
          className="hidden lg:block object-cover"
          style={{ objectPosition: BASE_POSITION }}
        />
      </div>
      {/* Photo révélée au passage de la souris */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Fondu du bas du héros vers la section suivante (blanche) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: "180px", background: "linear-gradient(to bottom, rgba(255,255,255,0), #FFFFFF)" }}
      />

      <div className="relative z-10" style={{ maxWidth: "780px", width: "100%" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mb-8 text-xs font-medium tracking-widest uppercase"
          style={{ color: "var(--noir)" }}
        >
          Savoie & Haute-Savoie
        </motion.p>

        <h1
          className="mb-8"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            lineHeight: 1.15,
            color: "var(--noir)",
          }}
        >
          J'aide les indépendants et entreprises à être trouvés par leurs clients en ligne.
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mb-12 text-lg leading-relaxed"
          style={{
            maxWidth: "560px",
            margin: "0 auto 3rem",
            color: "var(--noir)",
          }}
        >
          Sites web, référencement local et automatisation — je m'occupe de la technique pour que vous restiez concentré sur votre métier.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
        >
          <Link
            href="#contact"
            className="inline-block font-medium transition-colors"
            style={{
              backgroundColor: "var(--noir)",
              color: "#FFFFFF",
              padding: "1rem 2.25rem",
              borderRadius: "2px",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--orange-texte)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--noir)";
            }}
          >
            Parlons de votre projet
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
