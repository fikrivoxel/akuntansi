module.exports = {


  friendlyName: 'Find by nomor',


  description: 'Find Gudang by nomor',


  inputs: {
    nomor_gudang: {
      type: 'number',
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
    const data = await Gudang.findOne({
      nomor_gudang: inputs.nomor_gudang
    })
    .populate('kepala_gudang')
    .populate('barang')
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
      message: `Gudang with nomor ${inputs.nomor_gudang} not found`
    })
  }
};
