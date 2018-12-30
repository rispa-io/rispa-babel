import { TransformOptions } from '@babel/core'
import { Config } from './BabelPlugin'

export default (config: Config): TransformOptions => ({
  presets: [
    [require.resolve('../preset-app'), {
      env: {
        targets: {
          browsers: config.browsers,
        },
        useBuiltIns: 'entry',
      },
    }],
  ],
})
