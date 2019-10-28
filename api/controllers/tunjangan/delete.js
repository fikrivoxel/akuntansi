module.exports = {
  friendlyName: 'Delete Tunjangan',

  description: 'Delete Tunjangan.',

  inputs: {
    id: {
      description: 'ID Tunjangan',
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
    const destroy = await Tunjangan.destroyOne({
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
        message: `Tunjangan with id ${inputs.id} successfully deleted`,
        result: destroy
      })
    }
    return exits.notFound({
      status: 'failed',
      message: `Tunjangan with id ${inputs.id} not found`
    })
  }
};
