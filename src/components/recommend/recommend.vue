<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper">
        <slide v-if="recommends.length">
          <div v-for="item in recommends" :key="item.id">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slide>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Slide from 'base/slide/slide'
import { getRecommend } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  components: {
    Slide
  },
  data () {
    return {
      recommends: []
    }
  },
  created () {
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          console.log(res)
          this.recommends = res.data.slider
        }
      })
    }
  }
}
</script>

<style lang="stylus">

</style>
