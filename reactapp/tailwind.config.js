/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        body: ['Geist', 'DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        neon: '#00ff88',
        neonDim: '#00cc6a',
        danger: '#ff4466',
        dangerDim: '#cc2244',
        gold: '#f5a623',
        bg: '#080b0f',
        surface: '#0d1117',
        panel: '#111820',
        border: '#1e2a38',
        muted: '#3a4a5c',
        soft: '#8899aa',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.4s ease-out',
        'fade-up': 'fade-up 0.5s ease-out',
        'ticker': 'ticker 30s linear infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(0,255,136,0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(0,255,136,0.8)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(20px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-up': {
          from: { transform: 'translateY(12px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'ticker': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
