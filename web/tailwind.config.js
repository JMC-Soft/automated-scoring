/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          100: '#B3EAF6',
          200: '#85D8F3',
          300: '#57C7F0',
          400: '#29B6ED',
          500: '#01AEE8',
          600: '#019CD4',
          700: '#0177A9',
          800: '#01517E',
          900: '#012B53',
        },
        secondary: {
          100: '#CDE6FA',
          200: '#9CCDF7',
          300: '#6BB4F3',
          400: '#388CF0',
          500: '#035AAD',
          600: '#0252A0',
          700: '#01426D',
          800: '#01324A',
          900: '#012127',
        },
      },
    },
  },
  plugins: [],
};
