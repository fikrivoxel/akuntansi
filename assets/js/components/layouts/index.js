import React, {PureComponent, Fragment} from 'react'
import LoadingBar from 'react-redux-loading-bar'
import DefaultLayout from '@/js/components/layouts/Default'

class Layout extends PureComponent {
  layouts = {
    DefaultLayout
  }
  render() {
    let Layout = this.layouts[`${this.props.is}Layout`]
    return (
      <Fragment>
        <LoadingBar style={{ backgroundColor: '#007bff', height: '5px' }}/>
        <Layout>
          {this.props.children}
        </Layout>
      </Fragment>
    )
  }
}

export default Layout
