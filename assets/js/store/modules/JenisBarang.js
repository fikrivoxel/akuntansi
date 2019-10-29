import _ from 'lodash'
import JenisBarang from '@/js/api/JenisBarang'

export default {
  state: {
    list: [],
    data: {
      createdAt: '',
      updatedAt: '',
      id: 0,
      jenis_barang: '',
      kode_jenis: ''
    },
    pagination: {}
  },
  getters: {
    list(state) {
      return state.list
    },
    listById(state) {
      return function (jenisbarang) {
        let data = _.find(state.list, {id: jenisbarang.id})
        if (_.isEmpty(data)) return
        return data
      }
    },
    data(state) {
      return state.data
    },
    pagination(state) {
      return state.pagination
    }
  },
  mutations: {
    setList(state, list) {
      state.list = list
    },
    setData(state, data) {
      state.data = data
    },
    setPagination(state, pagination) {
      state.pagination = pagination
    }
  },
  actions: {
    async getAll({commit}, page, perPage) {
      try {
        let {data, pagination} = await JenisBarang.getAll(page, perPage)
        commit('setList', data)
        commit('setPagination', pagination)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
