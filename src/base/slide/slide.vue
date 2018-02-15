<template>
  <div class="slide" ref="slide">
    <div class="slide-group" ref="slideGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot"
        v-for="(item, index) in dots"
        :key="index"
        :class="{active: currentPageIndex === index}"
      >
      </span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 2000
    }
  },
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this._setslideWidth()
      this._initDots()
      this._initSlide()

      if (this.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if (!this.slide) { return }
      this._setslideWidth(true)
      this.slide.refresh()
    })
  },
  activated () {
    console.log('activated')
    if (!this.slide) { return }
    this.slide.enable()
    const pageIndex = this.slide.getCurrentPage().pageX
    this.slide.goToPage(pageIndex, 0, 0)
    this.currentPageIndex = pageIndex
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated () {
    console.log('deactivated')
    this.slide.disable()
    clearTimeout(this.timer)
  },
  beforeDestroy () {
    console.log('beforeDestroy')
    this.slide.disable()
    clearTimeout(this.timer)
  },
  methods: {
    _setslideWidth (isResize) {
      this.children = this.$refs.slideGroup.children
      let width = 0
      let slideWidth = this.$refs.slide.clientWidth

      for (let i = 0, len = this.children.length; i < len; i++) {
        const child = this.children[i]
        child.classList.add('slide-item')
        child.style.width = slideWidth + 'px'
        width += slideWidth
      }

      if (this.loop && !isResize) {
        width += 2 * slideWidth
      }
      this.$refs.slideGroup.style.width = width + 'px'
    },
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    _initSlide () {
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        },
        click: true
      })

      this.slide.on('scrollEnd', () => {
        let pageIndex = this.slide.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          // 手指拖动slide也会触发scrollEnd事件, 所以要清除上一轮_play()所添加的timer
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _play () {
      this.timer = setTimeout(() => {
        this.slide.next()
      }, this.interval)
    }
  }
}
</script>

<style lang="stylus" scoped>
.slide
  min-height: 1px
  position: relative
  .slide-group
    position: relative
    overflow: hidden
    white-space: nowrap
    .slide-item
      float: left
      box-sizing: border-box
      overflow: hidden
      text-align: center
      a
        display: block
        width: 100%
        overflow: hidden
        text-decoration: none
      img
        display: block
        width: 100%
  .dots
    position: absolute
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: $color-text-l
      &.active
        width: 20px
        border-radius: 5px
        background: $color-text-ll
</style>
