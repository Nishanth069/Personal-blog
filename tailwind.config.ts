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
        base: "#0a0a0a",
        surface: "#111111",
        elevated: "#18181b",
        border: "#27272a",
        primary: "#fafafa",
        secondary: "#a1a1aa",
        muted: "#71717a",
        accent: "#38bdf8",
        "accent-hover": "#7dd3fc",
        "accent-glow": "rgba(56, 189, 248, 0.15)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-cormorant)"],
        mono: ["var(--font-roboto-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
