import createError from 'axios/lib/core/createError'
import { AxiosResponse, AxiosRequestConfig } from 'axios'

const enum EnumPlatForm {
  微信 = 'wechat',
  支付宝 = 'alipay',
  百度 = 'baidu',
  钉钉 = 'dd'
}

let platFormName: EnumPlatForm = EnumPlatForm.微信

/**
 * 获取各个平台的请求函数
 */
export function getRequest (): (option: WechatMiniprogram.RequestOption) => WechatMiniprogram.RequestTask {
  switch (true) {
    case typeof wx === 'object':
      platFormName = EnumPlatForm.微信
      return wx.request.bind(wx)
    case typeof swan === 'object':
      platFormName = EnumPlatForm.百度
      return swan.request.bind(swan)
    case typeof dd === 'object':
      platFormName = EnumPlatForm.钉钉
      // https://open.dingtalk.com/document/orgapp-client/send-network-requests
      return dd.httpRequest.bind(dd)
    case typeof my === 'object':
      /**
       * remark:
       * 支付宝客户端已不再维护 my.httpRequest，建议使用 my.request。另外，钉钉客户端尚不支持 my.request。若在钉钉客户端开发小程序，则需要使用 my.httpRequest。
       * my.httpRequest的请求头默认值为{'content-type': 'application/x-www-form-urlencoded'}。
       * my.request的请求头默认值为{'content-type': 'application/json'}。
       * 还有个 dd.httpRequest  
       */
      platFormName  = EnumPlatForm.支付宝
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
    case EnumPlatForm.微信:
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
    case EnumPlatForm.钉钉:
    case EnumPlatForm.支付宝:
      // https://docs.alipay.com/mini/api/network
      if ([14, 19].includes(error.error)) {
        reject(createError('Request aborted', config, 'ECONNABORTED', '', error))
      } else if ([13].includes(error.error)) {
        // timeout
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', '', error))
      } else {
        // NetWordError
        reject(createError('Network Error', config, null, '', error))
      }
      break
     case EnumPlatForm.百度:
      // TODO error.errCode
      reject(createError('Network Error', config, null, ''))
      break
  }
}

/**
 * 将axios的请求配置，转换成各个平台都支持的请求config
 * @param config
 */
export function transformConfig (config: MpRequestConfig): any {
  if ([EnumPlatForm.支付宝, EnumPlatForm.钉钉].includes(platFormName)) {
    config.headers = config.header
    delete config.header
    if (EnumPlatForm.钉钉 === platFormName && config.headers?.["Content-Type"] === "application/json" && Object.prototype.toString.call(config.data) === '[object Object]' ) {
      // Content-Type为application/json时，data参数只支持json字符串，需要手动调用JSON.stringify进行序列化
      config.data = JSON.stringify(config.data)
    }
  }
  return config
}
