import React, {PureComponent} from 'react'

class ToggleButton extends PureComponent {
  render() {
    return (
      <div className='header-toggle'>
        <button type='button' className='header-toggle-btn' onClick={this.props.onOpen}>
          <i className='fa fa-bars fa-fw' />
        </button>
      </div>
    )
  }
}

export default ToggleButton
