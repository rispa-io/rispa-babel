const { declare } = require('@babel/helper-plugin-utils')

module.exports = declare((api, { env }) => {
  api.assertVersion(7)

  return {
    presets: [
      [require.resolve('./preset-core'), env],
      require.resolve('@babel/preset-react'),
    ],
  }
})
