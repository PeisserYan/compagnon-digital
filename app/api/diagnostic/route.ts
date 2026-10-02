import { NextRequest, NextResponse } from "next/server";
import { GOOGLE_BOOKING_URL, QUESTIONS, libelle, priorite, type QuestionId, type Reponses } from "@/lib/diagnostic";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Ne garde que les réponses prévues : le client n'est jamais une source fiable. */
function nettoyer(brut: unknown): Reponses {
  const r: Reponses = {};
  if (!brut || typeof brut !== "object") return r;
  for (const q of QUESTIONS) {
    const v = (brut as Record<string, unknown>)[q.id];
    if (typeof v === "string" && q.options.some((o) => o.value === v)) r[q.id as QuestionId] = v;
  }
  return r;
}

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
  if (!prenom || telephone.replace(/\D/g, "").length < 9 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Coordonnées incomplètes" }, { status: 400 });
  }

  const reponses = nettoyer(body.reponses);
  const prio = priorite(reponses);
  const telLien = telephone.replace(/[^\d+]/g, "");

  // 1. À Yan : de quoi rappeler tout de suite
  const lignes = QUESTIONS.map(
    (q) => `<tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;width:220px">${esc(q.titre)}</td><td style="padding:8px 12px;border-bottom:1px solid #e0e0e0">${esc(libelle(q.id, reponses[q.id]))}</td></tr>`,
  ).join("");
  const htmlYan = `
    <div style="font-family:sans-serif;font-size:15px;max-width:600px">
      <p style="font-size:18px;margin:0 0 4px"><strong>${esc(prenom)}</strong> · <a href="tel:${esc(telLien)}">${esc(telephone)}</a></p>
      <p style="margin:0 0 16px"><a href="mailto:${esc(email)}">${esc(email)}</a></p>
      <p style="margin:0 0 16px"><strong>Priorité affichée :</strong> ${esc(prio.titre)}</p>
      <table style="border-collapse:collapse;width:100%">${lignes}</table>
      <p style="color:#777;font-size:13px;margin-top:16px">Rappel promis sous 24 h ouvrées.</p>
    </div>`;

  // 2. Au prospect : trace écrite + lien de réservation
  const htmlProspect = `
    <div style="font-family:sans-serif;font-size:15px;line-height:1.6;max-width:560px;color:#111">
      <p>Bonjour ${esc(prenom)},</p>
      <p>Merci pour vos réponses. Votre priorité : <strong>${esc(prio.titre)}</strong>.</p>
      <p style="color:#444">${esc(prio.constat)}</p>
      <p>Je vous appelle sous 24 h (jours ouvrés) pour en parler 15 minutes. Si vous préférez choisir le moment :</p>
      <p><a href="${GOOGLE_BOOKING_URL}" style="display:inline-block;background:#111;color:#fff;padding:12px 22px;text-decoration:none;border-radius:2px">Choisir mon créneau</a></p>
      <p style="margin-top:28px">Yan Peisser<br/><span style="color:#777">Compagnon Digital · 06 73 40 14 75</span></p>
    </div>`;

  try {
    // L'email à Yan est le seul indispensable : s'il part, la demande est bien reçue.
    await brevo({
      sender: { name: "Compagnon Digital", email: "yan@compagnondigital.fr" },
      to: [{ email: "yan@compagnondigital.fr", name: "Yan Peisser" }],
      replyTo: { email, name: prenom },
      subject: `À rappeler : ${prenom} · ${telephone} · priorité ${prio.titre}`,
      htmlContent: htmlYan,
    });
  } catch (err) {
    console.error("[diagnostic] email interne échoué :", err instanceof Error ? err.message : err);
    return NextResponse.json({ success: false, error: "Envoi impossible" }, { status: 500 });
  }

  try {
    await brevo({
      sender: { name: "Yan · Compagnon Digital", email: "yan@compagnondigital.fr" },
      to: [{ email, name: prenom }],
      replyTo: { email: "yan@compagnondigital.fr", name: "Yan Peisser" },
      subject: "Votre diagnostic · Compagnon Digital",
      htmlContent: htmlProspect,
    });
  } catch (err) {
    console.error("[diagnostic] email prospect échoué :", err instanceof Error ? err.message : err);
  }

  return NextResponse.json({ success: true });
}
