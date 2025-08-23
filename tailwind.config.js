/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* subtle warm gray */
        input: 'var(--color-input)', /* subtle warm gray */
        ring: 'var(--color-ring)', /* warm coral */
        background: 'var(--color-background)', /* warm off-white */
        foreground: 'var(--color-foreground)', /* deep charcoal */
        primary: {
          DEFAULT: 'var(--color-primary)', /* warm coral */
          foreground: 'var(--color-primary-foreground)', /* warm off-white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* sage green */
          foreground: 'var(--color-secondary-foreground)', /* warm off-white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* muted red-orange */
          foreground: 'var(--color-destructive-foreground)', /* warm off-white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* subtle warm gray */
          foreground: 'var(--color-muted-foreground)', /* medium gray */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* golden amber */
          foreground: 'var(--color-accent-foreground)', /* deep charcoal */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* warm off-white */
          foreground: 'var(--color-popover-foreground)', /* deep charcoal */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* subtle warm gray */
          foreground: 'var(--color-card-foreground)', /* deep charcoal */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* fresh teal */
          foreground: 'var(--color-success-foreground)', /* warm off-white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* gentle yellow-orange */
          foreground: 'var(--color-warning-foreground)', /* deep charcoal */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* muted red-orange */
          foreground: 'var(--color-error-foreground)', /* warm off-white */
        },
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Source Sans 3', 'system-ui', 'sans-serif'],
        'caption': ['Nunito Sans', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      borderRadius: {
        'lg': '8px',
        'md': '6px',
        'sm': '4px',
        'bubble': '24px',
      },
      boxShadow: {
        'warm': '0 2px 8px rgba(229, 90, 79, 0.08)',
        'warm-lg': '0 8px 16px rgba(229, 90, 79, 0.08)',
        'subtle': '0 2px 4px rgba(45, 52, 54, 0.04)',
      },
      animation: {
        'breathing': 'breathing 2s ease-in-out infinite',
        'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0.0, 0.2, 1) infinite',
      },
      keyframes: {
        breathing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.9' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}