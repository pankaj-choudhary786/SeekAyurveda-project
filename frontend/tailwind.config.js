/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFE4BB",
        "deep-teal": "#286459",
      },
      borderColor: {
        glass: "rgba(255, 255, 255, 0.25)",
      },
      boxShadow: {
        glass: "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
      },
    },
  },
  plugins: [],
};
