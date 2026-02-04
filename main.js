/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // あなたのファイル構成に合わせて調整
  ],
  theme: {
    extend: {
      colors: {
        base: '#FCFCFC',
        text: '#1A1A1A',
        accent: '#8C7B65',
      },
      letterSpacing: {
        cinematic: '0.4em',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Noto Serif JP"', 'serif'],
      },
    },
  },
  plugins: [],
}
