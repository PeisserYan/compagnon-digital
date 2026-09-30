import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

// Le site public n'est pas concerné : seules les routes admin passent ici.
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
