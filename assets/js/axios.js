import axios from 'axios'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {configureStore as store} from '@/js/store/config'

axios.interceptors.request.use(config => {
  store.dispatch(showLoading())
  return config
}, err => {
  store.dispatch(hideLoading())
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  store.dispatch(showLoading())
  return response
}, err => {
  store.dispatch(hideLoading())
  return Promise.reject(err)
})

export default axios
