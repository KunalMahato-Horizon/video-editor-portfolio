// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'studio-black': '#0a0a0f',
        'studio-gray': '#1a1a2e',
        'studio-blue': '#3b82f6',
        'studio-purple': '#8b5cf6',
        'studio-cyan': '#06b6d4',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      backgroundImage: {
        'gradient-studio': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
        'gradient-timeline': 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}