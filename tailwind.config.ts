import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        forest: {
          DEFAULT: "#3D5A40",
          hover: "#2E4732",
          tint: "#E3E8E1",
          muted: "#6C7B6E",
          "muted-text": "#566859",
          "muted-tint": "#EEF1ED",
        },
        ink: {
          DEFAULT: "#262B25",
          muted: "#626963",
        },
        stone: "#EEEDE9",
        paper: "#FAFAF8",
        border: { DEFAULT: "#DBDAD3", focus: "#3D5A40" },
        state: {
          success: { DEFAULT: "#2F6B3F", bg: "#E7EEE5" },
          error: { DEFAULT: "#9C3424", bg: "#F6E4E0" },
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        h1: ["2rem", { lineHeight: "1.15" }],
        "h1-lg": ["3rem", { lineHeight: "1.15" }],
        h2: ["1.5rem", { lineHeight: "1.2" }],
        "h2-lg": ["2.25rem", { lineHeight: "1.2" }],
        h3: ["1.125rem", { lineHeight: "1.35" }],
        "h3-lg": ["1.375rem", { lineHeight: "1.35" }],
        body: ["1rem", { lineHeight: "1.6" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.6" }],
        caption: ["0.875rem", { lineHeight: "1.5" }],
        cta: ["1rem", { lineHeight: "1" }],
      },
      boxShadow: {
        resting: "0 1px 2px rgba(38, 43, 37, 0.06)",
        lifted: "0 4px 12px rgba(38, 43, 37, 0.10)",
      },
      spacing: {
        "section-y": "4rem",
        "section-y-lg": "6rem",
      },
    },
  },
  plugins: [],
};
export default config;
