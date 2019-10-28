import menus from '@/js/config/menus'

const API = {
  host: 'http://localhost:1337',
  prefix: '/api'
}

export const NODE_ENV = 'development'
export const API_BASE_URL = `${API.host}${API.prefix}`
export const MENUS = menus
