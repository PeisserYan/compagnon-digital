"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{ position: "relative", height: "80%", width: "100%", opacity: 1 }}>
          <Image
            src="/icon-navbar.png"
            alt=""
            fill
            style={{ objectFit: "contain" }}
            priority={false}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
