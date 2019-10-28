import React from 'react'
import {render} from 'react-dom'
import Root from '@/js/components/Root'
import {configureStore, history} from '@/js/store/config'

render(
  <Root store={configureStore} history={history} />,
  document.getElementById('root')
)
