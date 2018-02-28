import { TransformOptions } from 'babel-core'

const config: TransformOptions = {
  env: {
    production: {
      plugins: [ // TODO: Move to React plugin
        require.resolve('babel-plugin-transform-react-constant-elements'),
        require.resolve('babel-plugin-transform-react-inline-elements'),
        require.resolve('babel-plugin-transform-react-remove-prop-types'),
      ],
    },
    development: {
      plugins: [
        require.resolve('react-hot-loader/babel'),
      ],
    },
  },

  presets: [
    require.resolve('babel-preset-react'), // TODO: Move to React plugin
    require.resolve('babel-preset-es2015'),
    require.resolve('babel-preset-es2016'),
    require.resolve('babel-preset-es2017'),
  ],

  plugins: [
    require.resolve('babel-plugin-transform-runtime'),
    // require.resolve('babel-plugin-add-module-exports'),
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
