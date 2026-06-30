import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
      colors: { ink: "#050608", graphite: "#101418", mist: "#f4f5f2", signal: "#d7ff56", volt: "#71ff9b", brake: "#ff2b35" },
      boxShadow: { glow: "0 0 80px rgba(215,255,86,.18)" }
    }
  },
  plugins: []
};

export default config;
