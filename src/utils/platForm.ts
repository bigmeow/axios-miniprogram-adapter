import createError from 'axios/lib/core/createError'
import { AxiosResponse, AxiosRequestConfig } from 'axios'

let platFormName: 'wechat' | 'alipay' | 'baidu' | 'toutiao' = 'wechat'

/**
 * 获取各个平台的请求函数
 */
export function getRequest (): (option: WechatMiniprogram.RequestOption) => WechatMiniprogram.RequestTask {
  switch (true) {
    // NOTE: Feishu must come before WeChat as there is also `wx` in some environments in Feishu.
    case typeof tt === 'object':
      // Toutiao has 2 kinds of mini-programs: 头条小程序 and 飞书小程序. Thankfully, the interfaces
      // of the request API are the same, but the condition might not hold true in the future.
      platFormName = 'toutiao'
      return tt.request.bind(tt);
    case typeof wx === 'object':
      platFormName = 'wechat'
      return wx.request.bind(wx)
    case typeof swan === 'object':
      platFormName = 'baidu'
      return swan.request.bind(swan)
    case typeof my === 'object':
      platFormName = 'alipay'
      return (my.request || my.httpRequest).bind(my)
    default:
      return wx.request.bind(wx)
  }
}

/**
 * 处理各平台返回的响应数据，抹平差异
 * @param mpResponse
 * @param config axios处理过的请求配置对象
 * @param request 小程序的调用发起请求时，传递给小程序api的实际配置
 */
export function transformResponse (mpResponse: MpResponse, config: AxiosRequestConfig, mpRequestOption: WechatMiniprogram.RequestOption): AxiosResponse {
  const headers = mpResponse.header || mpResponse.headers
  const status = mpResponse.statusCode || mpResponse.status

  let statusText = ''
  if (status === 200) {
    statusText = 'OK'
  } else if (status === 400) {
    statusText = 'Bad Request'
  }

  const response: AxiosResponse = {
    data: mpResponse.data,
    status,
    statusText,
    headers,
    config,
    request: mpRequestOption
  }
  return response
}

/**
 * 处理各平台返回的错误信息，抹平差异
 * @param error 小程序api返回的错误对象
 * @param reject 上层的promise reject 函数
 * @param config
 */
export function transformError (error:any, reject, config) {
  switch (platFormName) {
    case 'wechat':
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
      break
    case 'alipay':
      // https://docs.alipay.com/mini/api/network
      if ([14, 19].includes(error.error)) {
        reject(createError('Request aborted', config, 'ECONNABORTED', ''))
      } else if ([13].includes(error.error)) {
        // timeout
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', ''))
      } else {
        // NetWordError
        reject(createError('Network Error', config, null, ''))
      }
      break
    // Can't find reference to error messages on Feishu, leave it for now.
    case 'toutiao':
      reject(createError('Network Error', config, null, ''))
      break
    case 'baidu':
      // TODO error.errCode
      reject(createError('Network Error', config, null, ''))
      break
  }
}
