import { PluginInstance } from '@rispa/core'
import ConfigPluginApi from '@rispa/config'
import { TransformOptions } from '@babel/core'
import mergeBabelConfigs = require('babel-merge')

import defaultBabelConfig, { Config } from './defaultBabelConfig'

export type BabelConfig = TransformOptions

class BabelPlugin extends PluginInstance {
  private babelConfig: BabelConfig[] = []
  private readonly config: Config

  constructor(context) {
    super(context)

    this.config = context.get(ConfigPluginApi.pluginName).getConfig()
  }

  start() {
    this.addConfig(defaultBabelConfig(this.config))
  }

  addConfig(...configs: BabelConfig[]) {
    configs.forEach(config => {
      const configType = typeof config

      if (configType !== 'object') {
        throw new TypeError('Invalid babel config type')
      }
    })

    this.babelConfig = this.babelConfig.concat(configs)
  }

  getConfig(): BabelConfig {
    if (this.babelConfig.length === 0) {
      throw new Error('Empty babel config')
    }

    return this.babelConfig.reduce(mergeBabelConfigs, {})
  }
}

export default BabelPlugin
