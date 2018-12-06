/*!
 * axios-miniprogram-adapter 0.2.0 (https://github.com/bigMeow/axios-miniprogram-adapter)
 * API https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/doc/api.md
 * Copyright 2018-2018 bigMeow. All Rights Reserved
 * Licensed under MIT (https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/LICENSE)
 */

import utils from 'axios/lib/utils';
import settle from 'axios/lib/core/settle';
import buildURL from 'axios/lib/helpers/buildURL';
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

var warn = console.warn;
function getPlatForm() {
    switch (true) {
        case typeof wx === 'object':
            return wx;
        case typeof swan === 'object':
            return swan;
        case typeof my === 'object':
            return my;
        default:
            return wx;
    }
}
function mpAdapter(config) {
    return new Promise(function (resolve, reject) {
        var requestTask;
        var requestData = config.data;
        var requestHeaders = config.headers;
        // miniprogram network request config
        var mpRequestOption = {
            method: config.method,
            url: buildURL(config.url, config.params, config.paramsSerializer),
            // Listen for success
            success: function (mpResponse) {
                var statusText = '';
                if (mpResponse.statusCode === 200) {
                    statusText = 'OK';
                }
                else if (mpResponse.statusCode === 400) {
                    statusText = 'Bad Request';
                }
                var response = {
                    data: mpResponse.data,
                    status: mpResponse.statusCode,
                    statusText: statusText,
                    headers: mpResponse.header,
                    config: config,
                    request: mpRequestOption
                };
                settle(resolve, reject, response);
            },
            // Handle request Exception
            fail: function (error) {
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
            else if (typeof requestData === 'string' && _header === 'content-type' && val === 'application/x-www-form-urlencoded') {
                // Wechat miniprograme document:对于 POST 方法且 header['content-type'] 为 application/x-www-form-urlencoded 的数据，小程序会将数据转换成 query string （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...
                // Specialized processing of wechat,jsut pass the object parameters
                try {
                    requestData = JSON.parse(requestData);
                }
                catch (error) {
                }
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
        if (requestData !== undefined) {
            mpRequestOption.data = requestData;
        }
        var platForm = getPlatForm();
        requestTask = platForm.request(mpRequestOption);
    });
}

export default mpAdapter;
