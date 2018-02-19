<template>
  <scroll class="listview" :data="data" ref="listview">
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
        <li v-for="(item, index) in shortcutList" :key="index" :data-index="index" class="item">
          {{ item }}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'

const ANCHOR_HEIGHT = 18

export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  components: {
    Scroll
  },
  computed: {
    shortcutList () {
      return this.data.map(item => {
        return item.title.substr(0, 1)
      })
    }
  },
  created () {
    // 在creted定义而不是在data里定义, 是因为touch无需是响应式的
    this.touch = {}
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
      // console.log(anchorIndex, '啊啊')
      this._scrollTo(anchorIndex)
    },
    _scrollTo (index) {
      if (index >= 0 && index <= this.shortcutList.length) {
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index])
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
</style>
