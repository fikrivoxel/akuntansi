import React, {PureComponent} from 'react'

class PageHeader extends PureComponent {
  render() {
    let {page} = this.props
    return (
      <div className='row'>
        <div className='col-12'>
          <div className='main-header'>
            <span className='main-substitle'>{page.substitle}</span>
            <h3 className='main-title'>{page.title}</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default PageHeader
