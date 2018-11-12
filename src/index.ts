import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios'
import utils from 'axios/lib/utils'
import settle from 'axios/lib/core/settle'
import buildURL from 'axios/lib/helpers/buildURL'
import createError from 'axios/lib/core/createError'
import encode from './encoder'
const warn = console.warn

export default function mpAdapter (config: AxiosRequestConfig) :AxiosPromise {
  return new Promise((resolve, reject) => {
    let requestTask: void | requestTask
    let requestData = config.data
    let requestHeaders = config.headers
    // miniprogram network request config
    const mpRequestOption: NetworkRequestOpts = {
      method: config.method as NetworkRequestMethod,
      url: buildURL(config.url, config.params, config.paramsSerializer),
      // Listen for success
      success: (mpResponse: NetworkRequestRes) => {
        let statusText = ''
        if (mpResponse.statusCode === 200) {
          statusText = 'OK'
        } else if (mpResponse.statusCode === 400) {
          statusText = 'Bad Request'
        }

        const response: AxiosResponse = {
          data: mpResponse.data,
          status: mpResponse.statusCode,
          statusText: statusText,
          headers: mpResponse.header,
          config: config,
          request: mpRequestOption
        }

        settle(resolve, reject, response)
      },
      // Handle request Exception
      fail: (error) => {
        if (error.errMsg.indexOf('request:fail abort') !== -1) {
          // Handle request cancellation (as opposed to a manual cancellation)
          reject(createError('Request aborted', config, 'ECONNABORTED', ''))
        } else if (error.errMsg.indexOf('timeout') !== -1) {
          // timeout
          reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', ''))
        } else {
          // NetWordError
          reject(createError('Network Error', config, null, ''))
        }
      },
      complete () {
        requestTask = undefined
      }
    }

    // HTTP basic authentication
    if (config.auth) {
      const [username, password] = [config.auth.username || '', config.auth.password || '']
      requestHeaders.Authorization = 'Basic ' + encode(username + ':' + password)
    }

    // Set the request timeout
    if (config.timeout !== 0) {
      warn('The "timeout" option is not supported by miniprogram. For more information about usage see "https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#全局配置"')
    }

    // Add headers to the request
    utils.forEach(requestHeaders, function setRequestHeader (val: any, key: string) {
      if ((typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') || key.toLowerCase() === 'referer') {
        // Remove Content-Type if data is undefined
        // and the miniprogram document said that '设置请求的 header，header 中不能设置 Referer'
        delete requestHeaders[key]
      }
    })
    mpRequestOption.header = requestHeaders

    // Add responseType to request if needed
    if (config.responseType) {
      mpRequestOption.responseType = config.responseType as responseType
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled (cancel) {
        if (!requestTask) {
          return
        }
        requestTask.abort()
        reject(cancel)
        // Clean up request
        requestTask = undefined
      })
    }

    if (requestData !== undefined) {
      mpRequestOption.data = requestData
    }

    requestTask = wx.request(mpRequestOption)
  })
}
