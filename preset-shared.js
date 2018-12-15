const { declare } = require('@babel/helper-plugin-utils')

module.exports = declare((api, options) => {
  api.assertVersion(7)

  // eslint-disable-next-line no-console
  console.warn('[@rispa/babel] Shared babel config does not work currently') // TODO: Shared babel preset via rispa plugins

  return {
    presets: [
      [require.resolve('./preset-app'), options],
    ],
  }
})

