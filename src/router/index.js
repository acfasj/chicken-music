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
      component: () => import('components/recommend/recommend'),
      children: [
        {
          path: ':id',
          component: () => import('components/disc/disc')
        }
      ]
    },
    // 歌手
    {
      path: '/singer',
      component: () => import('components/singer/singer'),
      children: [
        {
          path: ':id',
          component: () => import('components/singer-detail/singer-detail')
        }
      ]
    },
    // 排行
    {
      path: '/rank',
      component: () => import('components/rank/rank'),
      children: [
        {
          path: ':id',
          component: () => import('components/top-list/top-list')
        }
      ]
    },
    // 搜索
    {
      path: '/search',
      component: () => import('components/search/search'),
      children: [
        {
          path: ':id',
          component: () => import('components/singer-detail/singer-detail')
        }
      ]
    }
  ]
})
