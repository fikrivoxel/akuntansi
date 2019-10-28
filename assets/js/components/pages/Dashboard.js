import React, {PureComponent, Fragment} from 'react'
import PageHeader from '@/js/components/partials/common/PageHeader'

class Dashboard extends PureComponent {
  render() {
    return (
      <Fragment>
        <PageHeader page={{substitle: 'Dashboard', title: 'Home'}} />
        <div className='row'>
          <div className='col-12'>

          </div>
        </div>
      </Fragment>
    )
  }
}

export default Dashboard
