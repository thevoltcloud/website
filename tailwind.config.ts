import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        volt: {
          yellow: "#F7D000",
          navy: "#0A1929",
          silver: "#C3CDD4",
          signal: "#E63946",
          ink: "#0D0F12",
          paper: "#F7F9FB",
        },
      },
    },
  },
  plugins: [],
};

export default config;
