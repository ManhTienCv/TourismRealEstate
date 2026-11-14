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
          bg: '#FAF7ED',          // Primary warm cream HUTS background (#FAF7ED)
          surface: '#F2EFE4',     // Secondary card/section surface (#F2EFE4)
          'surface-light': '#FAF7ED',
          border: '#E2DDD5',      // Hairline borders
          'border-strong': '#CEC7BC',
          ink: '#0C310A',         // Primary deep forest dark ink on cream (#0C310A)
          'nav-dark': '#1E1414',  // Dark navbar link color when solid/hovered (#1E1414)
          'title-light': '#FAF7ED', // Title typography on dark photography (#FAF7ED)
          muted: '#664A42',       // Secondary body copy & descriptions (#664A42)
          subtle: '#9A958D',
          lime: '#CBE282',        // Accent lime / Cốm (#CBE282)
          pine: {
            DEFAULT: '#0C310A',
            hover: '#183B16',
            light: '#2C4A3E',
            subtle: 'rgba(12, 49, 10, 0.08)',
          },
          terracotta: {
            DEFAULT: '#D46A43',
            hover: '#BF5934',
            light: '#E28663',
            subtle: 'rgba(212, 106, 67, 0.1)',
          },
          sand: '#E6E1D8',
        },
      },
      fontFamily: {
        serif: ['"HW Cigars"', '"Playfair Display"', '"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"ABC Walter Neue"', '"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
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
