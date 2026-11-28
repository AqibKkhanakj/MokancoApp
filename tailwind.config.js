const { colors } = require('./src/theme/palette');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        canvas: colors.canvas,
        gold: colors.gold,
        surface: colors.surface,
        ink: colors.ink,
        muted: colors.muted,
        primary: colors.primary,
        line: colors.line,
        danger: colors.danger,
      },
    },
  },
  plugins: [],
};
