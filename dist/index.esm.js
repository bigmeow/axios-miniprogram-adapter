/*!
 * axios-miniprogram-adapter 0.3.5 (https://github.com/bigMeow/axios-miniprogram-adapter)
 * API https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/doc/api.md
 * Copyright 2018-2022 bigMeow. All Rights Reserved
 * Licensed under MIT (https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/LICENSE)
 */

import utils from 'axios/lib/utils';
import settle from 'axios/lib/core/settle';
import buildURL from 'axios/lib/helpers/buildURL';
import buildFullPath from 'axios/lib/core/buildFullPath';
import createError from 'axios/lib/core/createError';

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

var platFormName = "wechat" /* 微信 */;
/**
 * 获取各个平台的请求函数
 */
function getRequest() {
    switch (true) {
        case typeof wx === 'object':
            platFormName = "wechat" /* 微信 */;
            return wx.request.bind(wx);
        case typeof swan === 'object':
            platFormName = "baidu" /* 百度 */;
            return swan.request.bind(swan);
        case typeof dd === 'object':
            platFormName = "dd" /* 钉钉 */;
            // https://open.dingtalk.com/document/orgapp-client/send-network-requests
            return dd.httpRequest.bind(dd);
        case typeof my === 'object':
            /**
             * remark:
             * 支付宝客户端已不再维护 my.httpRequest，建议使用 my.request。另外，钉钉客户端尚不支持 my.request。若在钉钉客户端开发小程序，则需要使用 my.httpRequest。
             * my.httpRequest的请求头默认值为{'content-type': 'application/x-www-form-urlencoded'}。
             * my.request的请求头默认值为{'content-type': 'application/json'}。
             * 还有个 dd.httpRequest
             */
            platFormName = "alipay" /* 支付宝 */;
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
        case "wechat" /* 微信 */:
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
        case "dd" /* 钉钉 */:
        case "alipay" /* 支付宝 */:
            // https://docs.alipay.com/mini/api/network
            if ([14, 19].includes(error.error)) {
                reject(createError('Request aborted', config, 'ECONNABORTED', '', error));
            }
            else if ([13].includes(error.error)) {
                // timeout
                reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', '', error));
            }
            else {
                // NetWordError
                reject(createError('Network Error', config, null, '', error));
            }
            break;
        case "baidu" /* 百度 */:
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
    var _a;
    if (["alipay" /* 支付宝 */, "dd" /* 钉钉 */].includes(platFormName)) {
        config.headers = config.header;
        delete config.header;
        if ("dd" /* 钉钉 */ === platFormName && config.method !== 'GET' && ((_a = config.headers) === null || _a === void 0 ? void 0 : _a['Content-Type']) === 'application/json' && Object.prototype.toString.call(config.data) === '[object Object]') {
            // Content-Type为application/json时，data参数只支持json字符串，需要手动调用JSON.stringify进行序列化
            config.data = JSON.stringify(config.data);
        }
    }
    return config;
}

var isJSONstr = function (str) {
    try {
        return typeof str === 'string' && str.length && (str = JSON.parse(str)) && Object.prototype.toString.call(str) === '[object Object]';
    }
    catch (error) {
        return false;
    }
};
function mpAdapter(config, _a) {
    var _b = (_a === void 0 ? {} : _a).transformRequestOption, transformRequestOption = _b === void 0 ? function (requestOption) { return requestOption; } : _b;
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
            timeout: config.timeout,
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
        requestTask = request(transformRequestOption(transformConfig(mpRequestOption)));
    });
}

export default mpAdapter;
