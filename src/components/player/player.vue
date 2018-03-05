<template>
  <div class="player" v-show="playlist.length > 0">
    <!-- 全屏的播放器 -->
    <div class="normal-player" v-show="fullScreen">
      <!-- 高斯模糊的背景 -->
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.image">
      </div>
      <!-- 顶部 -->
      <div class="top">
        <div class="back" @click="back">
          <i class="icon-back"></i>
        </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
      </div>
      <!-- 旋转的唱片 -->
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper">
            <div class="cd">
              <img class="image" :src="currentSong.image">
            </div>
          </div>
        </div>
      </div>
      <!-- 底部的操作区 -->
      <div class="bottom">
        <div class="operators">
          <div class="icon icon-left">
            <i class="icon-sequence"></i>
          </div>
          <div class="icon icon-left">
            <i class="icon-prev"></i>
          </div>
          <div class="icon icon-center">
            <i class="icon-play"></i>
          </div>
          <div class="icon icon-right">
            <i class="icon-next"></i>
          </div>
          <div class="icon icon-right">
            <i class="icon icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部的迷你播放器 -->
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="icon">
        <img width="40" height="40" :src="currentSong.image">
      </div>
      <div class="text">
        <h2 class="name" v-html="currentSong.name"></h2>
        <p class="desc" v-html="currentSong.singer"></p>
      </div>
      <div class="control">
        <i class="icon-playlist"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong'
    ])
  },
  methods: {
    back () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN'
    })
  }
}
</script>

<style lang="stylus">
.player
  .normal-player
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 150
    background: $color-background
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      opacity: 0.6
      filter: blur(20px)
    .top
      position: relative
      margin-bottom: 25px
      .back
        position: absolute
        top: 0
        left: 6px
        z-index: 50
        .icon-back
          display: inline-block
          padding: 9px
          font-size: $font-size-large-x
          color: $color-theme
          transform: rotate(-90deg)
      .title
        width: 70%
        margin: 0 auto
        line-height: 40px
        text-align: center
        no-wrap()
        font-size: $font-size-large
        color: $color-text
      .subtitle
        line-height: 20px
        text-align: center
        font-size: $font-size-medium
        color: $color-text
    .middle
      position: fixed
      width: 100%
      top: 80px
      bottom: 170px
      white-space: nowrap
      font-size: 0
      .middle-l
        display: inline-block
        vertical-align: top
        position: relative
        width: 100%
        padding-top: 80%
        .cd-wrapper
          position: absolute
          left: 10%
          top: 0
          width: 80%
          height: 100%
          .cd
            width: 100%
            height: 100%
            box-sizing: border-box
            border: 10px solid rgba(255, 255, 255, 0.1)
            border-radius: 50%
            .image
              position: absolute
              left: 0
              top: 0
              width: 100%
              height: 100%
              border-radius: 50%
    .bottom
      position: absolute
      bottom: 50px
      width: 100%
      .operators
        display: flex
        align-items: center
        .icon
          flex: 1
          color: $color-theme
          i
            font-size: 30px
        .icon-left
          text-align: right
        .icon-center
          padding: 0 20px
          text-align: center
          i
            font-size: 40px
        .icon-right
          text-align: left
  // 迷你播放器
  .mini-player
    display: flex
    align-items: center
    position: fixed
    left: 0
    bottom: 0
    z-index: 100
    width: 100%
    height: 60px
    background: $color-highlight-background
    .icon
      flex: 0 0 40px
      width: 40px
      padding: 0 10px 0 20px
      img
        border-radius: 50%
    .text
      display: flex
      flex-direction: column
      justify-content: center
      flex: 1
      line-height: 20px
      overflow: hidden
      .name
        margin-bottom: 2px
        no-wrap()
        font-size: $font-size-medium
        color: $color-text-d
      .desc
        no-wrap()
        font-size: $font-size-small
        color: $color-text-d
    .control
      flex: 0 0 30px
      width: 30px
      padding: 0 10px
      .icon-playlist
        font-size: 30px
        color: $color-theme-d
</style>
