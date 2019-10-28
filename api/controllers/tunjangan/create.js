module.exports = {
  friendlyName: 'Create Tunjangan',

  description: 'Create Tunjangan.',

  inputs: {
    nama_tunjangan: {
      description: 'nama tunjangan',
      type: 'string',
      required: true
    },
    jumlah_tunjangan: {
      description: 'besaran tunjangan yang diterima',
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
    const create = await Tunjangan.findOrCreate({
      nama_tunjangan: inputs.nama_tunjangan
    },{
      nama_tunjangan: inputs.nama_tunjangan,
      jumlah_tunjangan: inputs.jumlah_tunjangan
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
          message: `Tunjangan ${inputs.nama_tunjangan} successfully created`,
          result: data
        }) 
      }
      else{
        return exits.exist({
          status: 'failed',
          message: `Tunjangan ${inputs.nama_tunjangan} already exist`
        })
      }
    })
  }
};
