/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tell Tailwind where to scan for class names in your project files.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Looks for Tailwind class names in these files.
  ],
  theme: {
    extend: {
      // Define custom keyframes for reverse spinning.
      keyframes: {
        // 'spin-reverse': rotates the element from 360deg back to 0deg.
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
      // Add a new animation class that uses the 'spin-reverse' keyframes.
      animation: {
        // 'spin-reverse-slow' runs 'spin-reverse' over 20 seconds, linearly, infinitely.
        'spin-reverse-slow': 'spin-reverse 20s linear infinite',
      },
      // You can extend other styles here (colors, fonts, etc.) in the future.
    },
  },
  plugins: [], // No additional plugins are added for now.
};
