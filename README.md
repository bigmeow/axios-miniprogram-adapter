[![license](https://img.shields.io/npm/l/axios-miniprogram-adapter.svg)](https://github.com/bigmeow/axios-miniprogram-adapter/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/bigmeow/axios-miniprogram-adapter.svg?branch=master)](https://travis-ci.org/bigMeow/axios-miniprogram-adapter)
<a href="https://www.npmjs.com/package/axios-miniprogram-adapter"><img src="https://img.shields.io/npm/v/axios-miniprogram-adapter.svg" alt="Version"></a>
[![NPM downloads](http://img.shields.io/npm/dm/axios-miniprogram-adapter.svg?style=flat-square)](http://www.npmtrends.com/axios-miniprogram-adapter)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/bigMeow/axios-miniprogram-adapter.svg)](http://isitmaintained.com/project/bigMeow/axios-miniprogram-adapter "Percentage of issues still open")

axios的小程序适配器，支持在各个平台小程序中使用axios

## :star: 特性

- 支持微信、支付宝、钉钉、百度小程序，放心使用axios，最大限度复用web端axios的代码
- 支持TypeScript

<table>
    <tbody>
    <tr>
        <td align="center" valign="middle">
            <a href="https://developers.weixin.qq.com/miniprogram/dev/api/wx.request.html" target="_blank">
                <img src="./doc/wechat.png" alt="微信小程序" width="60">
                <div>微信小程序</div>
            </a>
        </td>
        <td align="center" valign="middle">
            <a href="https://docs.alipay.com/mini/api/network" target="_blank">
                <img src="./doc/alipay.png" alt="支付宝小程序" width="60">
                <div>支付宝小程序</div>
            </a>
        </td>
        <td align="center" valign="middle">
            <a href="https://docs.alipay.com/mini/multi-platform/common" target="_blank">
                <img src="./doc/dingding.png" alt="钉钉小程序" width="60">
                <div>钉钉小程序</div>
            </a>
        </td>
        <td align="center" valign="middle">
            <a href="https://smartprogram.baidu.com/docs/develop/api/net_request/#request/" target="_blank">
                <img src="./doc/baidu.png" alt="百度小程序" width="60">
                <div>百度小程序</div>
            </a>
        </td>
    </tr>
    </tbody>
</table>

## 催更、钉钉交流群：

<img width="200" alt="钉钉交流群" src="https://image-static.segmentfault.com/428/097/4280971404-5e8c793fa8d8f_articlex" />

## :open_file_folder: 目录介绍

```
.
├── demo 使用demo
├── dist 编译产出代码
├── doc 项目文档
├── src 源代码目录
├── test 单元测试
├── CHANGELOG.md 变更日志
└── TODO.md 计划功能
```

## :rocket: 使用者指南
### 1.如果你是webpack等环境

通过npm下载安装代码

```bash
$ npm i axios axios-miniprogram-adapter
```

```js
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
```

### 2.如果你没有使用任何脚手架工具
直接使用小程序开发工具自带的[```构建npm```](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)，请按下面几个步骤引入：
- 确保项目目录下有package.json文件，已有的跳过这一步
``` bash
$ npm init
```
- 安装
``` base
$ npm i axios axios-miniprogram-adapter
```
- 在小程序开发者工具中依次找到并点击`工具`->`构建npm`，构建完成后你的项目目录会多出一个`miniprogram_npm`目录

- 代码引入使用
```js
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
```

这里有一个代码片段demo可直接供你使用:[https://developers.weixin.qq.com/s/oIqQtBml7F4N](https://developers.weixin.qq.com/s/oIqQtBml7F4N),DEMO源码[点这里](https://github.com/bigmeow/axios-miniprogram-adapter/tree/master/demo/miniprograme-native)也可查看

### 3.如果你没有使用任何脚手架工具且npm也不用(不推荐)
直接拷贝编译后的[axios](https://github.com/axios/axios/tree/master/dist)、[axios-miniprogram-adapter](https://github.com/bigmeow/axios-miniprogram-adapter/tree/master/dist/miniprogram)到项目中:
```js
import axios from '你的目录/axios.js'
import mpAdapter from '你的目录/axios-miniprogram-adapter.js'
axios.defaults.adapter = mpAdapter
```

### 三种方式区别
小程序自带的npm不支持解析node_modules中的库再有外部依赖：例如本库中依赖了```axios```库的某些工具包，在源码中有下面的代码：
```js
import utils from 'axios/lib/utils'
```
在小程序开发工具中会报错，找不到此依赖。为此，我将依赖打包到一起，这样带来的问题是库的体积多了2kb，基于此，强烈推荐你使用类似于webpack的脚手架工具开发

## :bookmark_tabs: 文档
- 同axios官方仓库一致
- [与官方API的差异、注意事项](https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/doc/api.md)

## :chestnut: Demo
打开小程序开发者工具，根据不同平台，选择各自的目录作为项目根目录：
- 微信```axios-miniprogram-adapter/demo/miniprograme-example/dist-wechat```
- 支付宝、钉钉```axios-miniprogram-adapter/demo/miniprograme-example/dist-alipay```
- 百度 ```axios-miniprogram-adapter/demo/miniprograme-example/dist-swan```

该demo示范了几个常用功能的用法:

<image srC="./doc/example.png" width="300">

[点击查看代码具体用法示例](https://github.com/bigmeow/axios-miniprogram-adapter/blob/master/demo/miniprograme-example/src/pages/index/index.vue)

## :gear: 更新日志
[CHANGELOG.md](https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/CHANGELOG.md)

## :airplane: 计划列表
[TODO.md](https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/TODO.md)

