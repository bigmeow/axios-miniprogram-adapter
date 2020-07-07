// rollup.config.js

import common from './rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.aio.js',
    format: 'umd',
    // 如果不同时使用 export 与 export default 可打开legacy
    // legacy: true,
    name: common.name,
    banner: common.banner
  },
  external: common.external,
  plugins: [
    nodeResolve({
      main: true,
      extensions: ['.ts', '.js']
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    common.getCompiler()
  ]
}
