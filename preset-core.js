const { declare } = require('@babel/helper-plugin-utils')

module.exports = declare((api, options, env) => {
  api.assertVersion(7)

  const { useBuiltIns, targets } = options
  const isEnvProduction = env === 'production'
  const isTargetNode = targets && !!targets.node

  return {
    presets: [
      [require.resolve('@babel/preset-env'), {
        // Pass loose for transforms
        loose: true,

        // Exclude transforms that make all code slower
        exclude: ['transform-typeof-symbol'],

        // Do not transform modules to CJS
        modules: false,

        // for UglifyJS
        forceAllTransforms: !isEnvProduction && !isTargetNode,

        targets,

        useBuiltIns,
      }],
    ],

    plugins: [
      // Stage 2
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      require.resolve('@babel/plugin-proposal-function-sent'),
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      require.resolve('@babel/plugin-proposal-numeric-separator'),
      require.resolve('@babel/plugin-proposal-throw-expressions'),

      // Stage 3
      isTargetNode
        ? require.resolve('babel-plugin-dynamic-import-node')
        : require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-syntax-import-meta'),
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: false }],
      require.resolve('@babel/plugin-proposal-json-strings'),

      // Polyfills the runtime needed for async/await, generators, and friends
      // https://babeljs.io/docs/en/babel-plugin-transform-runtime
      [require.resolve('@babel/plugin-transform-runtime'), {
        corejs: false,
        helpers: true,
        regenerator: true,
      }],
    ],
  }
})
