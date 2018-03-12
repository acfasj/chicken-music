export function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function swap (arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

export function shuffle (oldArr) {
  const arr = oldArr.slice()
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = getRandomInt(0, i)
    swap(arr, i, randomIndex)
  }
  return arr
}
