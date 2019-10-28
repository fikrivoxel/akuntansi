import React, {createRef, PureComponent} from 'react'
import {Link} from 'react-router-dom'
import AnimateHeight from 'react-animate-height'

class Profile extends PureComponent {
  state = {
    isOpen: false
  }
  el = createRef()
  constructor(props) {
    super(props)
    this.toggleOpen = this.toggleOpen.bind(this)
    this.closeProfile = this.closeProfile.bind(this)
  }
  componentDidMount() {
    document.addEventListener('click', this.closeProfile)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.closeProfile)
  }
  get open() {
    return this.state.isOpen ? {
      height: 'auto'
    } : {
      height: 0
    }
  }
  toggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  closeOpen() {
    this.setState({
      isOpen: false
    })
  }
  closeProfile(e) {
    let target = e.target
    if (this.el.current.contains(target)) return
    this.closeOpen()
  }
  render() {
    return (
      <div className='header-profile' ref={this.el}>
        <button type='button' className='header-profile-btn' onClick={this.toggleOpen}>
          <img src='/images/0.jpg' alt='avatar' className='header-profile-img'/>
          <span className='header-profile-name'>Admin</span>
        </button>
        <AnimateHeight duration={500} height={this.open.height} className='header-profile-dropdown' contentClassName='header-profile-content'>
          <Link to='/' className='dropdown-item'>
            <i className='fa fa-cogs fa-fw' />
            Setting
          </Link>
          <div className="dropdown-divider" />
          <Link to='/' className='dropdown-item'>
            <i className='fa fa-sign-out fa-fw' />
            Logout
          </Link>
        </AnimateHeight>
      </div>
    )
  }
}

export default Profile
