/** @type {import('next').NextConfig} */
const nextConfig = {
  // Offre IA archivée (oct. 2026) : pages conservées dans app/ia, mais inaccessibles.
  // Pour la réactiver : supprimer ce bloc, remettre le lien dans la Navbar et l'entrée du sitemap.
  async redirects() {
    return [
      { source: "/ia", destination: "/", permanent: false },
      { source: "/ia/:path*", destination: "/", permanent: false },
      { source: "/diagnostic", destination: "/#diagnostic", permanent: false },
    ];
  },
  experimental: {
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
  },
};

export default nextConfig;
