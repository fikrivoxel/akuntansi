module.exports = {
  friendlyName: 'Create Bulk Harga Jual',

  description: 'Create bulk Harga Jual.',

  inputs: {
    harga_jual: {
      type: 'json',
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
    const barangExist = await sails.helpers.checkChild('Barang', inputs.harga_jual[0].barang_id)
    const jenisExist = await sails.helpers.checkChild('JenisJual', inputs.harga_jual[0].jenis_jual)
    if(barangExist.status == 'bad'){
      return exits.badRequest({
        status: 'failed',
        message: `barang with id ${inputs.harga_jual[0].barang_id} not exist`
      })
    }

    if(jenisExist.status == 'bad'){
      return exits.badRequest({
        status: 'failed',
        message: `jenis jual with id ${inputs.harga_jual[0].jenis_jual} not exist`
      })
    }

    const create = await HargaJual.createEach(inputs.harga_jual).fetch()
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })
    
    if(create){
      return exits.success({
        status: 'success',
        message: `successfully created`,
        result: create
      })
    }
    return exits.badRequest({
      status: 'failed',
      message: `failed to insert harga jual in one action`
    })
  }
};
