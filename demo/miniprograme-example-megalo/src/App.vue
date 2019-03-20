
<script>
  export default {
    mpType: 'app',
    onLaunch: function (options) {
      // Do something initial when launch.
      console.log('App onLaunch, env文件自定义的环境变量VUE_APP_TEST值:', process.env.VUE_APP_TEST)
    }
  }
</script>
