const { init } = require('@rispa/core')
const { startHandler } = require('./lib/BabelPluginApi').default

module.exports = init(startHandler)
