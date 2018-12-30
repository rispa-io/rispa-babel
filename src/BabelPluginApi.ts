import { PluginApi } from '@rispa/core'
import { TransformOptions } from '@babel/core'
import BabelPlugin from './BabelPlugin'

class BabelPluginApi extends PluginApi<BabelPlugin> {
  static pluginName = '@rispa/babel'

  addClientConfig(...config: TransformOptions[]) {
    this.instance.addClientConfig(...config)
  }

  addServerConfig(...config: TransformOptions[]) {
    this.instance.addServerConfig(...config)
  }

  addCommonConfig(...config: TransformOptions[]) {
    this.instance.addCommonConfig(...config)
  }

  getClientConfig(): TransformOptions {
    return this.instance.getClientConfig()
  }

  getServerConfig(): TransformOptions {
    return this.instance.getServerConfig()
  }
}

export default BabelPluginApi
