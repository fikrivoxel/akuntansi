import React, {PureComponent} from 'react'
import _ from 'lodash'
import WithSubsMenu from '@/js/components/partials/common/sidebar/menu/WithSubsMenu'
import WithoutSubsMenu from '@/js/components/partials/common/sidebar/menu/WithoutSubsMenu'

class Menu extends PureComponent {
  state = {
    activeIdx: -1
  }

  get menusMap() {
    return this.props.menus.map((menu, idx) => {
      return (
        <li className='sidebar-menu-item' key={idx}>
          {
            _.has(menu, 'subsmenu') ?
            <WithSubsMenu
              menu={menu}
              idx={
                {active: this.state.activeIdx, key: idx}
              }
              handleToggle={() => this.handleClickMenuToggle(idx)}/> :
            <WithoutSubsMenu menu={menu}/>
          }
        </li>
      )
    })
  }

  handleClickMenuToggle(idx) {
    if (idx === this.state.activeIdx) idx = -1
    this.setState({
      activeIdx: idx
    })
  }

  render() {
    return (
      <ul className='sidebar-menu'>
        {this.menusMap}
      </ul>
    )
  }
}

export default Menu
