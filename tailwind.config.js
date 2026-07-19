/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        aurea: {
          bg: 'var(--bg)',
          surface: 'var(--surface)',
          surface2: 'var(--surface2)',
          border: 'var(--border)',
          text: 'var(--text)',
          text2: 'var(--text2)',
          text3: 'var(--text3)',
          accent: 'var(--accent)',
          gold: 'var(--gold)',
          green: 'var(--green)',
          amber: 'var(--amber)',
          red: 'var(--red)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease',
        'slide-down': 'slideDown 0.3s ease',
        'toast-in': 'toastIn 0.3s ease',
        'check-pop': 'checkPop 0.3s ease forwards',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(4px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { transform: 'translateY(-100%)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        toastIn: { '0%': { transform: 'translateX(100%)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        checkPop: { '0%': { transform: 'scale(0.5)', opacity: '0' }, '60%': { transform: 'scale(1.2)' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        skeleton: { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
      },
    },
  },
  plugins: [],
}
