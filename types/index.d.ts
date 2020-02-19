  interface MpResponse extends WechatMiniprogram.RequestSuccessCallbackResult {
    /** 支付宝、钉钉独有 */
    headers: WechatMiniprogram.IAnyObject,
    status: number
  }

  declare let swan:  any
  
  declare let my:  any