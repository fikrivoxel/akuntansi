import {createStore, applyMiddleware, compose} from 'redux'
import {createBrowserHistory} from 'history'
import {routerMiddleware, routerActions} from 'connected-react-router'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {loadingBarMiddleware} from 'react-redux-loading-bar'
import createRootReducers from '@/js/store/reducers'
import * as jenisBarangActions from '@/js/store/actions/jenisBarangActions'
import {NODE_ENV} from '@/js/config'

const history = createBrowserHistory()
const rootReducers = createRootReducers(history)
const configureStore  = function (initState) {
  let middleware = [], enhancers = []
  middleware.push(thunk)
  let logger = createLogger({
    level: 'info',
    collapsed: true
  })
  if (NODE_ENV !== 'test') middleware.push(logger)
  let router = routerMiddleware(history)
  middleware.push(router)
  let actionsCreators = {
    ...jenisBarangActions,
    ...routerActions
  }
  let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsCreators
    }) : compose
  middleware.push(loadingBarMiddleware())
  enhancers.push(applyMiddleware(...middleware))
  let enhancer = composeEnhancers(...enhancers)
  return createStore(rootReducers, initState, enhancer)
}

export default {configureStore, history}
