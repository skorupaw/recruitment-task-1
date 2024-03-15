module.exports = {
  extends: [
    './.eslintrc.cjs',
    'plugin:prettier/recommended',
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ]
  }
}
