import App from '.'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    // pages 的首个页面会被编译成首页
    pages: [
      'pages/index',
      'pages/search-tip'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'axios测试',
      navigationBarTextStyle: 'black'
    }
  }
}
