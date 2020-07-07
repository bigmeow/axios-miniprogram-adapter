/*!
 * axios-miniprogram-adapter 0.3.1 (https://github.com/bigMeow/axios-miniprogram-adapter)
 * API https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/doc/api.md
 * Copyright 2018-2020 bigMeow. All Rights Reserved
 * Licensed under MIT (https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/LICENSE)
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios/lib/utils'), require('axios/lib/core/settle'), require('axios/lib/helpers/buildURL'), require('axios/lib/core/buildFullPath'), require('axios/lib/core/createError')) :
  typeof define === 'function' && define.amd ? define(['axios/lib/utils', 'axios/lib/core/settle', 'axios/lib/helpers/buildURL', 'axios/lib/core/buildFullPath', 'axios/lib/core/createError'], factory) :
  (global = global || self, global['axios-miniprogram-adapter'] = factory(global.utils, global.settle, global.buildURL, global.buildFullPath, global.createError));
}(this, (function (utils, settle, buildURL, buildFullPath, createError) { 'use strict';

  utils = utils && Object.prototype.hasOwnProperty.call(utils, 'default') ? utils['default'] : utils;
  settle = settle && Object.prototype.hasOwnProperty.call(settle, 'default') ? settle['default'] : settle;
  buildURL = buildURL && Object.prototype.hasOwnProperty.call(buildURL, 'default') ? buildURL['default'] : buildURL;
  buildFullPath = buildFullPath && Object.prototype.hasOwnProperty.call(buildFullPath, 'default') ? buildFullPath['default'] : buildFullPath;
  createError = createError && Object.prototype.hasOwnProperty.call(createError, 'default') ? createError['default'] : createError;

  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  // encoder
  function encoder(input) {
      var str = String(input);
      // initialize result and counter
      var block;
      var charCode;
      var idx = 0;
      var map = chars;
      var output = '';
      for (; 
      // if the next str index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      str.charAt(idx | 0) || (map = '=', idx % 1); 
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
          charCode = str.charCodeAt(idx += 3 / 4);
          if (charCode > 0xFF) {
              throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
          }
          block = block << 8 | charCode;
      }
      return output;
  }

  var platFormName = 'wechat';
  /**
   * 获取各个平台的请求函数
   */
  function getRequest() {
      switch (true) {
          case typeof wx === 'object':
              platFormName = 'wechat';
              return wx.request.bind(wx);
          case typeof swan === 'object':
              platFormName = 'baidu';
              return swan.request.bind(swan);
          case typeof my === 'object':
              /**
               * remark:
               * 支付宝客户端已不再维护 my.httpRequest，建议使用 my.request。另外，钉钉客户端尚不支持 my.request。若在钉钉客户端开发小程序，则需要使用 my.httpRequest。
               * my.httpRequest的请求头默认值为{'content-type': 'application/x-www-form-urlencoded'}。
               * my.request的请求头默认值为{'content-type': 'application/json'}。
               * TODO: 区分支付宝和钉钉环境
               * 还有个 dd.httpRequest   WFK!!! https://ding-doc.dingtalk.com/doc#/dev/httprequest
               */
              platFormName = 'alipay';
              return (my.request || my.httpRequest).bind(my);
          default:
              return wx.request.bind(wx);
      }
  }
  /**
   * 处理各平台返回的响应数据，抹平差异
   * @param mpResponse
   * @param config axios处理过的请求配置对象
   * @param request 小程序的调用发起请求时，传递给小程序api的实际配置
   */
  function transformResponse(mpResponse, config, mpRequestOption) {
      var headers = mpResponse.header || mpResponse.headers;
      var status = mpResponse.statusCode || mpResponse.status;
      var statusText = '';
      if (status === 200) {
          statusText = 'OK';
      }
      else if (status === 400) {
          statusText = 'Bad Request';
      }
      var response = {
          data: mpResponse.data,
          status: status,
          statusText: statusText,
          headers: headers,
          config: config,
          request: mpRequestOption
      };
      return response;
  }
  /**
   * 处理各平台返回的错误信息，抹平差异
   * @param error 小程序api返回的错误对象
   * @param reject 上层的promise reject 函数
   * @param config
   */
  function transformError(error, reject, config) {
      switch (platFormName) {
          case 'wechat':
              if (error.errMsg.indexOf('request:fail abort') !== -1) {
                  // Handle request cancellation (as opposed to a manual cancellation)
                  reject(createError('Request aborted', config, 'ECONNABORTED', ''));
              }
              else if (error.errMsg.indexOf('timeout') !== -1) {
                  // timeout
                  reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', ''));
              }
              else {
                  // NetWordError
                  reject(createError('Network Error', config, null, ''));
              }
              break;
          case 'alipay':
              // https://docs.alipay.com/mini/api/network
              if ([14, 19].includes(error.error)) {
                  reject(createError('Request aborted', config, 'ECONNABORTED', ''));
              }
              else if ([13].includes(error.error)) {
                  // timeout
                  reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', ''));
              }
              else {
                  // NetWordError
                  reject(createError('Network Error', config, null, ''));
              }
              break;
          case 'baidu':
              // TODO error.errCode
              reject(createError('Network Error', config, null, ''));
              break;
      }
  }
  /**
   * 将axios的请求配置，转换成各个平台都支持的请求config
   * @param config
   */
  function transformConfig(config) {
      if (platFormName === 'alipay') {
          config.headers = config.header;
          delete config.header;
      }
      return config;
  }

  var warn = console.warn;
  var isJSONstr = function (str) {
      try {
          return typeof str === 'string' && str.length && (str = JSON.parse(str)) && Object.prototype.toString.call(str) === '[object Object]';
      }
      catch (error) {
          return false;
      }
  };
  function mpAdapter(config) {
      var request = getRequest();
      return new Promise(function (resolve, reject) {
          var requestTask;
          var requestData = config.data;
          var requestHeaders = config.headers;
          // baidu miniprogram only support upperCase
          var requestMethod = (config.method && config.method.toUpperCase()) || 'GET';
          // miniprogram network request config
          var mpRequestOption = {
              method: requestMethod,
              url: buildURL(buildFullPath(config.baseURL, config.url), config.params, config.paramsSerializer),
              // Listen for success
              success: function (mpResponse) {
                  var response = transformResponse(mpResponse, config, mpRequestOption);
                  settle(resolve, reject, response);
              },
              // Handle request Exception
              fail: function (error) {
                  transformError(error, reject, config);
              },
              complete: function () {
                  requestTask = undefined;
              }
          };
          // HTTP basic authentication
          if (config.auth) {
              var _a = [config.auth.username || '', config.auth.password || ''], username = _a[0], password = _a[1];
              requestHeaders.Authorization = 'Basic ' + encoder(username + ':' + password);
          }
          // Set the request timeout
          if (config.timeout !== 0) {
              warn('The "timeout" option is not supported by miniprogram. For more information about usage see "https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#全局配置"');
          }
          // Add headers to the request
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
              var _header = key.toLowerCase();
              if ((typeof requestData === 'undefined' && _header === 'content-type') || _header === 'referer') {
                  // Remove Content-Type if data is undefined
                  // And the miniprogram document said that '设置请求的 header，header 中不能设置 Referer'
                  delete requestHeaders[key];
              }
          });
          mpRequestOption.header = requestHeaders;
          // Add responseType to request if needed
          if (config.responseType) {
              mpRequestOption.responseType = config.responseType;
          }
          if (config.cancelToken) {
              // Handle cancellation
              config.cancelToken.promise.then(function onCanceled(cancel) {
                  if (!requestTask) {
                      return;
                  }
                  requestTask.abort();
                  reject(cancel);
                  // Clean up request
                  requestTask = undefined;
              });
          }
          // Converting JSON strings to objects is handed over to the MiniPrograme
          if (isJSONstr(requestData)) {
              requestData = JSON.parse(requestData);
          }
          if (requestData !== undefined) {
              mpRequestOption.data = requestData;
          }
          requestTask = request(transformConfig(mpRequestOption));
      });
  }

  return mpAdapter;

})));
