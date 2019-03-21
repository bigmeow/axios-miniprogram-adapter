## :bomb: 差异
由于小程序特性限制，下面的配置在小程序环境下将会自动被忽略

- timeout
- withCredentials
- xsrfCookieName
- xsrfHeaderName
- onUploadProgress
- onDownloadProgress



## :warning: 注意
在mpvue、megalo 等vue转小程序的框架中使用时,由于这些框架修改了webpack的target配置(不修改的话默认值是web)，它们的修改代码:
```js
// mpvue 的 https://github.com/mpvue/mpvue-quickstart/blob/master/template/build/webpack.base.conf.js
target: require('mpvue-webpack-target')
```
```js
//megalo 的  https://github.com/kaola-fed/megalo-demo/blob/master/build/createBaseConfig.js
target: createMegaloTarget( {
  compiler: Object.assign( compiler, { } ),
  platform,
  htmlParse: {
    templateName: 'octoParse',
    src: _.resolve(`./node_modules/octoparse/lib/platform/${platform}`)
  }
} )
```
所以如果你直接在工程中引入```axios``` 会引起编译报错,这是因为```axios```同时支持了nodejs和浏览器的http请求,你在浏览器使用axios就不打包nodejs相关的代码,在nodejs使用时axios则不打包浏览器相关的xmlHttpRequest对象,从而减少打包的体积,为了实现这个效果,axios的package.json加了下面这行配置:
```json
// 表示在webpack的target值为 web 时,将代码中的http.js(nodejs环境需要的)引用替换成xhr.js(浏览器环境需要的),从而实现只打包相关平台代码的作用
"browser": {
  "./lib/adapters/http.js": "./lib/adapters/xhr.js"
}
```
而webpack配置文件的target被修改后,axios的这个配置就不起作用了,就会去加载nodejs环境的代码,从而导致编译报错
### :bulb: 解决方案
- 在自己的工程项目里给webpack配置文件增加下面的配置选项([参考例子第59行](https://github.com/bigmeow/axios-miniprogram-adapter/blob/master/demo/miniprograme-example/build/createBaseConfig.js)):
```js
resolve: {
  // https://webpack.docschina.org/configuration/resolve/#resolve-aliasfields 告诉weboack在target被修改后可以尝试去查找下package.json的browser字段
  aliasFields: ['browser']
}
```
这样axios被webpack编译时就不会去加载nodejs而是浏览器端的ajax代码，在小程序中用不上这段代码，大概会增加2kb的包体积大小，不过目前没有办法解决，除非axios官方修改打包策略

未修改webpack的target配置 的忽略此项


如果您使用1.x版本的megalo cli 创建的项目，请参照这里进行修改:https://github.com/bigmeow/axios-miniprogram-adapter/blob/master/demo/miniprograme-example-megalo/megalo.config.js

