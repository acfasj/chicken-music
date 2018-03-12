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
