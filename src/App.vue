<template>
  <div id="app">
    <h1 class="color-main">aaaaa</h1>
    <router-view/>
  </div>
</template>

<script>
import { getDiscList } from 'api/recommend.js'
export default {
  name: 'App',
  created () {
    getDiscList()
      .then(res => {
        console.log(res)
      })
  }
}
</script>

<style lang="stylus">
#app
  .color-main
    color: $color-theme
    extend-click()
</style>
