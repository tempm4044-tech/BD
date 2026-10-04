import type { Config } from "tailwindcss";
export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { bd: { 50: "#f1f8f4", 500: "#0f9d58", 700: "#0b6b3a", 900: "#06281a" }, accent: "#d6403a" },
    fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] } } },
  plugins: [],
} satisfies Config;
