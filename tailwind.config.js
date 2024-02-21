import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'lime': '#32CD32',
      'gray': '#bcbcbc',
      'white':'#FFF',
      'black':'#000000',
      'ligth-gray':'#ECF0F1',

    },
    extend: {
      spacing: {
        5: "0.313rem",
        10: "0.625rem",
        15: "0.938rem",
        20: "1.25rem",
        30: "1.875rem",
        40: "2.5rem",
        50: "3.125rem",
        60: "3.75rem",
        70: "4.375rem",
        80: "5rem",
        90: "5.625rem",
        100: "6.25rem",
      },
    },
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
  ],
}

