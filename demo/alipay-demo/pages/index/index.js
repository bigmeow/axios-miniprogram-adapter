import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter

// 创建实例 设置baseURL
const instance = axios.create({
  baseURL: 'https://wx.jk724.com'
})

Page({
  async handleRequestByGet() {
    my.showLoading();
    try {
      const resp = await instance.get('/api/HotSearchWords')
      console.log('GET请求成功:', resp)

    } catch (error) {
      // 
    } finally {
      my.hideLoading();
    }
  },
  async handleRequestByPOST() {
    my.showLoading();
    try {
      const resp = await instance.post('https://t.captcha.qq.com/cap_union_new_verify')
      console.log('POST请求成功:', resp)

    } catch (error) {
      // 
    } finally {
      my.hideLoading();
    }
  },
  // get请求带参数
  async handleRequestByGetParams() {
    my.showLoading();
    try {
      const resp = await instance({
        url: '/api/HotSearchWords',
        params: {
          name: '我是参数'
        }
      })
      console.log('get带参数请求成功:', resp)

    } catch (error) {
      // 
    } finally {
      my.hideLoading();
    }
  },
  //  post请求带参数(注意查看请求头的 content-type: application/json 和 请求体的 Reuquest Payload)
  async handleRequestByPOSTParams() {
    my.showLoading();
    try {
      const resp = await instance({
        method: 'POST',
        url: 'https://t.captcha.qq.com/cap_union_new_verify',
        data: {
          name: '我是参数'
        }
      })
      console.log('post带参数请求成功:', resp)

    } catch (error) {
      // 
    } finally {
      my.hideLoading();
    }
  },
  // 自定义请求头参数
  async handleRequestByHeaders() {
    my.showLoading();
    try {
      const resp = await instance({
        method: 'GET',
        url: '/api/HotSearchWords',
        headers: {
          Authorization: 'im a token'
        }
      })
      console.log('post带参数请求成功:', resp)

    } catch (error) {
      // 
    } finally {
      my.hideLoading();
    }
  },
  // 修改content type (注意查看请求头的 content-type: application/x-www-form-urlencoded 和 请求体的 form data)
  async handleRequestByContentType() {
    my.showLoading();
    try {
      const resp = await instance({
        method: 'POST',
        url: 'https://t.captcha.qq.com/cap_union_new_verify',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          name: '我是参数'
        }
      })
      console.log('post带参数请求成功:', resp)

    } catch (error) {
      // 
    } finally {
      my.hideLoading();
    }
  }
});
