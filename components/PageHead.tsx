import Link from "next/link";

// En-tête des pages intérieures (format GD « page-head ») : fond noir à bandes diagonales (même motif
// que les sections sombres ; la photo du héros assombrie donnait un dégradé brun peu lisible, retirée le 19 nov. 2026),
// sur-titre orange, titre à parallélogramme, texte d'intro, bouton facultatif.
export default function PageHead({
  eyebrow,
  title,
  intro,
  cta,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  cta?: { href: string; label: string };
}) {
  return (
    <section className="page-head on-dark stripes">
      <div className="wrap">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="t-accent">{title}</h1>
        {intro && <p>{intro}</p>}
        {cta && (
          <Link href={cta.href} className="btn btn--light">
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}
