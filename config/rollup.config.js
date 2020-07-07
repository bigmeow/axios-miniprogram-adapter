// rollup.config.js

import common from './rollup'
import nodeResolve from '@rollup/plugin-node-resolve'

const isProd = process.env.NODE_ENV === 'production'
export default {
  input: 'src/index.ts',
  output: {
    file: isProd ? 'dist/miniprogram/index.js' : 'dist/index.js',
    format: 'cjs',
    // 如果不同时使用 export 与 export default 可打开legacy
    // legacy: true,
    banner: common.banner
  },
  external: common.external,
  plugins: [
    nodeResolve({
      main: true,
      extensions: ['.ts', '.js']
    }),
    common.getCompiler({
      tsconfigOverride: { compilerOptions: { declaration: true } },
      useTsconfigDeclarationDir: true
    })
  ]
}
