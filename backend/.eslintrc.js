module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
  extends: [
    'standard'
  ],
  env: {
    node: true,
    es6: true,
    mocha: true
  }
}
