module.exports = {
  friendlyName: 'Delete Jenis Jual',

  description: 'Delete JenisJual.',

  inputs: {
    kode_jenis: {
      description: 'Kode Jenis Jual',
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
    const destroy = await JenisJual.destroyOne({
      kode_jenis: inputs.kode_jenis
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
        message: `Jenis jual ${inputs.kode_jenis} successfully deleted`,
        result: destroy
      })
    }
    return exits.notFound({
      status: 'failed',
      message: `Jenis jual ${inputs.kode_jenis} not found`
    })
  }
};
