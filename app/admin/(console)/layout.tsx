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
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 bg-white p-5 flex flex-col gap-1" style={{ borderRight: "1px solid var(--gris-border)" }}>
        <p className="mb-4 text-lg font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Compagnon <span style={{ color: "var(--orange-texte)", fontStyle: "italic" }}>Digital</span></p>
        {NAV.map(([href, label]) => (
          <Link key={href} href={href} className="rounded-md px-3 py-2 text-sm hover:bg-[var(--gris-clair)]">{label}</Link>
        ))}
        <form action={logout} className="mt-auto">
          <button className="text-sm px-3 py-2" style={{ color: "var(--gris-texte)" }}>Déconnexion</button>
        </form>
      </aside>
      <main className="flex-1 p-8 max-w-6xl">{children}</main>
    </div>
  );
}
