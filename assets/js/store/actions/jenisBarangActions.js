import JenisBarang from '@/js/api/JenisBarang'

export const SET_JENIS_BARANG_LIST = 'SET_JENIS_BARANG_LIST'
export const REMOVE_JENIS_BARANG_LIST = 'REMOVE_JENIS_BARANG_LIST'
export const ADD_JENIS_BARANG_LIST = 'ADD_JENIS_BARANG_LIST'
export const UPDATE_JENIS_BARANG_LIST = 'UPDATE_JENIS_BARANG_LIST'
export const REMOVE_ALL_JENIS_BARANG_LIST = 'REMOVE_ALL_JENIS_BARANG_LIST'
export const SET_PAGINATION_LIST = 'SET_PAGINATION_LIST'

export const setJenisBarangList = function (payload) {
  return {
    type: SET_JENIS_BARANG_LIST,
    payload
  }
}
export const removeJenisBarangList = function (payload) {
  return {
    type: REMOVE_JENIS_BARANG_LIST,
    payload
  }
}
export const addJenisBarangList = function (payload) {
  return {
    type: ADD_JENIS_BARANG_LIST,
    payload
  }
}
export const updateJenisBarangList = function (payload) {
  return {
    type: UPDATE_JENIS_BARANG_LIST,
    payload
  }
}
export const removeAllJenisBarangList = function () {
  return {
    type: REMOVE_ALL_JENIS_BARANG_LIST
  }
}
export const setPaginationList = function (payload) {
  return {
    type: SET_PAGINATION_LIST,
    payload
  }
}

export const getAll = (page, perpage) => async dispatch => {
  try {
    let {data, pagination} = await JenisBarang.getAll(page, perpage)
    dispatch(setJenisBarangList(data))
    dispatch(setPaginationList(pagination))
  } catch (err) {
    dispatch(removeAllJenisBarangList())
    dispatch(setPaginationList({}))
  }
  return Promise.resolve()
}

export const postAdd = data => async dispatch => {
  try {
    await JenisBarang.postAdd(data)
    return Promise.resolve()
  } catch (err) {
    return Promise.reject(err)
  }
}
