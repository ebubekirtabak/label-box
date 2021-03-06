module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'no-multi-assign': 0,
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    'class-methods-use-this': [0],
    'object-curly-newline': [0, { 'multiline': true }],
    'template-curly-spacing': ['error', 'always'],
    'max-len': ['error', {
      'code': 140,
      'ignoreUrls': true,
      'ignoreRegExpLiterals': true
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'always',
      'asyncArrow': 'always'
    }],
    'no-plusplus': ['error', {
      'allowForLoopAfterthoughts': true
    }],
    'no-underscore-dangle': 0,
    "prefer-destructuring": [0, {"object": true, "array": false}]
  }
}
