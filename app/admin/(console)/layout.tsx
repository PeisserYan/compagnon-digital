import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminHeader from "./AdminHeader";

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
    <>
      <AdminHeader logout={logout} />
      <main className="adm-main">{children}</main>
    </>
  );
}
