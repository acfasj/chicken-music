<template>
  <div id="app">
    <m-header></m-header>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'

export default {
  name: 'App',
  components: {
    MHeader
  }
}
</script>

<style lang="stylus">
#app
  .color-main
    color: $color-theme
    extend-click()
</style>
