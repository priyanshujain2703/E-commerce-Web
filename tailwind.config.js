/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f7f5',
          100: '#ecebe7',
          200: '#d8d5cc',
          300: '#b9b4a8',
          400: '#938b7c',
          500: '#756e61',
          600: '#5c564c',
          700: '#46423a',
          800: '#302e29',
          900: '#1f1e1b',
          950: '#11100e',
        },
        brass: {
          100: '#f5ead1',
          300: '#d8bd7d',
          500: '#aa7f35',
          700: '#71511f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(17, 16, 14, 0.08)',
      },
    },
  },
  plugins: [],
};
