/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "hero-pattern": "url('/src/assets/heroImage.jpg')",
      }),
     
    },

    fontFamily: {
      display: ["Playfair Display"],
      body: ["Inter"],
    },
  },
  plugins: [],
};
