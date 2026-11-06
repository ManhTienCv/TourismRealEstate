/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/shared/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        tie: {
          bg: '#F7F5F0',          // Primary warm alabaster/architectural paper background
          surface: '#EFECE6',     // Secondary card/section surface
          'surface-light': '#FDFCFA', // Elevated card surface (not #FFFFFF, subtle warm tone)
          border: '#E2DDD5',      // Subtle warm hairline borders
          'border-strong': '#CEC7BC',
          ink: '#1C1B18',         // Primary deep charcoal typography
          muted: '#68645E',       // Secondary body copy & descriptions
          subtle: '#9A958D',      // Caption / micro copy
          pine: {
            DEFAULT: '#2C4A3E',   // Primary CTA buttons, active states, forest green
            hover: '#223A31',
            light: '#3C6454',
            subtle: 'rgba(44, 74, 62, 0.08)',
          },
          terracotta: {
            DEFAULT: '#D46A43',   // Secondary accents, cost variance badges, highlights
            hover: '#BF5934',
            light: '#E28663',
            subtle: 'rgba(212, 106, 67, 0.1)',
          },
          sand: '#E6E1D8',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'monospace'],
      },
      boxShadow: {
        'tie-soft': '0 4px 20px -2px rgba(28, 27, 24, 0.06), 0 2px 6px -1px rgba(28, 27, 24, 0.04)',
        'tie-card': '0 10px 30px -4px rgba(28, 27, 24, 0.08)',
        'tie-float': '0 20px 45px -8px rgba(28, 27, 24, 0.12)',
      },
    },
  },
  plugins: [],
};
