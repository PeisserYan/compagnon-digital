import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

export type LigneFacture = {
  description: string
  quantite: number
  prixUnitaire: number
  descriptionSecondaire?: string
}

export type FactureData = {
  numero: string
  dateEmission: string
  dateEcheance: string
  clientSociete: string
  clientNom: string
  clientAdresse: string
  clientEmail: string
  clientSiret: string
  lignes: LigneFacture[]
  noteBasDePage: string
  refContrat: string
  titre?: string
  rib?: { titulaire: string; iban: string; bic: string; banque: string } | null
}

function nombreEnLettres(n: number): string {
  const unites = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf',
    'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf']
  const dizaines = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt']
  if (n === 0) return 'zéro'
  const entier = Math.floor(n)
  const centimes = Math.round((n - entier) * 100)
  const convertir = (num: number): string => {
    if (num === 0) return ''
    if (num < 20) return unites[num]
    if (num < 100) {
      const d = Math.floor(num / 10), u = num % 10
      if (d === 6 || d === 8) return dizaines[d] + (u === 0 ? (d === 8 ? 's' : '') : '-' + (d === 6 ? unites[10 + u] : unites[u]))
      if (d === 7) return 'soixante-' + (u === 1 ? 'et-onze' : unites[10 + u])
      return dizaines[d] + (u === 0 ? '' : (u === 1 && d !== 8 ? '-et-un' : '-' + unites[u]))
    }
    if (num < 1000) {
      const c = Math.floor(num / 100), r = num % 100
      return (c === 1 ? 'cent' : unites[c] + ' cent' + (r === 0 && c > 1 ? 's' : '')) + (r > 0 ? ' ' + convertir(r) : '')
    }
    const m = Math.floor(num / 1000), r = num % 1000
    return (m === 1 ? 'mille' : convertir(m) + ' mille') + (r > 0 ? ' ' + convertir(r) : '')
  }
  let result = convertir(entier)
  if (centimes > 0) result += ` euro${entier > 1 ? 's' : ''} et ${convertir(centimes)} centime${centimes > 1 ? 's' : ''}`
  else result += ` euro${entier > 1 ? 's' : ''}`
  return result.charAt(0).toUpperCase() + result.slice(1)
}

function fmt(n: number) {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'
}

