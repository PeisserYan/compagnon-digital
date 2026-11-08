"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PhoneIcon } from "@/components/Navbar";

const ease = [0.76, 0, 0.24, 1] as const;

// Réglages de l'effet "révélation au curseur"
const REVEAL_SRC = "/hero/hero-reveal.webp";
const RADIUS = 130; // rayon du rond (px)
const LIFETIME = 1800; // durée avant disparition complète (ms)
const SPACING = RADIUS * 0.3; // écart entre deux "tampons" le long du trajet
const MAX_POINTS = 400;
const NAV_FEATHER = 40; // fondu sous la navbar (px)
const BASE_POSITION = "50% 43%"; // cadrage de la photo principale
const TEXT_PADDING = 6; // marge autour du texte où l'effet est coupé (px)

type Point = { x: number; y: number; t: number };

// Repris du texte d'accroche (Site web, référencement, publicité Google)
const CHIPS = ["Site web", "Référencement", "Publicité Google"];

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

        // Rien derrière le header flottant : on coupe sous son bord bas, avec un léger fondu
        const nav = document.querySelector(".header__inner");
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

    // Pas d'effet au survol du texte : on teste les vraies lignes de texte
    // (pas le bloc entier), et la boîte complète pour les boutons.
    const range = document.createRange();
    const isOverText = (cx: number, cy: number) => {
      const els = section.querySelectorAll<HTMLElement>("[data-no-reveal]");
      for (const el of Array.from(els)) {
        let rects: ArrayLike<DOMRect>;
        if (el.dataset.noReveal === "box") {
          rects = [el.getBoundingClientRect()];
        } else {
          range.selectNodeContents(el);
          rects = range.getClientRects();
        }
        for (let i = 0; i < rects.length; i++) {
          const r = rects[i];
          if (
            cx >= r.left - TEXT_PADDING &&
            cx <= r.right + TEXT_PADDING &&
            cy >= r.top - TEXT_PADDING &&
            cy <= r.bottom + TEXT_PADDING
          ) {
            return true;
          }
        }
      }
      return false;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      // Sur le texte : on n'ajoute rien, et on coupe la traînée pour ne pas la relier à travers
      if (isOverText(e.clientX, e.clientY)) {
        last = null;
        return;
      }
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
    <section ref={sectionRef} className="hero">
      {/* Photo principale, en parallaxe douce */}
      <div className="hero__bg" data-parallax="0.25" data-parallax-top>
        {/* Grand écran : photo élargie et calée à gauche, l'oiseau passe à droite du titre */}
        <div className="hero__bg-img lg:right-auto lg:w-[125%]">
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
          <Image
            src="/hero/hero-base.webp"
            alt=""
            fill
            sizes="125vw"
            className="hidden lg:block object-cover"
            style={{ objectPosition: BASE_POSITION }}
          />
        </div>
      </div>
      {/* Photo révélée au passage de la souris */}
      <canvas ref={canvasRef} aria-hidden="true" className="hero__canvas" />
      <div className="hero__ov" aria-hidden="true" />

      <div className="hero__content">
        <h1 data-no-reveal className="hero__title">
          J&apos;aide les indépendants et les entreprises à trouver plus de clients.
        </h1>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="chips"
          aria-label="Services"
        >
          {CHIPS.map((c) => (
            <li key={c} className="chip" data-no-reveal>
              {c}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="hero__actions"
        >
          <Link href="/#diagnostic" data-no-reveal="box" className="btn">
            Faire le diagnostic
          </Link>
          <p data-no-reveal className="btn-note">
            Gratuit · 1 minute · Sans engagement
          </p>
        </motion.div>
      </div>

      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="hero__aside"
        data-no-reveal="box"
      >
        <p>
          Site web, référencement, publicité Google : je repère <strong>où votre activité perd des clients</strong>, puis je construis ce qui manque.
        </p>
        <Link href="/realisations" className="btn btn--light">
          Voir mes réalisations
        </Link>
        <a href="tel:+33673401475" className="hero__phone">
          <PhoneIcon /> 06 73 40 14 75
        </a>
      </motion.aside>
    </section>
  );
}
