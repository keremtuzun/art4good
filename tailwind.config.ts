import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces — warm paper
        cream: "#FBF6EE",
        "cream-2": "#F4ECE0",
        paper: "#FFFFFF",
        ink: "#1C2637",
        "ink-soft": "#43506410",
        muted: "#5D6B80",
        line: "#E7DFD2",
        // Brand palette — pulled from the Art4Good paint-splash mark
        brand: {
          red: "#E4572E",
          orange: "#FF8A3D",
          yellow: "#FFC24B",
          green: "#35B36B",
          teal: "#14AEB0",
          blue: "#2F6FE0",
          purple: "#8A5CD6",
          pink: "#EA5C9B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      borderRadius: {
        blob: "42% 58% 63% 37% / 41% 44% 56% 59%",
      },
      boxShadow: {
        soft: "0 18px 50px -24px rgba(28, 38, 55, .35)",
        lift: "0 40px 90px -40px rgba(28, 38, 55, .55)",
      },
      maxWidth: {
        wrap: "1200px",
      },
      keyframes: {
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float-y": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "draw": {
          to: { "stroke-dashoffset": "0" },
        },
      },
      animation: {
        marquee: "marquee-x 30s linear infinite",
        float: "float-y 7s ease-in-out infinite",
        "spin-slow": "spin-slow 26s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
