/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D0D0D',
        accent: '#2D5A3D',
        gold: '#9B7A3A',
        cream: '#FAF8F4',
        'warm-bg': '#FAF8F4',
        'warm-border': '#E8E3D9',
        muted: '#8C8C8C',
        'card-bg': '#FFFFFF',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'var(--font-noto-serif)', 'serif'],
        sans: ['var(--font-noto-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
        'card-gradient': 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 60%)',
      },
    },
  },
  plugins: [],
};
