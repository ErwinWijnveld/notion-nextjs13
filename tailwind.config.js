/** @type {import('tailwindcss').Config} */

const globalStyles = ({ addBase, config }) => {
  addBase({
    p: {
      marginBottom: config('theme.margin.3'),
      lineHeight: config('theme.lineHeight.normal'),
    },
    'h1, h2, h3, h4, h5': {
      marginBottom: config('theme.margin.2'),
      lineHeight: config('theme.lineHeight.tight'),
      fontWeight: config('theme.fontWeight.bold'),
    },
    h1: { fontSize: config('theme.fontSize.5xl') },
    h2: { fontSize: config('theme.fontSize.4xl') },
    h3: { fontSize: config('theme.fontSize.3xl') },
    h4: { fontSize: config('theme.fontSize.2xl') },
    h5: { fontSize: config('theme.fontSize.xl') },
    'ol, ul': { paddingLeft: config('theme.padding.4') },
    ol: { listStyleType: 'decimal' },
    ul: { listStyleType: 'disc' },
  });
}

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1190px',
        },
      },
      colors: {
        darkBlue: '#284455',
        mediumBlue: '#3E6072',
        lightBlue: '#628196',
        mainSand: '#F1D7BD',
        lightSand: '#FCF1E7',
        bgSand: '#FFFCF7',
      },
      lineHeight: {
        heading: 1.2,
      }
    },
  },
  plugins: [globalStyles],
}
