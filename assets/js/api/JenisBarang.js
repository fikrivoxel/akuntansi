import axios from '@/js/axios'
import {API_BASE_URL} from '@/js/config'

export default {
  async getAll(page, perpage) {
    try {
      let {data: {result: {data, pagination}}} = await axios.get(`${API_BASE_URL}/jenisbarang`, {
        params: {
          page,
          perpage
        }
      })
      return {data, pagination}
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async postAdd(data) {
    try {
      await axios.post(`${API_BASE_URL}/jenisbarang`, data)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
