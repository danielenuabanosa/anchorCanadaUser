/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'instrument-serif': ['var(--font-instrument-serif)', 'serif'],
          'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };
  
  
  