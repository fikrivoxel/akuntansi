import React, {PureComponent, createRef} from 'react'
import {Link} from 'react-router-dom'
import AnimateHeight from 'react-animate-height'

class Notification extends PureComponent {
  state = {
    isOpen: false
  }
  el = createRef()
  constructor(props) {
    super(props)
    this.toggleOpen = this.toggleOpen.bind(this)
    this.closeNotification = this.closeNotification.bind(this)
  }
  componentDidMount() {
    document.addEventListener('click', this.closeNotification)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.closeNotification)
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
  closeNotification(e) {
    let target = e.target
    if (this.el.current.contains(target)) return
    this.closeOpen()
  }
  render() {
    return (
      <div className='header-notification' ref={this.el}>
        <button type='button' className='header-notification-btn' onClick={this.toggleOpen}>
          <i className='fa fa-fw fa-bell'/>
          <span className='badge badge-pill badge-danger'>
            2
          </span>
        </button>
        <AnimateHeight duration={500} height={this.open.height} className='header-notification-content'>
          <Link to='/' className='header-notification-show'>
            View all Notification
          </Link>
        </AnimateHeight>
      </div>
    )
  }
}

export default Notification
