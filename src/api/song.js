import jsonp from 'common/js/jsonp'
import { getUid } from 'common/js/uid'
import { commonParams, options } from './config'

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
