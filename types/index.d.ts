  interface MpResponse extends WechatMiniprogram.RequestSuccessCallbackResult {
    /** 支付宝、钉钉独有 */
    headers: WechatMiniprogram.IAnyObject,
    status: number
  }

  interface MpRequestConfig extends WechatMiniprogram.RequestOption {
    /** 仅支付宝、钉钉小程序独有 */
    headers?: WechatMiniprogram.IAnyObject
  }

  declare let swan:  any
  
  declare let my:  any