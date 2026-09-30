import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Console | Compagnon Digital",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen" style={{ background: "var(--gris-clair)", color: "var(--noir)" }}>{children}</div>;
}
