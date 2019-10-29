import axios from 'axios'
import {API_BASE_URL} from '@/js/config'
import errors from '@/js/tools/errors'

export default {
  async getAll(page = 1, perpage = 10) {
    try {
      let {data: {result}} = await axios.get(`${API_BASE_URL}/jenisbarang`, {
        params: {
          page, perpage
        }
      })
      return result
    } catch (err) {
      return Promise.reject(
        errors(err)
      )
    }
  },
  async getByName(name, page = 1, perpage = 10) {
    try {
      let {data: {result}} = await axios.get(`${API_BASE_URL}/jenisbarang/${name}/name`, {
        params: {
          page, perpage
        }
      })
      return result
    } catch (err) {
      return Promise.reject(
        errors(err)
      )
    }
  },
  async getOneByKode(kode) {
    try {
      let {data: {result}} = await axios.get(`${API_BASE_URL}/jenisbarang/${kode}`)
      return result
    } catch (err) {
      return Promise.reject(
        errors(err)
      )
    }
  }
}
