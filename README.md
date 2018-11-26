[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bigmeow/axios-miniprogram-adapter/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/bigmeow/axios-miniprogram-adapter.svg?branch=master)](https://travis-ci.org/bigMeow/axios-miniprogram-adapter)
[![npm](https://img.shields.io/badge/npm-0.1.1-orange.svg)](https://www.npmjs.com/package/axios-miniprogram-adapter)
[![NPM downloads](http://img.shields.io/npm/dm/axios-miniprogram-adapter.svg?style=flat-square)](http://www.npmtrends.com/axios-miniprogram-adapter)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/bigMeow/axios-miniprogram-adapter.svg)](http://isitmaintained.com/project/bigMeow/axios-miniprogram-adapter "Percentage of issues still open")

axios的微信小程序适配器，以便于在小程序中使用axios

## 特性

- 微信小程序环境中放心使用axios，最大限度复用web端axios的代码
- 支持TypeScript


## 目录介绍

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

## 使用者指南
通过npm下载安装代码

```bash
$ npm install --save axios-miniprogram-adapter
```

如果你是webpack等环境

```js
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
```

## 文档
- 同axios官方仓库一致
- [与官方API的差异](https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/doc/api.md)

## 更新日志
[CHANGELOG.md](https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/CHANGELOG.md)

## 计划列表
[TODO.md](https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/TODO.md)

