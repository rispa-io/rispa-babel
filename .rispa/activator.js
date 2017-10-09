const { default: BabelPlugin } = require('../lib/BabelPlugin')
const { default: BabelPluginApi } = require('../lib/BabelPluginApi')

function init(context, config) {
  return new BabelPlugin(context, config)
}

function api(instance) {
  return new BabelPluginApi(instance)
}

const after = ['@rispa/webpack']

module.exports = init

module.exports.api = api

module.exports.after = after
