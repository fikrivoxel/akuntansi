module.exports = {
  friendlyName: 'Delete Konversi Satuan',

  description: 'Delete KonversiSatuan.',

  inputs: {
    id: {
      description: 'ID konversi satuan',
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
    const destroy = await KonversiSatuan.destroyOne({
      id: inputs.id
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
        message: `Konversi Satuan with id ${inputs.id} successfully deleted`,
        result: destroy
      })
    }
    return exits.notFound({
      status: 'failed',
      message: `Konversi Satuan with id ${inputs.id} not found`
    })
  }
};
