export default function Footer() {
  return (
    <footer
      className="py-8 px-6 md:px-12"
      style={{ backgroundColor: "#111111" }}
    >
      <div
        className="flex flex-col items-center gap-4 text-sm md:flex-row md:justify-between"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        <span
          className="font-bold text-base"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "#FFFFFF",
          }}
        >
          Compagnon Digital
        </span>

        <span style={{ color: "#FFFFFF", opacity: 0.5 }}>
          Compagnon Digital · Savoie
        </span>

        <span style={{ color: "#FFFFFF", opacity: 0.5 }}>
          © 2026 Compagnon Digital
        </span>
      </div>
    </footer>
  );
}
