function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: withOpacity('--color-primary'),
        secondary: withOpacity('--color-secondary'),
        success: withOpacity('--color-success'),
        error: withOpacity('--color-error'),
        base: withOpacity('--color-base'),
        muted: withOpacity('--color-muted'),
      },
      backgroundColor: {
        skin: {
          fill: withOpacity('--color-fill'),
          'on-fill': withOpacity('--color-on-fill'),
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}