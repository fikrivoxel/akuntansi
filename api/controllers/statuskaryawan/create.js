module.exports = {
  friendlyName: 'Create status karyawan',

  description: 'Create status karyawan.',

  inputs: {
    nama_status: {
      description: 'Nama status karyawan',
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
    const exist = await StatusKaryawan.findOrCreate({
      nama_status: inputs.nama_status
    }, {
      nama_status: inputs.nama_status
    })
    .intercept('E_UNIQUE', () => {
      return exits.exist({
        status: 'failed',
        message: `status karyawan ${inputs.nama_status} already exist`
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
          message: `status karyawan ${inputs.nama_status} successfully created`,
          result: data
        }) 
      }
      else{
        return exits.exist({
          status: 'failed',
          message: `status karyawan ${inputs.nama_status} already exist`
        })
      }
    })
  }
};
