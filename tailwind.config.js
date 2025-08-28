/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'quicksand': ['var(--font-quicksand)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
        'dancing-script': ['var(--font-dancing-script)', 'cursive'],
        'sacramento': ['var(--font-sacramento)', 'cursive'],
      },
    },
  },
  plugins: [],
}; 