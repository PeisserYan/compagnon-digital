"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { avis, GoogleG } from "@/components/SectionAvis";

const ETOILE = "M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95L12 2.5z";

const ease = [0.76, 0, 0.24, 1] as const;
const BASE_POSITION = "50% 43%"; // cadrage de la photo principale

// Repris du texte d'accroche (site web, visibilité Google & IA, publicité Google)
const CHIPS = ["Site web", "Google & IA", "Publicité Google"];

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
          {/* Un seul bouton : « Discuter de mon projet » est déjà dans le header, juste au-dessus. */}
          <Link href="/contact?intent=diagnostic" className="btn">
            Faire le diagnostic gratuit (1 min)
          </Link>
          <p className="btn-note">
            Gratuit · Sans engagement
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
          Site web, visibilité sur Google et dans les IA, publicité : je repère <strong>où votre activité perd des clients</strong>, puis je construis ce qui manque.
        </p>
        {/* Preuve sociale : un vrai avis Google (extrait), plutôt que le numéro de téléphone (resté dans le footer) */}
        <figure className="hero__avis">
          <div className="hero__avis-top">
            <span className="hero__stars" role="img" aria-label="5 étoiles sur 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
                  <path d={ETOILE} />
                </svg>
              ))}
            </span>
            <GoogleG size={18} />
          </div>
          {/* Espaces insécables autour des guillemets : jamais de « » seul en bout de ligne */}
          <blockquote>«&nbsp;Travail soigné, prix honnête et justifié. Je&nbsp;recommande&nbsp;vivement.&nbsp;»</blockquote>
          <figcaption>
            <span className="hero__avis-init" aria-hidden="true" style={{ background: avis[0].couleur }}>{avis[0].initiale}</span>
            <span>
              <strong>{avis[0].nom}</strong>
              <small>Avis Google</small>
            </span>
          </figcaption>
        </figure>
      </motion.aside>
    </section>
  );
}
