# 文档
由于小程序特性限制，下面的配置在小程序环境下将会自动被忽略


# 注意
在mpvue、megalo 它们提供的webpack脚手架中使用时,由于这些脚手架修改了webpack的target配置(不修改的话默认值是web),所以如果你直接在工程中引入axios会引起编译报错，解决方案：
```js
// 在自己的工程项目里给webpack配置文件增加下面的配置选项
resolve: {
  // https://webpack.docschina.org/configuration/resolve/#resolve-aliasfields 告诉weboack在target被修改后可以尝试去查找下package.json的miniprogram字段
  aliasFields: ['browser']
}
```
未修改webpack的target配置 的忽略此项
