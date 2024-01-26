/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        // maxWidth: "620px",
        center: true,
        screens: {
          sm: '600px',
          md: '620px',
          lg: '620px',
          xl: '620px',
          '2xl': '620px',
        },
      },
    },
  },
  plugins: [],
};
