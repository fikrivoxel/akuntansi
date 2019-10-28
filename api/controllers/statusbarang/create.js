module.exports = {
  friendlyName: 'Create status barang',

  description: 'Create status barang.',

  inputs: {
    nama_status: {
      description: 'Nama status barang',
      type: 'string',
      required: true,
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
    const exist = await StatusBarang.findOrCreate({
      nama_status: inputs.nama_status
    }, {
      nama_status: inputs.nama_status
    })
    .intercept('E_UNIQUE', () => {
      return exits.exist({
        status: 'failed',
        message: `status barang ${inputs.nama_status} already exist`
      })
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })
    .exec(async(err, data, wasCreated) => {
      if(err){
        return exits.serverError({
          status: 'failed',
          message: err.message
        })
      }

      if(wasCreated){
        return exits.success({
          status: 'success',
          message: `status barang ${inputs.nama_status} successfully created`,
          result: data
        }) 
      }
      else{
        return exits.exist({
          status: 'failed',
          message: `status barang ${inputs.nama_status} already exist`
        })
      }
    })
  }
};
