/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1e1e2f',
        surface: '#2a2a3d',
        primary: '#3b82f6', // blue
        secondary: '#10b981', // green
        accent: '#ec4899', // pink
        warning: '#f59e0b', // amber
        danger: '#ef4444', // red
      }
    },
  },
  plugins: [],
}
