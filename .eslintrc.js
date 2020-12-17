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
    'import/extensions': ['error', 'never', { svg: 'always' }],
    'no-shadow': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'max-len': ['error', { code: 120, ignoreUrls: true, ignoreStrings: true }],
    'prettier/prettier': 0,
    'react/prop-types': 0,
    'react/jsx-boolean-value': ['error', 'always'],
    'no-use-before-define': [0],
    '@typescript-eslint/no-use-before-define': [1],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error']
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
