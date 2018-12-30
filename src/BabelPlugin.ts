import { PluginInstance, RispaContext } from '@rispa/core'
import ConfigPluginApi from '@rispa/config'
import { TransformOptions } from '@babel/core'
import mergeBabelConfigs = require('babel-merge')

import defaultClientBabelConfig from './defaultClientBabelConfig'
import defaultServerBabelConfig from './defaultServerBabelConfig'

export interface Config {
  browsers: string[],
}

export type BabelConfig = TransformOptions

const validateConfigs = (configs: BabelConfig[]) => {
  configs.forEach(config => {
    const configType = typeof config

    if (configType !== 'object') {
      throw new TypeError('Invalid babel config type')
    }
  })
}

class BabelPlugin extends PluginInstance {
  private readonly config: Config

  private babelClient: BabelConfig[] = []
  private babelServer: BabelConfig[] = []
  private babelCommon: BabelConfig[] = []

  constructor(context: RispaContext) {
    super(context)

    this.config = context.get<ConfigPluginApi>(ConfigPluginApi.pluginName).getConfig() as Config
  }

  start() {
    this.addClientConfig(defaultClientBabelConfig(this.config))
    this.addServerConfig(defaultServerBabelConfig(this.config))
  }

  addCommonConfig(...configs: BabelConfig[]) {
    validateConfigs(configs)

    this.babelCommon = this.babelCommon.concat(configs)
  }

  addClientConfig(...configs: BabelConfig[]) {
    validateConfigs(configs)

    this.babelClient = this.babelClient.concat(configs)
  }

  addServerConfig(...configs: BabelConfig[]) {
    validateConfigs(configs)

    this.babelServer = this.babelServer.concat(configs)
  }

  getClientConfig(): BabelConfig {
    if (this.babelClient.length === 0) {
      throw new Error('Empty client babel config')
    }

    return this.babelCommon.concat(this.babelClient).reduce(mergeBabelConfigs, {})
  }

  getServerConfig(): BabelConfig {
    if (this.babelServer.length === 0) {
      throw new Error('Empty server babel config')
    }

    return this.babelCommon.concat(this.babelServer).reduce(mergeBabelConfigs, {})
  }
}

export default BabelPlugin
