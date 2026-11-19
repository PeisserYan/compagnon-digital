import { NextRequest, NextResponse } from "next/server";
import { GOOGLE_BOOKING_URL } from "@/lib/diagnostic";
import {
  CREATION_DELAI,
  CREATION_TYPE,
  VISIBILITE_PRIORITE,
  libelle,
  normaliserUrl,
  prenomDe,
  type Option,
} from "@/lib/tunnel";

// Branches A (création) et B (visibilité) du tunnel. La branche C passe par /api/diagnostic.

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

async function brevo(payload: object) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": process.env.BREVO_API_KEY! },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
}

/** Ne garde qu'une valeur prévue : le client n'est jamais une source fiable. */
const choix = (options: Option[], v: unknown) =>
  typeof v === "string" && options.some((o) => o.value === v) ? v : undefined;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Requête invalide" }, { status: 400 });
  }

  // Pot de miel rempli = robot : on répond "ok" sans rien envoyer.
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ success: true });

  const txt = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const branche = body.branche === "creation" || body.branche === "visibilite" ? body.branche : null;
  const nom = txt(body.nom, 120);
  const telephone = txt(body.telephone, 30);
  const email = txt(body.email, 160);
  if (!branche || !nom || telephone.replace(/\D/g, "").length < 9 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Coordonnées incomplètes" }, { status: 400 });
  }

  let lignes: [string, string][];
  let sujet: string;
  if (branche === "creation") {
    const type = choix(CREATION_TYPE, body.type);
    const delai = choix(CREATION_DELAI, body.delai);
    const entreprise = txt(body.entreprise, 160);
    if (!type || !delai || !entreprise) {
      return NextResponse.json({ success: false, error: "Réponses incomplètes" }, { status: 400 });
    }
    lignes = [
      ["Parcours", "A · Création / refonte de site"],
      ["Entreprise / métier", entreprise],
      ["Type de site", libelle(CREATION_TYPE, type)],
      ["Mise en ligne souhaitée", libelle(CREATION_DELAI, delai)],
    ];
    sujet = `Projet de site : ${nom} · ${entreprise} · ${telephone}`;
  } else {
    const url = normaliserUrl(txt(body.url, 300));
    const priorite = choix(VISIBILITE_PRIORITE, body.priorite);
    const ville = txt(body.ville, 120);
    if (!url || !priorite || !ville) {
      return NextResponse.json({ success: false, error: "Réponses incomplètes" }, { status: 400 });
    }
    lignes = [
      ["Parcours", "B · Visibilité (site existant)"],
      ["Site actuel", url],
      ["Priorité", libelle(VISIBILITE_PRIORITE, priorite)],
      ["Ville / zone", ville],
    ];
    sujet = `Visibilité : ${nom} · ${ville} · ${telephone}`;
  }

  const prenom = prenomDe(nom);
  const telLien = telephone.replace(/[^\d+]/g, "");
  const tableau = lignes
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;width:200px">${esc(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #e0e0e0">${esc(v)}</td></tr>`,
    )
    .join("");

  const htmlYan = `
    <div style="font-family:sans-serif;font-size:15px;max-width:600px">
      <p style="font-size:18px;margin:0 0 4px"><strong>${esc(nom)}</strong> · <a href="tel:${esc(telLien)}">${esc(telephone)}</a></p>
      <p style="margin:0 0 16px"><a href="mailto:${esc(email)}">${esc(email)}</a></p>
      <table style="border-collapse:collapse;width:100%">${tableau}</table>
      <p style="color:#777;font-size:13px;margin-top:16px">${
        branche === "visibilite"
          ? "Promis au prospect : vérifier sa position Google et la réponse de ChatGPT sur son métier + sa ville avant l'appel."
          : "Promis au prospect : tarif exact et délai de mise en ligne confirmés en fin d'appel."
      }</p>
    </div>`;

  const corpsProspect =
    branche === "creation"
      ? "<p>Votre demande est bien enregistrée. Si ce n'est pas déjà fait, choisissez un créneau de 15 minutes pour qu'on fasse le tour de votre activité. Je vous confirmerai le tarif exact et le délai de mise en ligne dès la fin de l'appel.</p>"
      : "<p>C'est noté. Avant notre échange, je vais vérifier comment vous ressortez aujourd'hui sur Google et ce que répond ChatGPT quand on cherche votre métier dans votre secteur. Si ce n'est pas déjà fait, bloquez un créneau pour qu'on regarde ça ensemble.</p>";

  const htmlProspect = `
    <div style="font-family:sans-serif;font-size:15px;line-height:1.6;max-width:560px;color:#111">
      <p>Bonjour ${esc(prenom)},</p>
      ${corpsProspect}
      <p><a href="${GOOGLE_BOOKING_URL}" style="display:inline-block;background:#111;color:#fff;padding:12px 22px;text-decoration:none;border-radius:2px">Choisir mon créneau</a></p>
      <p style="margin-top:28px">Yan Peisser<br/><span style="color:#777">Compagnon Digital · 06 73 40 14 75</span></p>
    </div>`;

  try {
    // L'email à Yan est le seul indispensable : s'il part, la demande est bien reçue.
    await brevo({
      sender: { name: "Compagnon Digital", email: "yan@compagnondigital.fr" },
      to: [{ email: "yan@compagnondigital.fr", name: "Yan Peisser" }],
      replyTo: { email, name: nom },
      subject: sujet,
      htmlContent: htmlYan,
    });
  } catch (err) {
    console.error("[projet] email interne échoué :", err instanceof Error ? err.message : err);
    return NextResponse.json({ success: false, error: "Envoi impossible" }, { status: 500 });
  }

  try {
    await brevo({
      sender: { name: "Yan · Compagnon Digital", email: "yan@compagnondigital.fr" },
      to: [{ email, name: nom }],
      replyTo: { email: "yan@compagnondigital.fr", name: "Yan Peisser" },
      subject: branche === "creation" ? "Votre projet de site · Compagnon Digital" : "Votre visibilité Google & IA · Compagnon Digital",
      htmlContent: htmlProspect,
    });
  } catch (err) {
    console.error("[projet] email prospect échoué :", err instanceof Error ? err.message : err);
  }

  return NextResponse.json({ success: true });
}
