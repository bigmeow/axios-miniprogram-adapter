<template>
  <div class="hello">
    <h1 :style="'color:'+color">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    'color': String,
    'msg': {
      default: 'Welcome to Megalo'
    }
  },
  data () {
    return { }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    font-size: 16px;
    text-align: center;
  }
</style>
