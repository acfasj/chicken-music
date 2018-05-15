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
