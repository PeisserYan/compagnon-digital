import { NextRequest, NextResponse } from "next/server";
import { GOOGLE_BOOKING_URL } from "@/lib/diagnostic";
import { PACKS, estPack } from "@/lib/packs";

// Demande directe d'un pack de visibilité : le prospect sait ce qu'il veut, pas de diagnostic.

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
  const prenom = txt(body.prenom, 80);
  const telephone = txt(body.telephone, 30);
  const email = txt(body.email, 160);
  const site = txt(body.site, 200);
  if (!estPack(body.pack) || !prenom || telephone.replace(/\D/g, "").length < 9 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Demande incomplète" }, { status: 400 });
  }
  const pack = PACKS[body.pack];
  const telLien = telephone.replace(/[^\d+]/g, "");

  const htmlYan = `
    <div style="font-family:sans-serif;font-size:15px;max-width:600px">
      <p style="font-size:18px;margin:0 0 4px"><strong>${esc(prenom)}</strong> · <a href="tel:${esc(telLien)}">${esc(telephone)}</a></p>
      <p style="margin:0 0 16px"><a href="mailto:${esc(email)}">${esc(email)}</a></p>
      <p style="margin:0 0 8px"><strong>Pack demandé :</strong> ${esc(pack.nom)} (${esc(pack.prix)})</p>
      <p style="margin:0 0 16px"><strong>Site actuel :</strong> ${site ? esc(site) : "non renseigné"}</p>
      <p style="color:#777;font-size:13px">Demande directe depuis la page Visibilité. Rappel promis sous 24 h ouvrées pour lancer la mise en place.</p>
    </div>`;

  const htmlProspect = `
    <div style="font-family:sans-serif;font-size:15px;line-height:1.6;max-width:560px;color:#111">
      <p>Bonjour ${esc(prenom)},</p>
      <p>J'ai bien reçu votre demande pour le <strong>${esc(pack.nom)}</strong>.</p>
      <p>Je vous appelle sous 24 h (jours ouvrés) pour vérifier votre situation, confirmer le prix par écrit et lancer la mise en place. Si vous préférez choisir le moment :</p>
      <p><a href="${GOOGLE_BOOKING_URL}" style="display:inline-block;background:#111;color:#fff;padding:12px 22px;text-decoration:none;border-radius:2px">Choisir mon créneau</a></p>
      <p style="margin-top:28px">Yan Peisser<br/><span style="color:#777">Compagnon Digital · 06 73 40 14 75</span></p>
    </div>`;

  try {
    await brevo({
      sender: { name: "Compagnon Digital", email: "yan@compagnondigital.fr" },
      to: [{ email: "yan@compagnondigital.fr", name: "Yan Peisser" }],
      replyTo: { email, name: prenom },
      subject: `Pack demandé : ${pack.nom} · ${prenom} · ${telephone}`,
      htmlContent: htmlYan,
    });
  } catch (err) {
    console.error("[demande-pack] email interne échoué :", err instanceof Error ? err.message : err);
    return NextResponse.json({ success: false, error: "Envoi impossible" }, { status: 500 });
  }

  try {
    await brevo({
      sender: { name: "Yan · Compagnon Digital", email: "yan@compagnondigital.fr" },
      to: [{ email, name: prenom }],
      replyTo: { email: "yan@compagnondigital.fr", name: "Yan Peisser" },
      subject: "Votre demande · Compagnon Digital",
      htmlContent: htmlProspect,
    });
  } catch (err) {
    console.error("[demande-pack] email prospect échoué :", err instanceof Error ? err.message : err);
  }

  return NextResponse.json({ success: true });
}
