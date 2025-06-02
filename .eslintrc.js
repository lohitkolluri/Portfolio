module.exports = {
  extends: ['next/core-web-vitals'],
  plugins: [],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  rules: {
    // Custom rules here
  },
}; 