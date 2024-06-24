/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#03747E",
        secondary: "#2A3D45",
        third: "#DDC9B4",
        fourth: "#BCAC9B",
        "gray-light": "rgba(173,181,189,0.1)",
        "gray-semiDark": "rgb(173,181,189)",
        "gray-dark": "rgba(217, 217, 217, 1)",
      },
      boxShadow: {
        "custom-light": "0 2px 4px rgba(0, 0, 0, 0.1)",
        "custom-dark": "0 0 5px 2px rgba(0, 0, 0, 0.9)",
      },
    },
  },
  plugins: [],
};
