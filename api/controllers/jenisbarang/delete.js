module.exports = {
  friendlyName: 'Delete Jenis Barang',

  description: 'Delete jenisbarang.',

  inputs: {
    kode_jenis: {
      description: 'Kode jenis barang. Example: RAW0001',
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
    const destroy = await JenisBarang.destroyOne({
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
        message: `Jenis barang with kode jenis ${inputs.kode_jenis} successfully deleted`,
        result: destroy
      })
    }
    return exits.notFound({
      status: 'failed',
      message: `Jenis barang with kode jenis ${inputs.kode_jenis} not found`
    })
  }
};
