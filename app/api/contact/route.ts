import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prenom, metier, ville, telephone, email, projet } = await req.json();

  if (!prenom || !metier || !ville || !telephone || !email || !projet) {
    return NextResponse.json({ success: false, error: "Champs manquants" }, { status: 400 });
  }

  const htmlContent = `
    <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%;max-width:480px">
      <tbody>
        <tr>
          <td style="padding:10px 14px;background:#f5f5f5;font-weight:600;width:120px">Prénom</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e0e0e0">${prenom}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;background:#f5f5f5;font-weight:600">Métier</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e0e0e0">${metier}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;background:#f5f5f5;font-weight:600">Ville</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e0e0e0">${ville}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;background:#f5f5f5;font-weight:600">Téléphone</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e0e0e0">${telephone}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;background:#f5f5f5;font-weight:600">Email</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e0e0e0">${email}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;background:#f5f5f5;font-weight:600;vertical-align:top">Projet</td>
          <td style="padding:10px 14px">${projet}</td>
        </tr>
      </tbody>
    </table>
  `;

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { name: "Compagnon Digital", email: "yan@compagnondigital.fr" },
        to: [{ email: "yan@compagnondigital.fr", name: "Yan Peisser" }],
        replyTo: { email },
        subject: "Nouvelle demande — Compagnon Digital",
        htmlContent,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
