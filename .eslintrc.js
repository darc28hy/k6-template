module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
  },
  rules: {
    // https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules#supported-rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': ['warn', {
      'groups': [
        'builtin',
        'external',
        'parent',
        'sibling',
        'index',
        'object',
        'type'
      ],
      'pathGroups': [
        {
          'pattern': '@nestjs/*',
          'group': 'external',
          'position': 'before'
        },
        {
          'pattern': '~/**',
          'group': 'index',
          'position': 'after'
        }
      ],
      'pathGroupsExcludedImportTypes': ['@nestjs/*'],
      'newlines-between': 'never',
      'alphabetize': {
        'order': 'asc',
        'caseInsensitive': true
      }
    }],

  },
};
