import js from '@eslint/js';
import oxlint from 'eslint-plugin-oxlint';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', 'storybook-static/**', 'node_modules/**', '**/*.stories.{ts,tsx}'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'next',
              message: 'Salt is a React library; do not import Next.js APIs.',
            },
            {
              name: 'next/link',
              message: 'Salt is a React library; do not import Next.js APIs.',
            },
            {
              name: 'next/image',
              message: 'Salt is a React library; do not import Next.js APIs.',
            },
            {
              name: 'next/navigation',
              message: 'Salt is a React library; do not import Next.js APIs.',
            },
            {
              name: 'next/router',
              message: 'Salt is a React library; do not import Next.js APIs.',
            },
          ],
          patterns: [
            {
              group: ['next/*'],
              message: 'Salt is a React library; do not import Next.js APIs.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.{test,spec}.{ts,tsx}', 'vitest.setup.ts'],
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
  },
  ...oxlint.buildFromOxlintConfigFile('./.oxlintrc.json')
);
