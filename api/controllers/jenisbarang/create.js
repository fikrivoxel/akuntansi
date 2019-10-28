module.exports = {
  friendlyName: 'Create Jenis Barang',

  description: 'Create jenis barang.',

  inputs: {
    jenis_barang: {
      description: 'Nama jenis barang',
      type: 'string',
      required: true
    },
    kode_jenis: {
      description: 'Kode jenis barang. Example: RAW0001',
      type: 'string',
      unique: true,
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
    const exist = await JenisBarang.findOrCreate({
      jenis_barang: inputs.jenis_barang
    }, {
      jenis_barang: inputs.jenis_barang,
      kode_jenis: inputs.kode_jenis
    })
    .intercept('E_UNIQUE', () => {
      return exits.exist({
        status: 'failed',
        message: `Jenis barang with kode jenis ${inputs.kode_jenis} already exist`
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
          message: `Jenis barang ${inputs.jenis_barang} successfully created`,
          result: data
        }) 
      }
      else{
        return exits.exist({
          status: 'failed',
          message: `Jenis barang ${inputs.jenis_barang} already exist`
        })
      }
    })
  }
};
