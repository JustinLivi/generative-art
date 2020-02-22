module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'airbnb',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/react',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['jest', 'prettier', 'import'],
  rules: {
    'import/no-default-export': 1,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'import/extensions': ['error', 'never'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'max-len': ['error', { code: 120, ignoreUrls: true }],
    'prettier/prettier': 0,
    'react/prop-types': 0,
    'class-methods-use-this': 0,
  },
  env: {
    'jest/globals': true,
    browser: true,
  },
  overrides: [
    {
      files: ['src/**/*.test.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'dot-notation': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
