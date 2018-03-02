import { PluginInstance } from '@rispa/core'
import ConfigPluginApi from '@rispa/config'
import { TransformOptions } from 'babel-core'
import defaultBabelConfig from './babelConfig'
import mergeBabelConfigs = require('babel-merge')

export type BabelConfigFabric = (config: object) => TransformOptions
export type BabelConfig = TransformOptions | BabelConfigFabric

class BabelPlugin extends PluginInstance {
  private babelConfig: BabelConfig[] = []
  private config: object

  constructor(context) {
    super(context)

    this.config = context.get(ConfigPluginApi.pluginName).getConfig()
  }

  start() {
    this.addConfig(defaultBabelConfig)
  }

  addConfig(...configs: BabelConfig[]) {
    configs.forEach(config => {
      const configType = typeof config

      if (configType !== 'function' && configType !== 'object') {
        throw new TypeError('Invalid babel config type')
      }
    })

    this.babelConfig = this.babelConfig.concat(configs)
  }

  getConfig(): TransformOptions {
    if (this.babelConfig.length === 0) {
      throw new Error('Empty babel config')
    }

    const babelConfig = this.babelConfig.reduce((result, config) => {
      if (typeof config === 'function') {
        return mergeBabelConfigs(result, config(this.config))
      }

      return mergeBabelConfigs(result, config)
    }, {})

    return babelConfig
  }
}

export default BabelPlugin
