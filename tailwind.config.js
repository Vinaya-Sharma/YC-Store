module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        ycLblue:'#2AAAE1',
        ycDblue:'#1972BD'
      }
    },
  },
  plugins: [ 
    require('tailwind-scrollbar-hide')
  ],
}
