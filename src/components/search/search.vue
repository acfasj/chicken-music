<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>

    <div v-show="!query" class="shortcut-wrapper">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" v-for="item in hotKey" :key="item.k" @click="addQuery(item.k)">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-show="query" class="sugget-result">
      <suggest :query="query"></suggest>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import Suggest from 'components/suggest/suggest'

export default {
  components: {
    SearchBox,
    Suggest
  },
  data () {
    return {
      hotKey: [],
      query: ''
    }
  },
  created () {
    this._getHotKey()
  },
  methods: {
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
    },
    onQueryChange (query) {
      this.query = query
    },
    _getHotKey () {
      getHotKey()
        .then(res => {
          if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
        })
    }
  }
}
</script>

<style lang="stylus">
.search
  .search-box-wrapper
    margin: 20px
  .shortcut-wrapper, .sugget-result
    position: fixed
    top: 178px
    bottom: 0
    width: 100%
  .shortcut-wrapper
    .shortcut
      height: 100%
      overflow: hidden
      .hot-key
        margin: 0 20px 20px
        .title
          margin-bottom: 20px
          font-size: $font-size-medium
          color: $color-text-l
        .item
          display: inline-block
          padding: 5px 10px
          margin: 0 20px 10px 0
          border-radius: 6px
          background: $color-highlight-background
          font-size: $font-size-medium
          color: $color-text-d
</style>
