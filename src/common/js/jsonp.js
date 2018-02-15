import originJsonp from 'jsonp'

export default function jsonp (url, queryObj, opts) {
  function param (queryObj) {
    let url = ''
    for (let k of Object.keys(queryObj)) {
      const val = queryObj[k] !== undefined ? queryObj[k] : ''
      url += `&${k}=${encodeURIComponent(val)}`
    }
    return url ? url.substring(1) : ''
  }
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(queryObj)

  return new Promise((resolve, reject) => {
    originJsonp(url, opts, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
