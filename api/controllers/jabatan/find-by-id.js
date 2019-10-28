module.exports = {


  friendlyName: 'Find by id',


  description: 'Find Jabatan by id',


  inputs: {
    id: {
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
    const data = await Jabatan.findOne({
      id: inputs.id
    })
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
      message: `Jabatan with id ${inputs.id} not found`
    })
  }
};
