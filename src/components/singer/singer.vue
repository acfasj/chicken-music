<template>
  <div class="singer" ref="singer">
    <listview :data="singers" @select="selectSinger" ref="listview"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'
import Listview from 'base/listview/listview'
import { mapMutations } from 'vuex'
import { playlistMixin } from 'common/js/mixins'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  components: {
    Listview
  },
  mixins: [playlistMixin],
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.listview.refresh()
    },
    selectSinger (singer) {
      this.$router.push(`/singer/${singer.id}`)
      this.setSinger(singer)
    },
    _getSingerList () {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_id,
            name: item.Fsinger_name,
            mid: item.Fsinger_mid
          }))
        }

        const k = item.Findex
        if (!map[k]) {
          map[k] = {
            title: k,
            items: []
          }
        }
        map[k].items.push(new Singer({
          id: item.Fsinger_id,
          name: item.Fsinger_name,
          mid: item.Fsinger_mid
        }))
      })

      let hot = []
      let rest = []
      for (let k of Object.keys(map)) {
        let val = map[k]
        if (val.title.match(/[a-zA-Z]/)) {
          rest.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      // 排序
      rest.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(rest)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style lang="stylus">
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>
