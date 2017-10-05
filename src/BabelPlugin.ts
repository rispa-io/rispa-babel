import { PluginInstance } from '@rispa/core'
import { TransformOptions } from 'babel-core'
import mergeBabelConfigs from 'babel-merge'
import defaultBabelConfig from './babelConfig'

class BabelPlugin extends PluginInstance {
  private babelConfig: TransformOptions = defaultBabelConfig

  setPlugins(plugins) {
    this.babelConfig.plugins = plugins
  }

  setPresets(presets) {
    this.babelConfig.presets = presets
  }

  setIgnore(ignore) {
    this.babelConfig.ignore = ignore
  }

  addPlugin(...plugins) {
    this.babelConfig.plugins = this.babelConfig.plugins.concat(plugins)
  }

  addPreset(...presets) {
    this.babelConfig.plugins = this.babelConfig.plugins.concat(presets)
  }

  addIgnore(...ignores) {
    this.babelConfig.ignore = this.babelConfig.ignore.concat(ignores)
  }

  merge(anotherBabelConfig) {
    this.babelConfig = mergeBabelConfigs(this.babelConfig, anotherBabelConfig)
  }

  getConfig() {
    return this.babelConfig
  }
}

export default BabelPlugin
