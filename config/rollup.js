var pkg = require('../package.json')

// 兼容 axios-miniprogram-adapter 和 @bigMeow/axios-miniprogram-adapter
var name = pkg.name.split('/').pop()
var version = pkg.version

var banner =
`/*!
 * axios-miniprogram-adapter ${version} (https://github.com/bigMeow/axios-miniprogram-adapter)
 * API https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/doc/api.md
 * Copyright 2018-${(new Date()).getFullYear()} bigMeow. All Rights Reserved
 * Licensed under MIT (https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/LICENSE)
 */
`

exports.name = name
exports.banner = banner
