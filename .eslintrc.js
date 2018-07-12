module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 0,
    'no-unused-vars': 0,
    'no-plusplus': 0,
    'no-lonely-if': 0,
    'consistent-return': 0,
    'no-restricted-syntax': 0,
    'no-prototype-builtins': 0,
    'arrow-parens': 0,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}