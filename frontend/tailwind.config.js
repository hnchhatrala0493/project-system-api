/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#172033",
        steel: "#526070",
        mint: "#13A37F",
        coral: "#F46D5E",
        amber: "#F5A524",
        cloud: "#F6F8FB",
      },
      boxShadow: {
        panel: "0 16px 40px rgba(23, 32, 51, 0.08)",
      },
    },
  },
  plugins: [],
};
