module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#D4C685',
        secondary: '#F7EF81',
        accent1: '#CFE795',
        accent2: '#A7D3A6',
        accent3: '#ADD2C2',
        accent4: '#657AB9',
        christmasRed: '#FF0000',
        christmasGreen: '#00FF00',
        christmasGold: '#FFD700',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'colors': 'background-color, border-color, color, fill, stroke',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};