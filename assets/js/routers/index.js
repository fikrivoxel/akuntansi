import React, {PureComponent} from 'react'
import {Switch, Route} from 'react-router-dom'
import routes from '@/js/routers/routes'
import Layout from '@/js/components/layouts'

class Routers extends PureComponent {
  get routesMap() {
    return routes.map((route, idx) => {
      return (
        <Route {...route} key={idx}/>
      )
    })
  }
  get layoutIs() {
    return 'Default'
  }
  render() {
    return (
      <Layout is={this.layoutIs}>
        <Switch>
          {this.routesMap}
        </Switch>
      </Layout>
    )
  }
}

export default Routers
