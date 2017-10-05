import { PluginApi } from '@rispa/core'
import { TransformOptions } from 'babel-core'
import BabelPlugin from './BabelPlugin'

class BabelPluginApi extends PluginApi<BabelPlugin> {
  static pluginName = '@rispa/babel'

  setPlugins(plugins) {
    this.instance.setPlugins(plugins)
  }

  setPresets(presets) {
    this.instance.setPresets(presets)
  }

  setIgnore(ignore) {
    this.instance.setIgnore(ignore)
  }

  addPlugin(...plugins: string[]) {
    this.instance.addPlugin(...plugins)
  }

  addPreset(...presets: string[]) {
    this.instance.addPreset(...presets)
  }

  addIgnore(...ignores: string[]) {
    this.instance.addIgnore(...ignores)
  }

  merge(anotherBabelConfig: TransformOptions) {
    this.instance.merge(anotherBabelConfig)
  }

  getConfig() {
    return this.instance.getConfig()
  }
}

export default BabelPluginApi
