import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Console | Compagnon Digital",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="adm min-h-screen">{children}</div>;
}
