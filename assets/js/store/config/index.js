import dev from '@/js/store/config/dev'
import prod from '@/js/store/config/prod'
import {NODE_ENV} from '@/js/config'

const selectedConfigureStore = NODE_ENV === 'production' ? prod : dev

export const {history} = selectedConfigureStore
export const configureStore = selectedConfigureStore.configureStore()
