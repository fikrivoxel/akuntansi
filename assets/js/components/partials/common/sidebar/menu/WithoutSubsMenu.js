import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'

class WithoutSubsMenu extends PureComponent {
  render() {
    let {menu} = this.props
    return (
      <Link to={menu.to} className='sidebar-menu-link'>
        <i className={`fa fa-fw ${menu.meta.icon}`}/>
        {menu.meta.name}
      </Link>
    )
  }
}

export default WithoutSubsMenu
