/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        '9/18': '9 / 18',
      },
      borderRadius: {
        '2.4rem': '2.4rem',
        '3rem': '3rem',
      },
      colors: {
        border: 'hsl(var(--border, 214 32% 91%))',
        input: 'hsl(var(--input, 214 32% 91%))',
        ring: 'hsl(var(--ring, 222 84% 5%))',
        background: 'hsl(var(--background, 0 0% 100%))',
        foreground: 'hsl(var(--foreground, 222 84% 5%))',
        primary: {
          DEFAULT: 'hsl(var(--primary, 222 47% 11%))',
          foreground: 'hsl(var(--primary-foreground, 210 40% 98%))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary, 210 40% 96%))',
          foreground: 'hsl(var(--secondary-foreground, 222 47% 11%))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive, 0 84% 60%))',
          foreground: 'hsl(var(--destructive-foreground, 210 40% 98%))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted, 210 40% 96%))',
          foreground: 'hsl(var(--muted-foreground, 215 16% 47%))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent, 210 40% 96%))',
          foreground: 'hsl(var(--accent-foreground, 222 47% 11%))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
