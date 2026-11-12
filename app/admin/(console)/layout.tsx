import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "./AdminNav";

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
    <div className="flex min-h-screen flex-col md:flex-row md:items-start">
      {/* Mobile : barre sombre collante en haut, menu défilant ; ≥ md : panneau latéral sombre flottant */}
      <aside className="adm-side stripes shrink-0">
        <div className="adm-side__inner">
          <div className="flex items-center justify-between px-4 pt-3 pb-1 md:block md:p-0">
            <Link href="/admin" className="adm-logo" aria-label="Tableau de bord">
              <Image src="/logo-compagnon-digital-sombre.svg" alt="Compagnon Digital" width={160} height={52} priority />
            </Link>
            <form action={logout} className="md:hidden">
              <button className="adm-logout">Déconnexion</button>
            </form>
          </div>
          <AdminNav />
          <form action={logout} className="hidden md:flex md:mt-auto">
            <button className="adm-logout">Déconnexion</button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 w-full flex-1 p-4 md:p-8 md:pt-10 max-w-6xl">{children}</main>
    </div>
  );
}
