import Image from "next/image";
import Link from "next/link";

// En-tête des pages intérieures (format GD « page-head ») : photo du héros en parallaxe sous un
// dégradé noir, sur-titre orange, titre à parallélogramme, texte d'intro, bouton facultatif.
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
    <section className="page-head on-dark">
      <div className="page-head__bg" data-parallax="0.15" aria-hidden="true">
        <Image src="/hero/hero-base.webp" alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "50% 70%" }} />
      </div>
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
