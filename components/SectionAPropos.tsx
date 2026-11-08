import Image from "next/image";

// Format GD Concept : texte + grande photo arrondie (10 px) en parallaxe douce.
export default function SectionAPropos() {
  return (
    <section id="apropos" className="section">
      <div className="wrap intro__grid">
        <div className="intro__text" data-reveal>
          <p className="eyebrow">À propos</p>
          <h2 className="h-title h2 t-accent">Comprendre une activité, pour la faire grandir.</h2>
          <p>
            Ce qui m&apos;intéresse, c&apos;est comprendre comment une activité fonctionne et comment elle se vend, que ce soit celle d&apos;un auto-entrepreneur ou d&apos;une structure plus grande. Diplômé en marketing et finance d&apos;HEC Montréal, il était logique de mettre ces compétences à leur service : aider les indépendants et les entreprises à être trouvés par les bons clients, avec un site qui travaille vraiment pour eux.
          </p>
          <p>
            Un site n&apos;est qu&apos;un maillon. Ce qui compte, c&apos;est toute la chaîne : être trouvé, convaincre, être contacté. C&apos;est cette chaîne que je regarde en premier, avant de toucher à quoi que ce soit.
          </p>
        </div>

        <div className="photo" data-reveal>
          <div className="photo__inner" data-parallax="0.1">
            <Image src="/yan.jpg" alt="Yan — Compagnon Digital" fill sizes="(max-width: 1100px) 100vw, 45vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
