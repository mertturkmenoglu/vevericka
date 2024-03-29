module.exports = {
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/destructuring-assignment': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    quotes: ['error', 'single'],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-unused-vars': [
      2,
      {
        args: 'all',
        argsIgnorePattern: '_',
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-filename-extension': 'off',
  },
};
