import React, {PureComponent, Fragment} from 'react'
import AnimateHeight from 'react-animate-height'
import SubsMenu from '@/js/components/partials/common/sidebar/menu/SubsMenu'

class WithSubsMenu extends PureComponent {
  get active() {
    let {idx: {active, key}} = this.props
    return active === key ? {
      animation: 'auto',
      classes: 'open'
    } : {
      animation: 0,
      classes: ''
    }
  }
  render() {
    let {menu, handleToggle} = this.props
    return (
      <Fragment>
        <button type='button' className={`sidebar-menu-link sidebar-menu-caret ${this.active.classes}`} onClick={handleToggle}>
          <i className={`fa fa-fw ${menu.meta.icon}`}/>
          {menu.meta.name}
        </button>
        <AnimateHeight duration={500} height={this.active.animation}>
          <SubsMenu menu={menu} />
        </AnimateHeight>
      </Fragment>
    )
  }
}

export default WithSubsMenu
