import React, {PureComponent, Fragment} from 'react'
import {compose, bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import DataTable from 'react-data-table-component'
import PageHeader from '@/js/components/partials/common/PageHeader'
import AddModal from '@/js/components/partials/jenisbarang/modal/Add'
import {
  getAll as JenisBarangGetAll,
  postAdd as JenisBarangPostAdd
} from '@/js/store/actions/jenisBarangActions'
import Pagination from '@/js/components/partials/common/Pagination'

class JenisBarang extends PureComponent {
  state = {
    loading: true,
    addModal: false
  }
  columns = [
    {
      name: 'Kode',
      selector: 'kode_jenis'
    },
    {
      name: 'Nama',
      selector: 'jenis_barang'
    },
    {
      name: 'Action',
      cell: (data) => {
        return (
          <div className='btn-group btn-group-sm'>
            <button type='button' className='btn btn-info'>
              <i className='fa fa-edit fa-fw' />
            </button>
            <button type='button' className='btn btn-danger'>
              <i className='fa fa-trash fa-fw' />
            </button>
          </div>
        )
      }
    }
  ]
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handlePerRowsChange = this.handlePerRowsChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }
  async componentDidMount() {
    await this.getJenisBarang()
    this.setState({loading: false})
  }
  async getJenisBarang() {
    try {
      await this.props.jenisBarangDis.getAll(1, 10)
    } catch (err) {
      console.log(err)
    }
  }
  handleClick() {
    this.setState({
      addModal: true
    })
  }
  toggle() {
    this.setState({
      addModal: !this.state.addModal
    })
  }
  async handlePerRowsChange(perPage, page) {
    try {
      await this.props.jenisBarangDis.getAll(page, perPage)
    } catch (err) {
      console.log(err)
    }
  }
  async handlePageChange(page) {
    try {
      await this.props.jenisBarangDis.getAll(page, 10)
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    if (this.state.loading) return (
      <div/>
    )
    return (
      <Fragment>
        <PageHeader page={{substitle: 'Jenis Barang', title: 'List'}} />
        <div className='row'>
          <div className='col-12'>
            <div className='card card-small'>
              <div className='card-header'>
                Jenis Barang
                <button type='button' className='btn btn-sm btn-primary ml-auto' onClick={this.handleClick}>
                  <i className='fa fa-plus fa-fw' />
                </button>
              </div>
              <DataTable
                columns={this.columns}
                data={this.props.jenisBarang.list}
                noHeader
                pagination
                paginationServer
                paginationComponent={Pagination}
                paginationTotalRows={this.props.jenisBarang.pagination.total_records}
                onChangeRowsPerPage={this.handlePerRowsChange}
                onChangePage={this.handlePageChange}
              />
            </div>
          </div>
        </div>
        <AddModal
          open={this.state.addModal}
          toggle={this.toggle}
          postAdd={this.props.jenisBarangDis.postAdd}
          getAll={this.props.jenisBarangDis.getAll}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    jenisBarang: state.jenisBarangReducers
  }
}
const mapDispatchToProps = function (dispatch) {
  return {
    jenisBarangDis: bindActionCreators({
      getAll: JenisBarangGetAll,
      postAdd: JenisBarangPostAdd
    }, dispatch)
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(JenisBarang)
