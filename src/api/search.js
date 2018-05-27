import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const queryObj = {
    ...commonParams,
    g_tk: 1259723281,
    platform: 'h5',
    needNewCode: 1
  }

  return jsonp(url, queryObj, options)
}

export function search (query, page, zhida = true) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const queryObj = {
    ...commonParams,
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    g_tk: 1259723281,
    platform: 'h5',
    needNewCode: 1,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    remoteplace: 'txt.mqq.all',
    format: 'jsonp'
  }

  return jsonp(url, queryObj, options)
}
