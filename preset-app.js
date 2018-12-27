const { declare } = require('@babel/helper-plugin-utils')

module.exports = declare((api, options, env) => {
  api.assertVersion(7)

  const isEnvDevelopment = env === 'development'
  const isEnvProduction = env === 'production'
  const isEnvTest = env === 'test'

  return {
    presets: [
      [require.resolve('./preset-core'), options.env],

      // JSX
      // https://github.com/babel/babel/tree/master/packages/babel-preset-react
      [require.resolve('@babel/preset-react'), {
        // Adds component stack to warning messages
        // Adds __self attribute to JSX which React will use for some warnings
        development: isEnvDevelopment || isEnvTest,
        // Will use the native built-in instead of trying to polyfill
        // behavior for any plugins that require one.
        useBuiltIns: true,
      }],
    ],
    plugins: [
      ...(isEnvProduction ? [
        // Treat React JSX elements as value types and hoist them to the highest scope
        // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-constant-elements
        require.resolve('@babel/plugin-transform-react-constant-elements'),

        // Replaces the React.createElement function with one that is more optimized for production
        // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-inline-elements
        require.resolve('@babel/plugin-transform-react-inline-elements'),

        // Remove unnecessary React propTypes from the production build
        // https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types
        [require.resolve('babel-plugin-transform-react-remove-prop-types'), {
          removeImport: true,
        }],
      ] : []),
    ].filter(Boolean),
  }
})
