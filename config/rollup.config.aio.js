// rollup.config.js

// const uglify = require('rollup-plugin-uglify')
import common from './rollup'
import { uglify } from 'rollup-plugin-uglify'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const isProd = process.env.NODE_ENV === 'production'

export default {
  input: 'src/index.ts',
  output: {
    file: isProd ? 'dist/index.aio.min.js' : 'dist/index.aio.js',
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
      extensions: [ '.ts', '.js' ]
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    common.getCompiler(),
    (isProd && uglify())
  ]
}
