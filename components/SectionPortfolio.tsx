import Image from "next/image";
import Link from "next/link";
import { realisationsVedette as projets } from "@/lib/realisations";



// Format GD Concept : section sombre, titre à parallélogramme, bouton à droite, cartes claires.
export default function SectionPortfolio() {
  return (
    <section id="portfolio" className="section on-dark">
      <div className="wrap">
        <div className="strip__head" data-reveal>
          <div>
            <p className="eyebrow">Réalisations</p>
            <h2 className="h-title h2 t-accent">Réalisations.</h2>
          </div>
          <Link href="/realisations" className="btn btn--light">
            Voir toutes mes réalisations
          </Link>
        </div>

        <div className="cards">
          {projets.map((p) => (
            <article key={p.slug} className="card" data-reveal>
              <div className="card__img">
                <Image src={p.image} alt={p.alt} fill sizes="(max-width: 700px) 100vw, 33vw" className="object-cover object-top" />
              </div>
              <div className="card__body">
                <p className="eyebrow">{p.tag}</p>
                <h3 className="h-title h3">{p.nom}</h3>
                <p>{p.description}</p>
                <a href={p.lien} target="_blank" rel="noopener noreferrer" className="btn">
                  Voir le site
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
