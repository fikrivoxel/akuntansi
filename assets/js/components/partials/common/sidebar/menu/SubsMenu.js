import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'

class SubsMenu extends PureComponent {
  get subsMenuMap() {
    let {menu: {subsmenu}} = this.props
    return subsmenu.map((submenu, idx) => {
      return (
        <li className='sidebar-subsmenu-item' key={idx}>
          <Link to={submenu.to} className='sidebar-subsmenu-link'>
            <i className={`fa fa-fw ${submenu.meta.icon}`}/>
            {submenu.meta.name}
          </Link>
        </li>
      )
    })
  }
  render() {
    return (
      <ul className='sidebar-subsmenu'>
        {this.subsMenuMap}
      </ul>
    )
  }
}

export default SubsMenu
