/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'light': '#c5c8c6',
      'borderColor': '#232528',
      'buttonGradient': '#252628',
      'buttonBG': '#1b1c1e',
      'buttonText': '#707070',
      'buttonBorder': '#282a2e',
      'labelBG': '#282a2e',
      'labelBorder': '#111',
      'inputBorder': '#aaa'
    },
    fontFamily: {
      'tahoma': ['Tahoma', 'sans-serif'],
      'arial': ['arial', 'helvetica', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
