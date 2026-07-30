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
        surface: {
          DEFAULT: '#f8f9ff',
          dim: '#cbdbf5',
          bright: '#f8f9ff',
          lowest: '#ffffff',
          low: '#eff4ff',
          container: '#e5eeff',
          high: '#dce9ff',
          highest: '#d3e4fe',
          variant: '#d3e4fe',
          tint: '#565e74'
        },
        'on-surface': {
          DEFAULT: '#0b1c30',
          variant: '#45464d'
        },
        secondary: {
          DEFAULT: '#006a61',
          container: '#86f2e4',
          fixed: '#89f5e7',
          'fixed-dim': '#6bd8cb'
        },
        'on-secondary': {
          DEFAULT: '#ffffff',
          container: '#006f66',
          fixed: '#00201d',
          'fixed-variant': '#005049'
        },
        primary: {
          DEFAULT: '#000000',
          container: '#131b2e',
          fixed: '#dae2fd',
          'fixed-dim': '#bec6e0'
        },
        'on-primary': {
          DEFAULT: '#ffffff',
          container: '#7c839b',
          fixed: '#131b2e',
          'fixed-variant': '#3f465c'
        },
        outline: {
          DEFAULT: '#76777d',
          variant: '#c6c6cd'
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6'
        },
        'on-error': {
          DEFAULT: '#ffffff',
          container: '#93000a'
        }
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        'full': '9999px'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
