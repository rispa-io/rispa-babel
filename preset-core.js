const { declare } = require('@babel/helper-plugin-utils')

module.exports = declare((api, { env = {} }) => {
  api.assertVersion(7)

  return {
    presets: [
      [require.resolve('@babel/preset-env'), env],
    ],

    plugins: [
      // Stage 2
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      require.resolve('@babel/plugin-proposal-function-sent'),
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      require.resolve('@babel/plugin-proposal-numeric-separator'),
      require.resolve('@babel/plugin-proposal-throw-expressions'),

      // Stage 3
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-syntax-import-meta'),
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: false }],
      require.resolve('@babel/plugin-proposal-json-strings'),
    ],
  }
})
