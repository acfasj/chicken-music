import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from '../common/js/util'

export const selectPlay = ({ commit, state }, { list, index }) => {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    const randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = randomList.findIndex(song => song.id === list[index].id)
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = ({ commit }, { list }) => {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  const randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = ({ commit, state }, song) => {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // playlist中是否有待插入的歌曲
  let fpIndex = playlist.findIndex(item => song.id === item.id)
  // 要插入的歌曲不在playlist中
  if (fpIndex < 0) {
    // 因为是插入歌曲, 所以索引要加1
    currentIndex++
    playlist.splice(currentIndex, 0, song)
  }

  let currentSIndex = sequenceList.findIndex(item => currentSong.id === item.id)
  let fpSIndex = sequenceList.findIndex(item => song.id === item.id)
  if (fpSIndex < 0) {
    currentSIndex++
    sequenceList.splice(currentSIndex, 0, song)
  }

  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
