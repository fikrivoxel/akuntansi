module.exports = {
  friendlyName: 'Create jabatan',

  description: 'Create jabatan.',

  inputs: {
    nama_jabatan: {
      description: 'Nama jabatan',
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
    const exist = await Jabatan.findOrCreate({
      nama_jabatan: inputs.nama_jabatan
    }, {
      nama_jabatan: inputs.nama_jabatan
    })
    .intercept('E_UNIQUE', () => {
      return exits.exist({
        status: 'failed',
        message: `jabatan ${inputs.nama_jabatan} already exist`
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
          message: `jabatan ${inputs.nama_jabatan} successfully created`,
          result: data
        }) 
      }
      else{
        return exits.exist({
          status: 'failed',
          message: `jabatan ${inputs.nama_jabatan} already exist`
        })
      }
    })
  }
};
