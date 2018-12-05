<template>
  <view>
    <input v-model="searchKey" class="search" type="search" placeholder="淘宝一下，你就知道" />
    <view class="linklist">
      <view class="link-item" v-for="linkItem in searchLinkResult" :key="linkItem[1]">{{linkItem[0]}}</view>
    </view>
  </view>
</template>

<script>
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
const CancelToken = axios.CancelToken;
export default {
  mpType: 'page',
  data () {
    return {
      searchKey: '', // 搜索关键词
      searchLinkResult: [], // 搜索联想结果
      cancel: undefined // 取消函数
    }
  },
  watch: {
    searchKey (newWords) {
      // TODO 这里还可以做函数节流优化，减少发起请求的频次
      this.searchAPI(newWords)
    }
  },
  methods: {
    searchAPI (keyWords) {
      if (this.cancel) {
        // 当用户打字速度太快时，我们每敲一个字符就调用一次搜索，没有必要，客户端也来不及渲染旧的数据又被新的数据覆盖了；
        // 所以在这里做一次优化，如果上一次搜索的请求还没收到响应，又要开始新的请求了，那么就主动取消上一次的搜索请求，重新发起新的请求
        this.cancel('主动取消上一个搜索接口的调用')
      }
      axios.get('https://suggest.taobao.com/sug', {
        cancelToken: new CancelToken(c => this.cancel = c),
        params: {
          q: keyWords,
          code: 'utf-8',
          area: 'c2c'
        }
      })
      .then(res => {
        this.searchLinkResult = res.data.result
        // console.log('请求结果', res)
      })
      .catch(error => {
         if (axios.isCancel(error)) {
           console.log('主动取消了请求原因：', error)
           return
         }
         console.log('其他错误', error)
      })
    }
  }
}
</script>

<style>
.search {
  border: 1px solid #000;
  border-radius: 4px;
  margin: 20px;
  padding: 0 20rpx;
}
</style>