function formatDate(dateStr: string) {
  if (!dateStr) return '___'
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const S = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 9, color: '#1a1a1a', paddingTop: 48, paddingBottom: 72, paddingLeft: 52, paddingRight: 52, lineHeight: 1.55 },

  // Titre
  factureTitle: { fontFamily: 'Helvetica', fontSize: 28, color: '#1a1a1a', marginBottom: 4, letterSpacing: -0.5 },
  factureNum: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#B8722A', marginBottom: 32 },

  // Bloc DE / POUR / META en 3 colonnes
  infoRow: { flexDirection: 'row', marginBottom: 32 },
  infoCol: { flex: 1 },
  infoColMeta: { flex: 1, alignItems: 'flex-end' },
  infoLabel: { fontFamily: 'Helvetica-Bold', fontSize: 7, color: '#aaa', letterSpacing: 0.8, marginBottom: 6 },
  infoNom: { fontFamily: 'Helvetica-Bold', fontSize: 10, marginBottom: 2 },
  infoLine: { fontSize: 8.5, color: '#333', marginBottom: 1.5 },
  metaLabel: { fontSize: 7, color: '#aaa', letterSpacing: 0.6, marginBottom: 2, textAlign: 'right' },
  metaValue: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, marginBottom: 8, textAlign: 'right' },

  // Table
  tableHeader: { flexDirection: 'row', paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#1a1a1a', borderBottomStyle: 'solid', marginBottom: 0 },
  tableHeaderText: { fontFamily: 'Helvetica-Bold', fontSize: 7.5, color: '#888', letterSpacing: 0.5 },
  tableRow: { flexDirection: 'row', paddingVertical: 9, borderBottomWidth: 0.5, borderBottomColor: '#e8e8e8', borderBottomStyle: 'solid', alignItems: 'flex-start' },
  tableRowAlt: { flexDirection: 'row', paddingVertical: 9, borderBottomWidth: 0.5, borderBottomColor: '#e8e8e8', borderBottomStyle: 'solid', alignItems: 'flex-start', backgroundColor: '#fafafa' },
  colDesc: { flex: 1, paddingRight: 10 },
  colDescTitle: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, marginBottom: 2 },
  colDescSub: { fontSize: 8, color: '#777' },
  colQte: { width: 36, textAlign: 'center', fontSize: 8.5 },
  colPU: { width: 68, textAlign: 'right', fontSize: 8.5 },
  colMt: { width: 72, textAlign: 'right', fontSize: 8.5 },

  // Totaux — ligne avec lettres à gauche, montants à droite
  totauxRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, marginBottom: 4 },
  totauxLeft: { flex: 1 },
  totauxRight: { width: 220 },
  montantLettres: { fontSize: 8, color: '#888', fontStyle: 'italic', paddingTop: 4 },
  totauxLine: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  totauxLabel: { fontSize: 8.5, color: '#666' },
  totauxValue: { fontSize: 8.5 },
  totauxFinalLine: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8, marginTop: 4, borderTopWidth: 1.5, borderTopColor: '#B8722A', borderTopStyle: 'solid' },
  totauxFinalLabel: { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  totauxFinalValue: { fontFamily: 'Helvetica-Bold', fontSize: 11 },

  // RIB
  ribBox: { marginTop: 24, paddingTop: 12, paddingBottom: 12, borderTopWidth: 0.5, borderTopColor: '#ddd', borderTopStyle: 'solid', borderBottomWidth: 0.5, borderBottomColor: '#ddd', borderBottomStyle: 'solid' },
  ribTitle: { fontFamily: 'Helvetica-Bold', fontSize: 7.5, color: '#B8722A', letterSpacing: 0.6, marginBottom: 8 },
  ribRow: { flexDirection: 'row', marginBottom: 3 },
  ribLabel: { fontSize: 8, color: '#999', width: 60 },
  ribValue: { fontFamily: 'Helvetica-Bold', fontSize: 8 },

  // Note
  noteText: { fontSize: 8, color: '#555', marginTop: 12 },

  // Footer absolu en bas
  footer: { position: 'absolute', bottom: 28, left: 52, right: 52, borderTopWidth: 0.5, borderTopColor: '#ddd', borderTopStyle: 'solid', paddingTop: 6 },
  footerText: { fontSize: 7, color: '#aaa', marginBottom: 2 },
})

