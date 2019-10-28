import React, {PureComponent} from 'react'
import _ from 'lodash'

class Pagination extends PureComponent {
  onEachSide = 2
  get totalPage() {
    let {rowCount, rowsPerPage} = this.props
    return Pagination.round(rowCount / rowsPerPage)
  }
  get isOnFirstPage() {
    let {currentPage} = this.props
    return currentPage === 1
  }
  get isOnLastPage() {
    let {currentPage} = this.props
    return currentPage === this.totalPage
  }
  get notEnoughPages() {
    return this.totalPage < (this.onEachSide * 2) + 4
  }
  get windowSize() {
    return this.onEachSide * 2 + 1;
  }
  get windowStart() {
    let {currentPage} = this.props
    let re = currentPage - this.onEachSide
    if (currentPage <= this.onEachSide) re = 1
    else if (currentPage >= (this.totalPage - this.onEachSide))
      re = this.totalPage - this.onEachSide * 2
    return re
  }
  get firstTemplate() {
    let propsTag = this.isOnFirstPage ? {
      props: {},
      tag: 'span'
    } : {
      props: {
        type: 'button',
        onClick: () => {
          this.props.onChangePage(1)
        }
      },
      tag: 'button'
    }
    return (
      <li className={`page-item ${this.isOnFirstPage ? 'disabled' : ''}`}>
        <propsTag.tag {...propsTag.props} className='page-link'>
          <i className="fa fa-angle-double-left fa-fw" />
        </propsTag.tag>
      </li>
    )
  }
  get prevTemplate() {
    let {currentPage} = this.props
    let propsTag = this.isOnFirstPage ? {
      props: {},
      tag: 'span'
    } : {
      props: {
        type: 'button',
        onClick: () => {
          this.props.onChangePage(currentPage - 1)
        }
      },
      tag: 'button'
    }
    return (
      <li className={`page-item ${this.isOnFirstPage ? 'disabled' : ''}`}>
        <propsTag.tag {...propsTag.props} className='page-link'>
          <i className="fa fa-angle-left fa-fw" />
        </propsTag.tag>
      </li>
    )
  }
  get notEnoughPagesTemplate() {
    let loop = [...Array(this.totalPage)]
    return loop.map((_v, index) => {
      let idx = index + 1
      let propsTag = this.isCurrentPage(idx) ? {
        props: {},
        tag: 'span'
      } : {
        props: {
          type: 'button',
          onClick: () => {
            this.props.onChangePage(idx)
          }
        },
        tag: 'button'
      }
      return (
        <li className={`page-item ${this.isCurrentPage(idx) ? 'disabled' : ''}`} key={idx}>
          <propsTag.tag {...propsTag.props} className='page-link'>
            {idx}
          </propsTag.tag>
        </li>
      )
    })
  }
  get windowSizeTemplate() {
    let loop = [...Array(this.windowSize)]
    return loop.map((_v, index) => {
      let idx = index + 1
      let propsTag = this.isCurrentPage(this.windowStart + idx - 1) ? {
        props: {},
        tag: 'span'
      } : {
        props: {
          type: 'button',
          onClick: () => {
            this.props.onChangePage(this.windowStart + idx - 1)
          }
        },
        tag: 'button'
      }
      return (
        <li className={`page-item ${this.isCurrentPage(this.windowStart + idx - 1) ? 'disabled' : ''}`} key={idx}>
          <propsTag.tag {...propsTag.props} className='page-link'>
            {this.windowStart + idx - 1}
          </propsTag.tag>
        </li>
      )
    })
  }
  get nextTemplate() {
    let {currentPage} = this.props
    let propsTag = this.isOnLastPage ? {
      props: {},
      tag: 'span'
    } : {
      props: {
        type: 'button',
        onClick: () => {
          this.props.onChangePage(currentPage + 1)
        }
      },
      tag: 'button'
    }
    return (
      <li className={`page-item ${this.isOnLastPage ? 'disabled' : ''}`}>
        <propsTag.tag {...propsTag.props} className='page-link'>
          <i className="fa fa-angle-right fa-fw" />
        </propsTag.tag>
      </li>
    )
  }
  get lastTemplate() {
    let propsTag = this.isOnLastPage ? {
      props: {},
      tag: 'span'
    } : {
      props: {
        type: 'button',
        onClick: () => {
          this.props.onChangePage(this.totalPage)
        }
      },
      tag: 'button'
    }
    return (
      <li className={`page-item ${this.isOnLastPage ? 'disabled' : ''}`}>
        <propsTag.tag {...propsTag.props} className='page-link'>
          <i className="fa fa-angle-double-right fa-fw" />
        </propsTag.tag>
      </li>
    )
  }
  isCurrentPage(page) {
    let {currentPage} = this.props
    return currentPage === page
  }
  render() {
    return (
      <ul className='pagination justify-content-center mb-0'>
        {this.firstTemplate}
        {this.prevTemplate}
        {this.notEnoughPages ? this.notEnoughPagesTemplate : this.windowSizeTemplate}
        {this.nextTemplate}
        {this.lastTemplate}
      </ul>
    )
  }
}

Pagination.round = function (x) {
  let y = + x + .9
  return y - (y % 1)
}

export default Pagination
