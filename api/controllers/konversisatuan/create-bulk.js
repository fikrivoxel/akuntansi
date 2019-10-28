module.exports = {
  friendlyName: 'Create Bulk Konversi Satuan',

  description: 'Create bulk konversi satuan.',

  inputs: {
    satuan: {
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
    const barangExist = await sails.helpers.checkChild('Barang', inputs.satuan[0].barang_id)
    if(barangExist.status == 'bad'){
      return exits.badRequest({
        status: 'failed',
        message: `barang with id ${inputs.satuan[0].barang_id} not exist`
      })
    }
    const create = await KonversiSatuan.createEach(inputs.satuan).fetch()
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
      message: `failed to insert satuan in one action`
    })
  }
};
