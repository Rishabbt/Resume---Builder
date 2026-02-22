/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:       ["'DM Sans'", "sans-serif"],
        serif:      ["'Playfair Display'", "serif"],
        mono:       ["'IBM Plex Mono'", "monospace"],
        cormorant:  ["'Cormorant Garamond'", "serif"],
      },
      colors: {
        ink:    "#1a1a2e",
        accent: "#e63946",
        gold:   "#f4a261",
      },
      animation: {
        "slide-up": "slideUp 0.3s cubic-bezier(0.34,1.4,0.64,1)",
        "fade-in":  "fadeIn 0.2s ease",
      },
      keyframes: {
        slideUp: {
          from: { transform: "translateY(24px)", opacity: "0" },
          to:   { transform: "translateY(0)",    opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
