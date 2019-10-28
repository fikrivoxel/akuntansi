import React, {PureComponent} from 'react'
import Notification from '@/js/components/partials/common/header/Notification'
import Profile from '@/js/components/partials/common/header/Profile'
import ToggleButton from '@/js/components/partials/common/header/ToggleButton'

class Header extends PureComponent {
  render() {
    return (
      <header className='header'>
        <div className='header-menu'>
          <Notification />
          <Profile/>
        </div>
        <ToggleButton onOpen={this.props.onOpen}/>
      </header>
    )
  }
}

export default Header
