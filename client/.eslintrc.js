module.exports = {
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react'],
  rules: {
    // Add your ESLint rules here
    'react/prop-types': 'off', // Disable prop-types validation
    'react/react-in-jsx-scope': 'off', // Allow using JSX without importing React
    'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }], // Warn about unused variables
    'no-console': 'warn', // Warn about console.log and console.error
    'semi': ['error', 'always'], // Enforce semi-colons
    'quotes': ['error', 'single'], // Enforce single quotes
    'indent': ['error', 2], // Enforce 2 spaces for indentation
    'react/jsx-uses-react': 'off', // Allow using JSX without importing React
    'react/jsx-uses-vars': 'warn', // Warn about unused variables in JSX
  },
};
