import React, {PureComponent} from 'react'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import Routers from '@/js/routers'

class App extends PureComponent {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <Routers />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
