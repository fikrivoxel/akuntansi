module.exports = {
  friendlyName: 'Create jenis jual',

  description: 'Create jenis jual.',

  inputs: {
    jenis_jual: {
      description: 'Nama jenis jual. Example: Grosir, retail, distributor',
      type: 'string',
      required: true
    },
    kode_jenis: {
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
    const exist = await JenisJual.findOrCreate({
      kode_jenis: inputs.kode_jenis
    }, {
      jenis_jual: inputs.jenis_jual,
      kode_jenis: inputs.kode_jenis
    })
    .intercept('E_UNIQUE', () => {
      return exits.exist({
        status: 'failed',
        message: `jenis jual with code ${inputs.kode_jenis} already exist`
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
          message: `jenis jual ${inputs.jenis_jual} successfully created`,
          result: data
        }) 
      }
      else{
        return exits.exist({
          status: 'failed',
          message: `jenis jual ${inputs.jenis_jual} already exist`
        })
      }
    })
  }
};
