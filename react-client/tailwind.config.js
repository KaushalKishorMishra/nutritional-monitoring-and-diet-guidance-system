/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
const flowbite = require("flowbite-react/tailwind");


export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content(),],
  theme: {
    extend: {
      fontFamily: {
        "nunito-sans": ["Nunito Sans", "sans-serif"],
        "dm-sans": ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [daisyui, flowbite.plugin(),],
  daisyui: {
    themes: [{
      customLight: {
        primary: '#35cc8c',
        "primary-content": "#ffffff",
        secondary: '#dbfbed',
        "secondary-content": "#0d0d0d",
        accent: '#59ffc4',
        "accent-content": "#0e0e0e",
        "base-100": "#ffffff",
        "base-200": "#f7f7f7",
        "base-300": "#6e7179",
        // neutral: {
        //   dark: '#6e7179', // OnBackgroundVariant
        //   DEFAULT: '#cccccc', // SurfaceVariant
        //   light: '#d9d9d9', // Outline
        //   variant: '#bfbfbf', // OutlineVariant
        // },
        neutral: "#cccccc",
        success: '#35cc8c', // Aligns with primary green
        warning: '#ffa072', // Orange tone
        error: '#e56571', // Red tone
        info: '#2196f3', // Suggesting a blue tone for informational states
      },
      customDark: {
        primary: '#49d199', // Slightly subdued green
        "primary-content": "#ffffff",
        secondary: '#1a3327', // Darker secondary surface
        "secondary-content": "#e4e4e4",
        accent: '#2befa8', // Bright accent
        "accent-content": "#0e0e0e",
        "base-100": "#121212",
        "base-200": "#e4e4e4",
        "base-300": "#1e1e1e",
        // neutral: {
        //   dark: '#a6a9ad', // Softer dark neutral
        //   DEFAULT: '#353535', // Dark surface variant
        //   light: '#4a4a4a', // Neutral outline
        //   variant: '#505050', // Muted outline variant
        // },
        neutral: "#353535",
        success: '#2dae77', // Subdued success green
        warning: '#cb7f5b', // Subdued orange
        error: '#b24f58', // Darker red
        info: '#1d7fff', // Vibrant dark blue
      }
    }]
  }
}

