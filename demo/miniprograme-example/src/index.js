import App from './App'
import Vue from 'vue'

const app = new Vue( App )

app.$mount( '#app' )

export default {
  config: {
    pages: [
      'pages/index/index',
      'pages/search-tip/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    _alipay: {
      window: {
        navigationBarTitleText: 'Alipay'
      }
    },
    _swan: {
      window: {
        navigationBarTitleText: 'Baidu'
      }
    }
  }
}
