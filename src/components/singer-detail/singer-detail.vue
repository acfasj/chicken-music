<template>
  <transition name="slide">
    <div class="singer-detail">
      歌手详情
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters(['singer'])
  },
  created () {
    this._getDetail(this.singer.mid)
  },
  methods: {
    _getDetail (mid) {
      if (!mid) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(mid).then(res => {
        if (res.code === ERR_OK) {
          console.log(res)
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs (list) {
      let res = []
      list.forEach(item => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          res.push(createSong(musicData))
        }
      })

      return res
    }
  }
}
</script>

<style lang="stylus">
.singer-detail
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color $color-background
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
