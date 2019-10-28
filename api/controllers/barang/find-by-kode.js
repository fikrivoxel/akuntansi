module.exports = {
  friendlyName: 'Find by kode',

  description: 'Find Barang by kode',

  inputs: {
    kode_barang: {
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
    const data = await Barang.findOne({
      kode_barang: inputs.kode_barang
    })
    .populate('jenis_barang_id')
    .populate('status_barang_id')
    .populate('satuan')
    .populate('harga_jual')
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(data){
      return exits.success({
        status: 'success',
        result: data
      })
    }
    return exits.notFound({
      status: 'failed',
      message: `Barang with kode ${inputs.kode_barang} not found`
    })
  }
};
