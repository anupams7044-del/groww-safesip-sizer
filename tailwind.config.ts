import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        groww: {
          green: "#00D09C",
          greenDark: "#00B386",
          greenLight: "#E8FAF4",
          dark: "#121212",
          surface: "#1E222B",
          card: "#FFFFFF",
          border: "#EBECEF",
          textMain: "#222222",
          textMuted: "#6B7280",
          amber: "#FFB020",
          amberLight: "#FFF7EB",
          red: "#EB5757",
          redLight: "#FDF2F2",
          blue: "#444CE7",
          blueLight: "#EEF4FF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
