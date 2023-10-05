module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:playwright/recommended'
  ],
  ignorePatterns: ['tests-results', 'playwright-report', 'playwright.config.ts', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
}
