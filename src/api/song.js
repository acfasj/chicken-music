import jsonp from 'common/js/jsonp'
import { getUid } from 'common/js/uid'
import { commonParams, options } from './config'
import axios from 'axios'

export function getVKey (songmid, filename) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const queryObj = {
    ...commonParams,
    cid: 205361747,
    format: 'json',
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    uin: 0,
    songmid,
    filename,
    guid: getUid()
  }

  return jsonp(url, queryObj, {
    ...options,
    param: 'callback'
  })
}

export function getLyric (mid) {
  const url = process.env.BASE_URL + '/api/lyric'

  const queryObj = {
    ...commonParams,
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  }

  return axios.get(url, {
    params: queryObj
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
