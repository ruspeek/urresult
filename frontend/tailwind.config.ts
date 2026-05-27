import type { Config } from 'tailwindcss';

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Золотая палитра
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFE55C',
          dark: '#B8860B',
        },
        // Красная палитра
        red: {
          DEFAULT: '#DC143C',
          light: '#FF1744',
          dark: '#A10E2B',
        },
        // Синяя палитра (дополнительная)
        blue: {
          dark: '#0a0e1a',
          medium: '#1a1f3a',
          light: '#2d3561',
        },
      },
      backgroundImage: {
        'gold-red-gradient': 'linear-gradient(135deg, #FFD700 0%, #DC143C 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
        'red-gradient': 'linear-gradient(135deg, #DC143C 0%, #A10E2B 100%)',
        'blue-dark-gradient': 'linear-gradient(180deg, #0a0e1a 0%, #1a1f3a 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;