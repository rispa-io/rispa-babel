import { TransformOptions } from '@babel/core'

export interface Config {
  browsers: string[],
}

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
