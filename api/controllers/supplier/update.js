module.exports = {
  friendlyName: 'Update Supplier',

  description: 'Update Supplier.',

  inputs: {
    id: {
      type: 'number',
      required: true
    },
    nama_supplier: {
      description: 'Nama supplier',
      type: 'string',
      required: true
    },
    alamat: {
      description: 'alamat supplier',
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
    tempo_pembayaran: {
      type: 'ref',
      columnType: 'date',
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
    const isExist = await Supplier.findOne({
      id: inputs.id
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(isExist){
      if(isExist.nama_supplier != inputs.nama_supplier){
        const existed = await Supplier.findOne({
          nama_supplier: inputs.nama_supplier
        })

        if(existed){
          return exits.exist({
            status: 'failed',
            message: `Supplier ${inputs.nama_supplier} already exist`
          })
        }
      }
    }

    const update = await Supplier.updateOne({
      id: inputs.id
    })
    .set({
      nama_supplier: inputs.nama_supplier,
      alamat: inputs.alamat,
      kota: inputs.kota,
      nama_pic_1: inputs.nama_pic_1,
      nama_pic_2: inputs.nama_pic_2,
      telpon_pic_1: inputs.telpon_pic_1,
      telpon_pic_2: inputs.telpon_pic_2,
      telpon_kantor: inputs.telpon_kantor,
      tempo_pembayaran: inputs.tempo_pembayaran,
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
        message: `Supplier with id ${inputs.id} successfullly updated`,
        result: update
      })
    }

    return exits.notFound({
      status: 'failed',
      message: `Supplier with id ${inputs.id} not found`
    })
  }
};
