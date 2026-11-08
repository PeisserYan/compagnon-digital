"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;
const BASE_POSITION = "50% 43%"; // cadrage de la photo principale

// Repris du texte d'accroche (Site web, référencement, publicité Google)
const CHIPS = ["Site web", "Référencement", "Publicité Google"];

export default function Hero() {
  return (
    <section className="hero">
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
      <div className="hero__ov" aria-hidden="true" />

      <div className="hero__content">
        <h1 className="hero__title">
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
            <li key={c} className="chip">
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
          <Link href="/#diagnostic" className="btn">
            Faire le diagnostic
          </Link>
          <p className="btn-note">
            Gratuit · 1 minute · Sans engagement
          </p>
        </motion.div>
      </div>

      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="hero__aside"
       
      >
        <p>
          Site web, référencement, publicité Google : je repère <strong>où votre activité perd des clients</strong>, puis je construis ce qui manque.
        </p>
        <Link href="/realisations" className="btn btn--light">
          Voir mes réalisations
        </Link>
        <p className="hero__tel">
          Ou par téléphone : <a href="tel:+33673401475">06 73 40 14 75</a>
        </p>
      </motion.aside>
    </section>
  );
}
