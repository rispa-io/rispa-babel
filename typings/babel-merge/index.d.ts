declare module 'babel-merge' {
  import { TransformOptions } from '@babel/core'

  function babelMerge(source: TransformOptions, overrides: TransformOptions): TransformOptions

  export = babelMerge
}
