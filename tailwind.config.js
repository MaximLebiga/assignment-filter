/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      padding: {
        14.75: '58px',
        15: '60px',
        25: '100px',
        50: '200px',
      },
      width: {
        135: '540px',
      },
      fontSize: {
        12: [
          '12px',
          {
            lineHeight: '24px',
            letterSpacing: '2px'
          }
        ],
        13.1: [
          '13px',
          {
            lineHeight: '24px',
            letterSpacing: '1.8px'
          }
        ],
        13.2: [
          '13px',
          {
            lineHeight: '20px',
            letterSpacing: '1.8px'
          }
        ]
      },
      gap: {
        15.75: '63px',
        10.25: '41px'
      },
      colors: {
        'white-light': '#F8F5EE'
      },
      inset: {
        14.5: '58px'
      }
    }
  },
  plugins: []
}
