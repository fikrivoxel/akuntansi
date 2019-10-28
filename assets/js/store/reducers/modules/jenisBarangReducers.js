import _ from 'lodash'
import {
  SET_JENIS_BARANG_LIST,
  REMOVE_JENIS_BARANG_LIST,
  ADD_JENIS_BARANG_LIST,
  UPDATE_JENIS_BARANG_LIST,
  REMOVE_ALL_JENIS_BARANG_LIST,
  SET_PAGINATION_LIST
} from '@/js/store/actions/jenisBarangActions'

const initState = {
  list: [],
  pagination: {}
}

const setJenisBarangList = function (state, payload) {
  return {
    ...state,
    list: payload
  }
}
const removeJenisBarangList = function (state, payload) {
  let idx = _.findIndex(state.list, {id: payload.id})
  if (idx === -1) return state
  return {
    ...state,
    list: [
      ...state.list.splice(idx, 1),
    ]
  }
}
const addJenisBarangList = function (state, payload) {
  return {
    ...state,
    list: [
      ...state.list,
      payload
    ]
  }
}
const updateJenisBarangList = function (state, payload) {
  let idx = _.findIndex(state.list, {id: payload.id})
  if (idx === -1) return state
  return {
    ...state,
    list: [
      ...state.list.splice(idx, 1, payload),
    ]
  }
}
const removeAllJenisBarangList = function (state) {
  return {
    ...state,
    list: []
  }
}
const setPaginationList = function (state, payload) {
  return {
    ...state,
    pagination: payload
  }
}

export default function jenisBarangReducers(state = initState, action) {
  let {payload, type} = action
  switch(type) {
    case SET_JENIS_BARANG_LIST:
      return setJenisBarangList(state, payload)
    case REMOVE_JENIS_BARANG_LIST:
      return removeJenisBarangList(state, payload)
    case ADD_JENIS_BARANG_LIST:
      return addJenisBarangList(state, payload)
    case UPDATE_JENIS_BARANG_LIST:
      return updateJenisBarangList(state, payload)
    case REMOVE_ALL_JENIS_BARANG_LIST:
      return removeAllJenisBarangList(state)
    case SET_PAGINATION_LIST:
      return setPaginationList(state, payload)
    default:
      return state
  }
}
