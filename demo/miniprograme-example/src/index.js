import App from './App'
import Vue from 'vue'

const app = new Vue( App )

app.$mount( '#app' )

export default {
  config: {
    pages: [
      'pages/search-tip/index',
      'pages/index/index',

    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
}
