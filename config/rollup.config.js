// rollup.config.js

import common from './rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const isProd = process.env.NODE_ENV === 'production'
export default {
  input: 'src/index.ts',
  output: {
    file: isProd ? 'dist/miniprogram/index.js' : 'dist/index.js',
    format: 'cjs',
    // 如果不同时使用 export 与 export default 可打开legacy
    // legacy: true,
    banner: common.banner
    // sourcemap: isProd
  },
  // 小程序不支持包内require别的包，必须把别的包也一起打包进来
  external: isProd ? [] : common.external,
  plugins: [
    nodeResolve({
      main: true,
      extensions: ['.ts', '.js']
    }),
    commonjs({
      include: /node_modules/,
      transformMixedEsModules: true
    }),
    common.getCompiler({
      tsconfigOverride: { compilerOptions: { declaration: true } },
      useTsconfigDeclarationDir: true
    })
  ]
}
