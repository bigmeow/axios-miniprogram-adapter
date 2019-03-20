module.exports = {
  chainWebpack: chainConfig => {
    
    chainConfig.resolve.aliasFields.add('browser')
    // console.log('chainWebpack执行了', chainConfig.toString())
  },

  css: {
    loaderOptions: {
      // https://github.com/megalojs/megalo-px2rpx-loader
      px2rpx: false
    }
  }
}
