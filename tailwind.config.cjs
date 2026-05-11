module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        panda: {
          ink: '#1F2937',
          charcoal: '#111827',
          cloud: '#F8FAFC',
          bamboo: '#84CCAA',
          mint: '#CFEFE0',
          blush: '#FFD8E8',
          berry: '#F6A8C5'
        },
        neon: {
          blue: '#3EE3F0',
          purple: '#8A5CF6'
        }
      },
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};
