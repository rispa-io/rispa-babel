import { TransformOptions } from 'babel-core'

const config: TransformOptions = {
  plugins: [
    require.resolve('babel-plugin-transform-runtime'),
    require.resolve('babel-plugin-transform-decorators-legacy'),
    require.resolve('babel-plugin-transform-react-display-name'),
    require.resolve('babel-plugin-transform-object-rest-spread'),
    require.resolve('babel-plugin-transform-class-properties'),
    require.resolve('babel-plugin-dynamic-import-webpack'),
    [require.resolve('babel-plugin-transform-imports'), { // TODO: Move settings to BabelPluginApi
      ramda: {
        transform: 'ramda/src/${member}',
        preventFullImport: true,
      },
    }],
  ],

  ignore: [],
}

export default config
