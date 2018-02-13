import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    // 推荐
    {
      path: '/recommend',
      component: () => import('components/recommend/recommend')
    },
    // 歌手
    {
      path: '/singer',
      component: () => import('components/singer/singer')
    },
    // 排行
    {
      path: '/rank',
      component: () => import('components/rank/rank')
    },
    // 搜索
    {
      path: '/search',
      component: () => import('components/search/search')
    }
  ]
})
