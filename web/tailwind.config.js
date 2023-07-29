/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-pretendard)'],
    },
    screens: {
      mobile: '320px',
      tablet: '640px',
      tabletLandscape: '768px',
      laptop: '1024px',
      desktop: '1280px',
      desktopWide: '1440px',
      desktopUltraWide: '1920px',
    },

    extend: {
      colors: {
        primary: {
          50: '#E6F2FF' /* Lightest Blue */,
          100: '#BFDFFF',
          200: '#99CDFC',
          300: '#73BAFA',
          400: '#4DA8F8',
          500: '#0066B3' /* Base color */,
          600: '#005499',
          700: '#003E7E',
          800: '#002863',
          900: '#001024' /* Darkest Blue */,
        },
        complementary: {
          50: '#FFF7E6' /* Lightest Yellow */,
          100: '#FFEDBF',
          200: '#FFE299',
          300: '#FFD773',
          400: '#FFCC4D',
          500: '#B38F00' /* Base color */,
          600: '#8A6D00',
          700: '#614B00',
          800: '#382900',
          900: '#0F0700' /* Darkest Yellow */,
        },
        secondary: {
          50: '#E6F2FF' /* Lightest Blue */,
          100: '#BFDFFF',
          200: '#99CDFF',
          300: '#73BAFF',
          400: '#4DA8FF',
          500: '#3399FF' /* Base color */,
          600: '#267ACC',
          700: '#1A5C99',
          800: '#0D3E66',
          900: '#011F33' /* Darkest Blue */,
        },
        accent: {
          50: '#FFE6EB' /* Lightest Pink */,
          100: '#FFBFC6',
          200: '#FF99A1',
          300: '#FF737D',
          400: '#FF4D58',
          500: '#FF5675' /* Base color */,
          600: '#CC445E',
          700: '#993247',
          800: '#662130',
          900: '#331018' /* Darkest Pink */,
        },
        background: {
          50: '#FFFFFF' /* Lightest White */,
          100: '#FDFEFF',
          200: '#FAF7FF',
          300: '#F8F0FF',
          400: '#F5E9FF',
          500: '#F0F8FF' /* Base color */,
          600: '#CBCEDD',
          700: '#A6A4BB',
          800: '#807A99',
          900: '#5B5077' /* Darkest White */,
        },
        text: {
          50: '#E6E6F2' /* Lightest Blue */,
          100: '#BFBFD9',
          200: '#9999BF',
          300: '#7373A6',
          400: '#4D4D8D',
          500: '#000033' /* Base color */,
          600: '#000026',
          700: '#000019',
          800: '#00000D',
          900: '#000000' /* Darkest Blue */,
        },
        error: {
          50: '#FFE6E6' /* Lightest Red */,
          100: '#FFBFBF',
          200: '#FF9999',
          300: '#FF7373',
          400: '#FF4D4D',
          500: '#FF0000' /* Base color */,
          600: '#CC0000',
          700: '#990000',
          800: '#660000',
          900: '#330000' /* Darkest Red */,
        },
        success: {
          50: '#E6FFE6' /* Lightest Green */,
          100: '#BFFFC2',
          200: '#99FF9E',
          300: '#73FF7A',
          400: '#4DFF56',
          500: '#00CC66' /* Base color */,
          600: '#00994D',
          700: '#006633',
          800: '#00331A',
          900: '#000000' /* Darkest Green */,
        },
        info: {
          50: '#E6F2FF' /* Lightest Light Blue */,
          100: '#BFDEFF',
          200: '#99CBFF',
          300: '#73B8FF',
          400: '#4DA5FF',
          500: '#66CCFF' /* Base color */,
          600: '#519ACC',
          700: '#3C6999',
          800: '#274766',
          900: '#122533' /* Darkest Light Blue */,
        },
        warning: {
          50: '#FFE6CC' /* Lightest Orange */,
          100: '#FFBF99',
          200: '#FF9966',
          300: '#FF7333',
          400: '#FF4D00',
          500: '#FF6600' /* Base color */,
          600: '#CC5200',
          700: '#993D00',
          800: '#662900',
          900: '#331400' /* Darkest Orange */,
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
