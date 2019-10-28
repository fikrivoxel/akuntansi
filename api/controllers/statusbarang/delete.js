module.exports = {
  friendlyName: 'Delete Status Barang',

  description: 'Delete StatusBarang.',

  inputs: {
    nama_status: {
      description: 'Nama status barang. Example: active',
      type: 'string',
      unique: true,
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
    const destroy = await StatusBarang.destroyOne({
      nama_status: inputs.nama_status
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
        message: `Status Barang ${inputs.nama_status} successfully deleted`,
        result: destroy
      })
    }
    return exits.notFound({
      status: 'failed',
      message: `Status Barang ${inputs.nama_status} not found`
    })
  }
};
