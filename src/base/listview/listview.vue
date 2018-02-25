<template>
  <scroll
   class="listview"
   ref="listview"
   :data="data"
   :listenScroll="listenScroll"
   :probeType="probeType"
   @scroll="scroll"
  >
    <ul>
      <li v-for="(group, groupIdx) in data" :key="groupIdx" ref="listGroup" class="list-group">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li v-for="item in group.items" :key="item.id" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- shortcutList -->
    <div class="list-shortcut">
      <ul @touchstart="onShortcutTouchStart" @touchmove.stop="onShortcutTouchMove">
        <li
          class="item"
          v-for="(item, index) in shortcutList"
          :key="index"
          :data-index="index"
          :class="{current: index === currentIndex}"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- fixed title -->
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
    <!-- loading -->
    <div class="loading-wrapper" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  components: {
    Scroll,
    Loading
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },

  computed: {
    shortcutList () {
      return this.data.map(item => {
        return item.title.substr(0, 1)
      })
    },
    fixedTitle () {
      if (!this.data[this.currentIndex] || this.scrollY >= 0) {
        return ''
      }
      return this.data[this.currentIndex].title
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      // 1. 顶部bounce, newY > 0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 2. 正常滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let heigth2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < heigth2) {
          this.currentIndex = i
          this.diff = heigth2 + newY
          return
        }
      }
      // 3. 底部bounce, 且-newY大于最后一个元素的上限(最大的高度)
      this.currentIndex = listHeight.length - 2
    },
    diff (newVal) {
      const fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      // diff是一个实时变化的值, 如果fixedTop没有变化那就不要去修改dom了
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }
  },
  created () {
    // 在creted定义而不是在data里定义, 是因为touch无需是响应式的
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  methods: {
    onShortcutTouchStart (e) {
      // 因为从dataset取到, 为字符串, 所以需要转换为数字
      let anchorIndex = +e.target.dataset.index
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = Math.floor((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT)
      let anchorIndex = this.touch.anchorIndex + delta
      this._scrollTo(anchorIndex)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _scrollTo (index) {
      if (index >= 0 && index <= this.shortcutList.length) {
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index])
      }
    },
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.listview
  width: 100%
  height: 100%
  overflow: hidden
  background-color: $color-background
  .list-group
    padding-bottom: 30px
    .list-group-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
    .list-group-item
      display: flex
      align-items: center
      padding: 20px 0 0 30px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50%
      .name
        margin-left: 20px
        color: $color-text-l
        font-size: $font-size-medium
  .list-shortcut
    position: absolute
    right: 0
    top: 50%
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radius: 10px
    text-align: center
    background: $color-background-d
    font-family: Helvetica
    .item
      padding: 3px
      line-height: 1
      color: $color-text-l
      font-size: $font-size-small
      &.current
          color: $color-theme
  .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
  .loading-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
