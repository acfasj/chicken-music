import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config.js'

export function getTopList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const queryObj = {
    ...commonParams,
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  }

  return jsonp(url, queryObj, options)
}

export function getMusicList (topid) {
  const url = 'https://shc.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const queryObj = {
    ...commonParams,
    topid,
    page: 'detail',
    type: 'top',
    tpl: 3,
    platform: 'h5'
  }

  return jsonp(url, queryObj, options)
}
