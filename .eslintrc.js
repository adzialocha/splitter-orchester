module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    // 'plugin:import/recommended',
    // 'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // Keep prettier rules last to make sure its style changes are not
    // overwritten by other rules
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'import'],
  rules: {
    // Always require dangling commas for multiline objects and arrays
    'comma-dangle': ['error', 'always-multiline'],
    // This react rule helps with typos but requires escaping all kinds of
    // characters which makes the source code less readable. I left only the
    // rules for '>' and '}' because these are probably the most common typos
    // but they could also be removed.
    'react/no-unescaped-entities': [
      'error',
      {
        forbid: ['>', '}'],
      },
    ],
    // Sometimes we just want to not mind
    '@typescript-eslint/no-explicit-any': 0,
    // Warn on prettier violations and continue with build
    'prettier/prettier': 1,
    // We don't need prop-types when we are using Typescript
    'react/prop-types': 0,
    // Sort all props in React components
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
      },
    ],
    // Unresolved imports are already handled
    'import/no-unresolved': 0,
    // Enforce grouping and order in imports
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'type',
          ['internal', 'parent', 'sibling', 'index'],
        ],
        pathGroups: [
          {
            pattern: '~/*',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    // Also order imports with multiple members
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
  },
};
