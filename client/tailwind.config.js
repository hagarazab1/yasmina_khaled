/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
      },
      colors: {
        romanticBgStart: '#0d0415',
        romanticBgEnd: '#1a0826',
        neonPink: '#ff4b8b',
        glowingPurple: '#a855f7',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-up': 'floatUp 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: '0' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-100vh) scale(1.2)', opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 75, 139, 0.4), 0 0 40px rgba(168, 85, 247, 0.2)' },
          '50%': { boxShadow: '0 0 35px rgba(255, 75, 139, 0.8), 0 0 60px rgba(168, 85, 247, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
