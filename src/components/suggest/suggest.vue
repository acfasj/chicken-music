<template>
  <scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore" ref="scroll">
    <ul class="suggest-list">
      <li class="suggest-item" @click="selectItem(item)" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
  </scroll>
</template>

<script>
import { search } from 'api/search'
import { ERR_OK } from 'api/config'
import { isValidMusic, createSong, processSongUrl } from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import { mapMutations, mapActions } from 'vuex'

const TYPE_SINGER = 'singer'
const PERPAGE = 20

export default {
  components: {
    Scroll,
    Loading
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true
    }
  },
  watch: {
    query (newQuery) {
      this.search()
    }
  },
  methods: {
    search () {
      this.hasMore = true
      this.page = 1
      this.$refs.scroll.scrollTo(0, 0)
      this.getSearchData(true)
    },
    searchMore () {
      if (!this.hasMore) {
        return
      }
      this.page++
      this.getSearchData()
    },
    getSearchData (firstSearch = false) {
      search(this.query, this.page, this.showSinger, PERPAGE)
        .then(res => {
          if (res.code === ERR_OK) {
            if (firstSearch) {
              this._genResult(res.data).then(res => (this.result = res))
            } else {
              // concat后重新赋值, scroll的data才会改变, 才会watch到然后重新计算高度
              this._genResult(res.data).then(res => (this.result = this.result.concat(res)))
            }
            this._checkMore(res.data.song)
          }
        })
    },
    selectItem (item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singerid,
          name: item.singername,
          mid: item.singermid
        })
        this.setSinger(singer)
        return this.$router.push(`/search/${singer.id}`)
      }
      this.insertSong(item)
    },
    getIconCls (item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName (item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    _checkMore (song) {
      if (!song.list.length || (song.curnum + song.curpage * PERPAGE) >= song.totalnum) {
        this.hasMore = false
      }
    },
    _genResult (data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({
          ...data.zhida,
          type: TYPE_SINGER
        })
      }
      let songs = this._normalizegSons(data.song.list)
      return processSongUrl(songs).then(songs => {
        ret = ret.concat(songs)
        return ret
      })
    },
    _normalizegSons (list) {
      let ret = []
      list.forEach(musicData => {
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions(['insertSong'])
  }
}
</script>

<style lang="stylus">
.suggest
  height: 100%
  overflow: hidden
  .suggest-list
    padding: 0 30px
    .suggest-item
      display: flex
      align-items: center
      padding-bottom: 20px
    .icon
      flex: 0 0 30px
      width: 30px
      [class^='icon-']
        font-size: 14px
        color: $color-text-d
    .name
      flex: 1
      font-size: $font-size-medium
      color: $color-text-d
      overflow: hidden
      .text
        no-wrap()
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
