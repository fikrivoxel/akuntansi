import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'
import Menu from '@/js/components/partials/common/sidebar/Menu'
import {MENUS} from '@/js/config'

class Sidebar extends PureComponent {
  menus = MENUS.test
  state = {
    activeIdx: -1
  }
  render() {
    return (
      <nav className='sidebar'>
        <div className='sidebar-title'>
          <Link to='/' className='sidebar-title-link'>
            Akuntansi
          </Link>
          <button type='button' className='sidebar-toggle' onClick={this.props.onClose}>
            <i className='fa fa-fw fa-chevron-left' />
          </button>
        </div>
        <Menu menus={this.menus} />
      </nav>
    )
  }
}

export default Sidebar
