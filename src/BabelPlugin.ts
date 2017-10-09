import { PluginInstance, RispaConfig } from '@rispa/core'
import { TransformOptions } from 'babel-core'
import mergeBabelConfigs = require('babel-merge')
import defaultBabelConfig from './babelConfig'

export type BabelConfigFabric = (config: RispaConfig) => TransformOptions
export type BabelConfig = TransformOptions | BabelConfigFabric

class BabelPlugin extends PluginInstance {
  private babelConfig: BabelConfig[] = []

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
