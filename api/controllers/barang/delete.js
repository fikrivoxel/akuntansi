module.exports = {
  friendlyName: 'Delete Barang',

  description: 'Delete Barang.',

  inputs: {
    kode_barang: {
      description: 'kode_barang',
      type: 'string',
      unique: true
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
    const destroy = await Barang.destroyOne({
      kode_barang: inputs.kode_barang
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(destroy){
      return exits.success({
        status: 'success',
        message: `Barang with code ${inputs.kode_barang} successfully deleted`,
        result: destroy
      })
    }
    return exits.notFound({
      status: 'failed',
      message: `Barang with code ${inputs.kode_barang} not found`
    })
  }
};
