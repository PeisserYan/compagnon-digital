import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const NAV = [
  ["/admin", "Tableau de bord"],
  ["/admin/factures", "Devis & factures"],
  ["/admin/echeances", "Échéances"],
  ["/admin/depenses", "Dépenses"],
  ["/admin/clients", "Clients"],
] as const;

async function logout() {
  "use server";
  await createClient().auth.signOut();
  redirect("/admin/login");
}

export default async function ConsoleLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: ok } = await supabase.rpc("is_admin");
  if (!ok) {
    await supabase.auth.signOut();
    redirect("/admin/login");
  }
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Mobile : barre du haut collante avec menu défilant ; ≥ md : barre latérale */}
      <aside
        className="sticky top-0 z-20 shrink-0 bg-white md:static md:w-56 md:p-5 md:flex md:flex-col md:gap-1 md:min-h-screen"
        style={{ borderBottom: "1px solid var(--gris-border)" }}
      >
        <div className="flex items-center justify-between px-4 pt-3 md:p-0 md:mb-4 md:block">
          <p className="text-lg font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Compagnon <span style={{ color: "var(--orange-texte)", fontStyle: "italic" }}>Digital</span></p>
          <form action={logout} className="md:hidden">
            <button className="text-sm py-2" style={{ color: "var(--gris-texte)" }}>Déconnexion</button>
          </form>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-2 pt-1 md:flex-col md:overflow-visible md:p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className="shrink-0 whitespace-nowrap rounded-md px-3 py-2.5 text-sm hover:bg-[var(--gris-clair)] md:py-2">{label}</Link>
          ))}
        </nav>
        <form action={logout} className="hidden md:block mt-auto">
          <button className="text-sm px-3 py-2" style={{ color: "var(--gris-texte)" }}>Déconnexion</button>
        </form>
      </aside>
      <main className="min-w-0 flex-1 p-4 md:p-8 max-w-6xl">{children}</main>
    </div>
  );
}
