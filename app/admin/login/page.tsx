import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function login(formData: FormData) {
  "use server";
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  if (error) redirect("/admin/login?erreur=1");
  const { data: ok } = await supabase.rpc("is_admin");
  if (!ok) {
    await supabase.auth.signOut();
    redirect("/admin/login?erreur=1");
  }
  redirect("/admin");
}

export default function LoginPage({ searchParams }: { searchParams: { erreur?: string } }) {
  return (
    <main className="adm-login stripes flex items-center justify-center px-4 py-10">
      <div className="relative z-[1] w-full max-w-sm">
        <Image src="/logo-compagnon-digital-sombre.svg" alt="Compagnon Digital" width={180} height={60} priority className="mb-8 h-14 w-auto" />
        <form action={login} className="adm-card space-y-4 p-6 sm:p-8">
          <h1 className="adm-title t-accent">Console</h1>
          <input name="email" type="email" required autoComplete="email" placeholder="Email" className="w-full px-3 py-2.5 border text-base" style={{ borderColor: "var(--gris-border)" }} />
          <input name="password" type="password" required autoComplete="current-password" placeholder="Mot de passe" className="w-full px-3 py-2.5 border text-base" style={{ borderColor: "var(--gris-border)" }} />
          {searchParams.erreur && <p className="text-sm text-red-700">Identifiants invalides.</p>}
          <button className="adm-btn adm-btn--block">Se connecter</button>
        </form>
      </div>
    </main>
  );
}
