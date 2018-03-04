let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    moz: 'mozTransform',
    o: 'oTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle (styleAttr) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return styleAttr
  }

  return vendor + styleAttr.charAt(0).toUpperCase() + styleAttr.substr(1)
}
