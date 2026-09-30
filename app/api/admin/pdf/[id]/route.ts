import { NextResponse } from "next/server";
import { createElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { FacturePDFDoc, type FactureData } from "@/components/admin/FacturePDF";
import type { Doc } from "@/lib/admin/types";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: ok } = await supabase.rpc("is_admin");
  if (!ok) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { data, error } = await supabase
    .from("documents")
    .select("*, clients(*)")
    .eq("id", params.id)
    .single();
  if (error || !data) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  const doc = data as unknown as Doc & { clients: Doc["client_snapshot"] };
  // Émis : on imprime le client figé à l'émission. Brouillon : client actuel.
  const c = doc.client_snapshot ?? doc.clients;
  const titre = doc.type === "devis" ? "Devis" : doc.type === "avoir" ? "Avoir" : "Facture";
  const rib =
    doc.type !== "avoir" && process.env.ADMIN_IBAN
      ? {
          titulaire: process.env.ADMIN_TITULAIRE ?? "",
          iban: process.env.ADMIN_IBAN,
          bic: process.env.ADMIN_BIC ?? "",
          banque: process.env.ADMIN_BANQUE ?? "",
        }
      : null;

  const pdfData: FactureData = {
    titre,
    numero: doc.numero ?? "",
    dateEmission: doc.date_emission,
    dateEcheance: doc.date_echeance ?? "",
    refContrat: doc.ref_contrat ?? "",
    clientSociete: c?.societe ?? "",
    clientNom: c?.nom ?? "",
    clientAdresse: c?.adresse ?? "",
    clientEmail: c?.email ?? "",
    clientSiret: c?.siret ?? "",
    lignes: doc.lignes,
    noteBasDePage: doc.note ?? "",
    rib,
  };

  const buffer = await renderToBuffer(createElement(FacturePDFDoc, { data: pdfData }) as never);
  const nom = `${doc.numero ?? "brouillon"}_${(c?.societe ?? "client").replace(/[^\w-]+/g, "_")}.pdf`;
  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${nom}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
