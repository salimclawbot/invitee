import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#C9A84C",
        "gold-light": "#E8C97A",
        "gold-dim": "#8A6E2F",
        bg: "#0A0A0A",
        surface: "#111111",
        surface2: "#181818",
        surface3: "#222222",
        text: "#F0EDE8",
        "text-dim": "#8A8478",
        green: "#4CAF7D",
        red: "#E05C5C",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      borderColor: {
        border: "rgba(201,168,76,0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
