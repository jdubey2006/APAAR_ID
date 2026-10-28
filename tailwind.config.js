/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          50: '#F0F5FA',
          100: '#E1ECF4',
          200: '#C3D9E9',
          300: '#95BEDA',
          400: '#609EC8',
          500: '#3B82B6',
          600: '#26679B',
          700: '#1F537E',
          800: '#1A4466',
          900: '#143550',
          950: '#0C2032',
        },
        navy: {
          800: '#132238',
          900: '#0B192C',
          950: '#060D17',
        },
        saffron: {
          400: '#FFA040',
          500: '#FF7700',
          600: '#E05800',
        },
        indiaGreen: {
          500: '#138808',
          600: '#0E6606',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
