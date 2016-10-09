module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'import/no-unresolved': 0,
    'semi': [2, 'never'],
    'arrow-body-style': ['error', 'always'],
    'no-console': 0,
    'array-callback-return': 0,
    'no-shadow': 0,
    'new-cap': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-undef': 0,
    'prefer-spread': 0,
    'no-unused-vars': 0,
    'no-param-reassign': ["error", { "props": false }],
    // 'arrow-body-style': ["error", "as-needed"],
    'arrow-body-style': 0,
    'quote-props': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
