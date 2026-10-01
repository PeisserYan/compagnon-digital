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
    <main className="min-h-screen flex items-center justify-center px-4">
      <form action={login} className="w-full max-w-sm bg-white rounded-xl p-6 sm:p-8 space-y-4" style={{ border: "1px solid var(--gris-border)" }}>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Console</h1>
        <input name="email" type="email" required autoComplete="email" placeholder="Email" className="w-full rounded-md px-3 py-2.5 border text-base" style={{ borderColor: "var(--gris-border)" }} />
        <input name="password" type="password" required autoComplete="current-password" placeholder="Mot de passe" className="w-full rounded-md px-3 py-2.5 border text-base" style={{ borderColor: "var(--gris-border)" }} />
        {searchParams.erreur && <p className="text-sm text-red-700">Identifiants invalides.</p>}
        <button className="w-full rounded-md py-2.5 text-white font-medium" style={{ background: "var(--orange-texte)" }}>Se connecter</button>
      </form>
    </main>
  );
}
