import React, {PureComponent} from 'react'
import Header from '@/js/components/partials/common/Header'
import Sidebar from '@/js/components/partials/common/Sidebar'

class Default extends PureComponent {
  state = {
    isActive: false
  }
  constructor(props) {
    super(props)
    this.setOpen = this.setOpen.bind(this)
  }
  get open() {
    return this.state.isActive ? {
      classes: 'active'
    } : {
      classes: ''
    }
  }
  setOpen(bol) {
    if (bol === this.state.isActive) return
    this.setState({
      isActive: bol
    })
  }
  render() {
    return (
      <div className={`root-content ${this.open.classes}`}>
        <Sidebar onClose={() => this.setOpen(false)} />
        <div className='main-content'>
          <Header onOpen={() => this.setOpen(true)} />
          <div className='main-container container-fluid'>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Default
