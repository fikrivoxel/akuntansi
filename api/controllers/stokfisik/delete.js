module.exports = {
  friendlyName: 'Delete Stok Fisik',

  description: 'Delete Stok Fisik.',

  inputs: {
    id: {
      type: 'number',
      required: true
    },
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
    const destroy = await StokFisik.destroyOne({
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
        message: `Stok Fisik ${inputs.id} successfully deleted`,
        result: destroy
      })
    }
    return exits.notFound({
      status: 'failed',
      message: `Stok Fisik ${inputs.id} not found`
    })
  }
};
