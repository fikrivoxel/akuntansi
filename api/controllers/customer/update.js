module.exports = {
  friendlyName: 'Update Customer',

  description: 'Update Customer.',

  inputs: {
    id: {
      type: 'number',
      required: true
    },
    nama_customer: {
      description: 'Nama Customer',
      type: 'string',
      required: true
    },
    alamat: {
      description: 'alamat Customer',
      type: 'string',
      required: true
    },
    kota: {
      type: 'string',
      allowNull: true
    },
    nama_pic_1: {
      type: 'string',
      required: true
    },
    nama_pic_2: {
      type: 'string',
      required: true
    },
    telpon_pic_1: {
      type: 'string',
      required: true
    },
    telpon_pic_2: {
      type: 'string',
      required: true
    },
    telpon_kantor:{
      type: 'string',
      required: true
    },
    max_piutang: {
      type: 'number',
      required: true
    },
    kode_salesman: {
      type: 'string',
      required: true
    }
  },

  exits: {
    success: {
      responseType: 'ok'
    },
    notFound: {
      responseType: 'notFoundResponse'
    },
    badRequest: {
      responseType: 'badRequest'
    },
    forbidden: {
      responseType: 'forbidden'
    },
    exist: {
      responseType: 'existResponse'
    },
    serverError: {
      responseType: 'serverError'
    }
  },

  fn: async function (inputs, exits) {
    const isExist = await Customer.findOne({
      id: inputs.id
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(isExist){
      if(isExist.nama_customer != inputs.nama_customer){
        const existed = await Customer.findOne({
          nama_customer: inputs.nama_customer
        })

        if(existed){
          return exits.exist({
            status: 'failed',
            message: `Customer ${inputs.nama_customer} already exist`
          })
        }
      }
    }

    const update = await Customer.updateOne({
      id: inputs.id
    })
    .set({
      nama_customer: inputs.nama_customer,
      alamat: inputs.alamat,
      kota: inputs.kota,
      nama_pic_1: inputs.nama_pic_1,
      nama_pic_2: inputs.nama_pic_2,
      telpon_pic_1: inputs.telpon_pic_1,
      telpon_pic_2: inputs.telpon_pic_2,
      telpon_kantor: inputs.telpon_kantor,
      max_piutang: inputs.max_piutang,
      kode_salesman: inputs.kode_salesman
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(update){
      return exits.success({
        status: 'success',
        message: `Customer with id ${inputs.id} successfullly updated`,
        result: update
      })
    }

    return exits.notFound({
      status: 'failed',
      message: `Customer with id ${inputs.id} not found`
    })
  }
};
