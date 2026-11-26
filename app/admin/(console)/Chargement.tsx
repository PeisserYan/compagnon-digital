// Squelette affiché instantanément pendant le chargement d'une page de la console.
// Rendu par les loading.tsx : Next.js le précharge avec les liens, donc le clic
// réagit tout de suite au lieu d'attendre la réponse de Supabase.
export default function Chargement() {
  return (
    <div className="space-y-5" aria-busy="true" aria-live="polite">
      <span className="sr-only">Chargement…</span>
      <div className="adm-skel h-8 w-64 max-w-full" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[0, 1, 2, 3].map((i) => <div key={i} className="adm-skel h-24" />)}
      </div>
      <div className="adm-skel h-56" />
      <div className="adm-skel h-40" />
    </div>
  );
}
