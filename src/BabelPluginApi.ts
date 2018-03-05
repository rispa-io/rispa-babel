import { PluginApi } from '@rispa/core'
import { TransformOptions } from 'babel-core'
import BabelPlugin from './BabelPlugin'

class BabelPluginApi extends PluginApi<BabelPlugin> {
  static pluginName = '@rispa/babel'

  static startHandler(context) {
    const instance = context.get(BabelPluginApi.pluginName)

    return instance.getConfig()
  }

  addPlugin(...plugins: any[]) {
    this.instance.addConfig({
      plugins,
    })
  }

  addConfig(...config: TransformOptions[]) {
    this.instance.addConfig(...config)
  }

  getConfig(): TransformOptions {
    return this.instance.getConfig()
  }
}

export default BabelPluginApi
