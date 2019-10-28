import {createStore, applyMiddleware} from 'redux'
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'
import {loadingBarMiddleware} from 'react-redux-loading-bar'
import createRootReducers from '@/js/store/reducers'

const history = createBrowserHistory()
const rootReducer = createRootReducers(history)
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, router, loadingBarMiddleware())
const configureStore = function (initialState) {
  return createStore({
    rootReducer,
    initialState,
    enhancer
  })
}

export default { configureStore, history }
