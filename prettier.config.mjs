/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 80,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
