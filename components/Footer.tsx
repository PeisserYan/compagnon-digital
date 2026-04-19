export default function Footer() {
  return (
    <footer
      className="py-8 px-6 md:px-12"
      style={{ backgroundColor: "var(--anthracite)" }}
    >
      <div
        className="flex flex-col items-center gap-4 text-sm md:flex-row md:justify-between"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        <span
          className="font-bold text-base"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--creme)",
          }}
        >
          Compagnon Digital
        </span>

        <span style={{ color: "var(--creme)", opacity: 0.5 }}>
          Agence web · Savoie
        </span>

        <span style={{ color: "var(--creme)", opacity: 0.5 }}>
          © 2025 Compagnon Digital
        </span>
      </div>
    </footer>
  );
}
