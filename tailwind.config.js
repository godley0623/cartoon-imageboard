/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      'xxs': '.6rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
     },
    colors: {
      'light': '#c5c8c6',
      'quote': '#91aa5a',
      'reply': '#5f89ac',
      'borderColor': '#232528',
      'buttonGradient': '#252628',
      'buttonBG': '#1b1c1e',
      'buttonText': '#707070',
      'buttonBorder': '#282a2e',
      'labelBG': '#282a2e',
      'labelBorder': '#111',
      'inputBorder': '#aaa',
      'nameColor': '#1e7c4a',
      'subjectColor': '#4537ff',
      'replyBG': '#292c2f',
      'black': '#000000',
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
