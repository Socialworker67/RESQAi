/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navyDark: '#030712', // Near-black navy
        navyMedium: '#0b1329', // Core panel background
        navyLight: '#1c2541', // Card background / borders
        accentCyan: '#00f0ff', // Electric cyan AI accents
        brandRed: '#ef4444', // Critical alerts
        brandOrange: '#f97316', // High risk
        brandAmber: '#f59e0b', // Moderate risk
        brandGreen: '#10b981', // Safe zones
        brandBlue: '#3b82f6', // Medical/Police teams
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        cyberCyan: '0 0 15px rgba(0, 240, 255, 0.25)',
        cyberRed: '0 0 15px rgba(239, 68, 68, 0.35)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'radar': 'radar 12s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
