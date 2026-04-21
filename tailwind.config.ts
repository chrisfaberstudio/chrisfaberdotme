import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(242 242 242 / <alpha-value>)',
        ink: 'rgb(26 26 26 / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-lato)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'monospace'],
      },
      maxWidth: {
        container: '480px',
      },
      transitionTimingFunction: {
        studio: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
