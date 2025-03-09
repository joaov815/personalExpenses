export default {
  darkMode: false,
  content: [
    "./src/**/*.{html,ts}", // ✅ Include all Angular templates
    "./node_modules/primeng/**/*.{css,scss}", // ✅ Ensure Tailwind processes PrimeNG styles
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007BFF", // 🔹 Set your Tailwind primary color
        text: "#000000",
      },
    },
  },
};
