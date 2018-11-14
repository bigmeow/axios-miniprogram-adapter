(global["webpackJsonp"] = global["webpackJsonp"] || []).push([[1],{

/***/ "./src/adapter/mp.js":
/*!***************************!*\
  !*** ./src/adapter/mp.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*eslint no-console:0*/

var utils = __webpack_require__(/*! axios/lib/utils */ "../node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! axios/lib/core/settle */ "../node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! axios/lib/helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");
var createError = __webpack_require__(/*! axios/lib/core/createError */ "../node_modules/axios/lib/core/createError.js");
var base64 = __webpack_require__(/*! js-base64 */ "./node_modules/js-base64/base64.js").Base64;
var warn = console.warn;

module.exports = function mpAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var mpConfig = {
      method: config.method.toUpperCase(),
      url: buildURL(config.url, config.params, config.paramsSerializer)
    };
    var requestData = config.data;
    var requestHeaders = config.headers;
    var requestTask;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + base64.encode(username + ':' + password);
    }

    // Set the request timeout
    if (config.timeout !== 0) {
      warn('The "timeout" option is not supported by miniprogram. For more information about usage see "https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#全局配置"');
    }

    // Listen for success
    mpConfig.success = function handleSuccess(mpResponse) {
      // mpResponse formats: {data: any, errMsg: string, header: {[string]:string}, statusCode: number}
      // Prepare the response
      var statusText = '';
      if (mpResponse.statusCode === 200) {
        statusText = 'OK';
      } else if (mpResponse.statusCode === 400) {
        statusText = 'Bad Request';
      }

      var response = {
        data: mpResponse.data,
        status: mpResponse.statusCode,
        statusText: statusText,
        headers: mpResponse.header,
        config: config,
        request: ''
      };

      settle(resolve, reject, response);
    };

    // Handle request Exception
    mpConfig.fail = function handleError(error) {
      if (error.errMsg.indexOf('request:fail abort') !== -1) {
        // Handle request cancellation (as opposed to a manual cancellation)
        reject(createError('Request aborted', config, 'ECONNABORTED', ''));
      } else if (error.errMsg.indexOf('timeout') !== -1) {
        // timeout
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', ''));
      } else {
        // NetWordError
        reject(createError('Network Error', config, null, ''));
      }
    };

    // Add headers to the request
    utils.forEach(requestHeaders, function setRequestHeader(val, key) {
      if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type' || key.toLowerCase() === 'referer') {
        // Remove Content-Type if data is undefined
        // and the miniprogram document said that '设置请求的 header，header 中不能设置 Referer'
        delete requestHeaders[key];
      }
    });
    mpConfig.header = requestHeaders;

    // Add responseType to request if needed
    if (config.responseType) {
      mpConfig.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      warn('not support "onDownloadProgress" option by miniprogram');
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function') {
      warn('not support "onUploadProgress" option by miniprogram');
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
        requestTask = null;
      });
    }

    if (requestData !== undefined) {
      mpConfig.data = requestData;
    }
    // Send the request
    requestTask = wx.request(mpConfig);
  });
};

/***/ })

}]);