export function FacturePDFDoc({ data }: { data: FactureData }) {
  const totalHT = data.lignes.reduce((sum, l) => sum + l.quantite * l.prixUnitaire, 0)

  // Sépare titre et sous-titre si la description contient " — "
  const parseLigne = (desc: string) => {
    const parts = desc.split(' — ')
    return { titre: parts[0] || '', sous: parts.slice(1).join(' — ') || '' }
  }

  return (
    <Document>
      <Page size="A4" style={S.page}>

        {/* Titre */}
        <Text style={S.factureTitle}>{data.titre || 'Facture'}</Text>
        <Text style={S.factureNum}>{data.numero || 'BROUILLON'}</Text>

        {/* DE / POUR / META */}
        <View style={S.infoRow}>
          <View style={S.infoCol}>
            <Text style={S.infoLabel}>DE</Text>
            <Text style={S.infoNom}>Compagnon Digital</Text>
            <Text style={S.infoLine}>Yan Peisser</Text>
            <Text style={S.infoLine}>10 Croix De Saint Maure</Text>
            <Text style={S.infoLine}>73630 Jarsy</Text>
            <Text style={S.infoLine}>yan@compagnondigital.fr</Text>
            <Text style={S.infoLine}>SIRET : 103 262 150 00016</Text>
          </View>
          <View style={S.infoCol}>
            <Text style={S.infoLabel}>POUR</Text>
            <Text style={S.infoNom}>{data.clientSociete || '_______________'}</Text>
            {data.clientNom ? <Text style={S.infoLine}>{data.clientNom}</Text> : null}
            {data.clientAdresse ? <Text style={S.infoLine}>{data.clientAdresse}</Text> : null}
            {data.clientEmail ? <Text style={S.infoLine}>{data.clientEmail}</Text> : null}
            {data.clientSiret ? <Text style={S.infoLine}>SIRET : {data.clientSiret}</Text> : null}
          </View>
          <View style={S.infoColMeta}>
            <Text style={S.metaLabel}>Date d'émission</Text>
            <Text style={S.metaValue}>{formatDate(data.dateEmission)}</Text>
            <Text style={S.metaLabel}>Date d'échéance</Text>
            <Text style={S.metaValue}>{formatDate(data.dateEcheance)}</Text>
            <Text style={S.metaLabel}>Nature</Text>
            <Text style={S.metaValue}>Prestation de services</Text>
            {data.refContrat ? <>
              <Text style={S.metaLabel}>Réf. contrat</Text>
              <Text style={S.metaValue}>{data.refContrat}</Text>
            </> : null}
          </View>
        </View>

        {/* Tableau */}
        <View style={S.tableHeader}>
          <Text style={{ ...S.tableHeaderText, flex: 1 }}>DESCRIPTION</Text>
          <Text style={{ ...S.tableHeaderText, width: 36, textAlign: 'center' }}>QTÉ</Text>
          <Text style={{ ...S.tableHeaderText, width: 68, textAlign: 'right' }}>PRIX UNITAIRE</Text>
          <Text style={{ ...S.tableHeaderText, width: 72, textAlign: 'right' }}>MONTANT</Text>
        </View>

        {data.lignes.map((ligne, i) => {
          const { titre, sous } = parseLigne(ligne.description)
          return (
            <View key={i} style={i % 2 === 0 ? S.tableRow : S.tableRowAlt}>
              <View style={S.colDesc}>
                <Text style={S.colDescTitle}>{titre || ligne.description}</Text>
                {sous ? <Text style={S.colDescSub}>{sous}</Text> : null}
              </View>
              <Text style={S.colQte}>{ligne.quantite}</Text>
              <Text style={S.colPU}>{fmt(ligne.prixUnitaire)}</Text>
              <Text style={S.colMt}>{fmt(ligne.quantite * ligne.prixUnitaire)}</Text>
            </View>
          )
        })}

        {/* Totaux avec lettres à gauche */}
        <View style={S.totauxRow}>
          <View style={S.totauxLeft}>
            <Text style={S.montantLettres}>Arrêtée à la somme de {nombreEnLettres(totalHT)}.</Text>
          </View>
          <View style={S.totauxRight}>
            <View style={S.totauxLine}>
              <Text style={S.totauxLabel}>Total HT</Text>
              <Text style={S.totauxValue}>{fmt(totalHT)}</Text>
            </View>
            <View style={S.totauxLine}>
              <Text style={S.totauxLabel}>TVA non applicable, art. 293B du CGI</Text>
              <Text style={S.totauxValue}>0,00 €</Text>
            </View>
            <View style={S.totauxFinalLine}>
              <Text style={S.totauxFinalLabel}>Total TTC</Text>
              <Text style={S.totauxFinalValue}>{fmt(totalHT)}</Text>
            </View>
          </View>
        </View>

        {/* RIB (serveur uniquement, via variables d'environnement) */}
        {data.rib ? (
          <View style={S.ribBox}>
            <Text style={S.ribTitle}>RÈGLEMENT PAR VIREMENT BANCAIRE</Text>
            <View style={S.ribRow}><Text style={S.ribLabel}>Titulaire :</Text><Text style={S.ribValue}>{data.rib.titulaire}</Text></View>
            <View style={S.ribRow}><Text style={S.ribLabel}>IBAN :</Text><Text style={S.ribValue}>{data.rib.iban}</Text></View>
            <View style={S.ribRow}><Text style={S.ribLabel}>BIC :</Text><Text style={S.ribValue}>{data.rib.bic}{data.rib.banque ? ' — ' + data.rib.banque : ''}</Text></View>
          </View>
        ) : null}

        {data.noteBasDePage ? <Text style={S.noteText}>{data.noteBasDePage}</Text> : null}

        {/* Footer absolu */}
        <View style={S.footer} fixed>
          <Text style={S.footerText}>TVA non applicable, art. 293B du CGI — Yan Peisser, auto-entrepreneur, SIRET 103 262 150 00016</Text>
          <Text style={S.footerText}>En cas de retard de paiement : pénalités au taux légal + indemnité forfaitaire de 40 € (art. L. 441-10 C. com.){data.noteBasDePage ? ' — ' + data.noteBasDePage : ''}</Text>
        </View>

      </Page>
    </Document>
  )
}

