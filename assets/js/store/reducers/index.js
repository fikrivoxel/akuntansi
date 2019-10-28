import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {loadingBarReducer} from 'react-redux-loading-bar'
import modules from '@/js/store/reducers/modules'

export default function createRootReducers(history) {
  return combineReducers({
    router: connectRouter(history),
    loadingBar: loadingBarReducer,
    ...modules
  })
}
