import { PluginInstance } from '@rispa/core'
import { TransformOptions } from 'babel-core'
import mergeBabelConfigs = require('babel-merge')
import defaultBabelConfig from './babelConfig'

class BabelPlugin extends PluginInstance {
  private babelConfig: TransformOptions[] = []

  start() {
    this.addConfig(defaultBabelConfig)
  }

  addConfig(...config: TransformOptions[]) {
    this.babelConfig = this.babelConfig.concat(config)
  }

  getConfig(): TransformOptions {
    return this.babelConfig.reduce((result, config) => {
      if (typeof config === 'function') {
        return mergeBabelConfigs(result, config())
      }

      return mergeBabelConfigs(result, config)
    }, {})
  }
}

export default BabelPlugin
