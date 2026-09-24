import { fixupConfigRules } from '@eslint/compat';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import jestPlugin from 'eslint-plugin-jest';
import sonarjs from 'eslint-plugin-sonarjs';
import storybook from 'eslint-plugin-storybook';
import testingLibrary from 'eslint-plugin-testing-library';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

const eslintConfig = defineConfig([
  ...fixupConfigRules(nextVitals),
  ...fixupConfigRules(nextTs),
  {
    plugins: {
      sonarjs,
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      ...sonarjs.configs.recommended.rules,
      ...eslintPluginUnicorn.configs['recommended'].rules,
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      camelcase: ['error'],
      semi: ['error', 'always'],

      curly: ['error', 'all'],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
      ],
      'max-lines-per-function': [
        'error',
        {
          max: 100,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],
      'max-lines': [
        'error',
        {
          max: 1000,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'unicorn/no-negated-condition': 'off',
      'unicorn/no-null': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'generic',
          readonly: 'generic',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
        },
      ],
    },
  },
  {
    files: ['src/components/**'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
  {
    files: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      jest: jestPlugin,
      'testing-library': testingLibrary,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...testingLibrary.configs['flat/react'].rules,
      'max-lines-per-function': 'off',
      'max-lines': 'off',
      'sonarjs/parameterized-tests': 'off',
      '@next/next/no-img-element': 'off',
      'unicorn/no-useless-undefined': 'off',
    },
  },
  {
    files: ['src/app/manifest.ts', 'tests/load/**/*.ts'],
    rules: {
      camelcase: ['error', { properties: 'never' }],
    },
  },
  prettier,
  ...storybook.configs['flat/recommended'],
  globalIgnores([
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
