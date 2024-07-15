/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", 
  "./android/app/src/screens/**/*.{js,jsx,ts,tsx}",
  "./android/app/src/components/**/*.{js,jsx,ts,tsx}",
  "./android/app/src/Home/Home.jsx",
  "./android/app/src/**/*.{js,jsx,ts,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}",
],

 
theme: {
  extend: {
    colors: {
    //  primary: "#161622",
   // #D2DAe2 #F6F5F2
    primary: "#072d4c",
      secondary: {
        DEFAULT: "#92c7f2",
        100: "#FF9001",
        200: "#FF8E01",
      },
      black: {
        DEFAULT: "#000",
        100: "#1E1E2D",
        200: "#232533",
      },
      gray: {
        100: "#CDCDE0",
      },
    },
    fontFamily: {
      pthin: ["Poppins-Thin", "sans-serif"],
      pextralight: ["Poppins-ExtraLight", "sans-serif"],
      plight: ["Poppins-Light", "sans-serif"],
      pregular: ["Poppins-Regular", "sans-serif"],
      pmedium: ["Poppins-Medium", "sans-serif"],
      psemibold: ["Poppins-SemiBold", "sans-serif"],
      pbold: ["Poppins-Bold", "sans-serif"],
      pextrabold: ["Poppins-ExtraBold", "sans-serif"],
      pblack: ["Poppins-Black", "sans-serif"],
    },
  },
},

  plugins: [],
}