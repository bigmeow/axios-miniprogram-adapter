import typescript from 'rollup-plugin-typescript2'
import pkg from '../package.json'

// 兼容 axios-miniprogram-adapter 和 @bigMeow/axios-miniprogram-adapter
const name = pkg.name.split('/').pop()
const version = pkg.version

const banner =
`/*!
 * axios-miniprogram-adapter ${version} (https://github.com/bigMeow/axios-miniprogram-adapter)
 * API https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/doc/api.md
 * Copyright 2018-${(new Date()).getFullYear()} bigMeow. All Rights Reserved
 * Licensed under MIT (https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/LICENSE)
 */
`

function getCompiler (opt) {
  return typescript(opt)
}

const external = [
  'axios/lib/helpers/buildURL',
  'axios/lib/utils',
  'axios/lib/core/settle',
  'axios/lib/core/createError'
]

export default {
  name,
  banner,
  getCompiler,
  external
}
