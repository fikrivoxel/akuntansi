import React, {PureComponent} from 'react'
import useForm from 'react-hook-form'
import {compose} from 'redux'
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'shards-react'

const withUseForm = (Component) => (props) => {
  return <Component {...props} form={useForm()} />
}

class Add extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async handleSubmit(data) {
    try {
      await this.props.postAdd(data)
      await this.props.getAll(1, 50)
    } catch (err) {
      console.log(err)
    }
    this.props.toggle()
  }
  render() {
    let {form, toggle, open} = this.props
    return (
      <Modal open={open} toggle={toggle} className='modal-xl'>
        <form action="#" onSubmit={form.handleSubmit(this.handleSubmit)}>
          <ModalHeader>
            Tambah Jenis Barang
          </ModalHeader>
          <ModalBody>
            <div className='form-group'>
              <label htmlFor="kode_jenis">
                Kode
              </label>
              <input
                type="text"
                name="kode_jenis"
                className={`form-control ${form.errors.kode_jenis ? 'is-invalid' : ''}`}
                ref={form.register({required: true})}
                placeholder='Kode'
              />
            </div>
            <div className='form-group'>
              <label htmlFor="jenis_barang">
                Nama
              </label>
              <input
                type="text"
                name="jenis_barang"
                className={`form-control ${form.errors.jenis_barang ? 'is-invalid' : ''}`}
                ref={form.register({required: true})}
                placeholder='Nama'
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button type='submit' className='btn btn-primary'>
              Tambah
            </button>
            <button type='button' className='btn btn-danger' onClick={this.props.toggle}>
              Close
            </button>
          </ModalFooter>
        </form>
      </Modal>
    )
  }
}

export default compose(
  withUseForm
)(Add)
