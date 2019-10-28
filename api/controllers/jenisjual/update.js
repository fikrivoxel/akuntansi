module.exports = {
  friendlyName: 'Update Jenis Jual',

  description: 'Update JenisJual.',

  inputs: {
    kode_jenis: {
      type: 'string',
      required: true,
      unique: true,
    },
    kode_jenis_id: {
      type: 'string',
      required: true
    },
    jenis_jual: {
      description: 'Nama Jenis Jual',
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
    const isExist = await JenisJual.findOne({
      kode_jenis: inputs.kode_jenis_id
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(!_.isUndefined(isExist)){
      if(isExist.kode_jenis != inputs.kode_jenis){
        const isKodeJenisExist = await JenisJual.find({
          kode_jenis: inputs.kode_jenis
        })
        .intercept((err) => {
          return exits.serverError({
            status: 'failed',
            message: err.message
          })
        })

        if(isKodeJenisExist.length > 0){
          return exits.exist({
            status: 'failed',
            message: `Jenis Jual with code ${inputs.kode_jenis} already exist`
          })
        }
      }

      const update = await JenisJual.updateOne({
        kode_jenis: inputs.kode_jenis_id
      })
      .set({
        jenis_jual: inputs.jenis_jual,
        kode_jenis: inputs.kode_jenis
      })
      .intercept('E_UNIQUE', () => {
        return exits.exist({
          status: 'failed',
          message: `Jenis Jual with code ${inputs.kode_jenis} already exist`
        })
      })
      .intercept((err) => {
        return exits.serverError({
          status: 'failed',
          message: err.message
        })
      })
  
      if(update){
        return exits.success({
          status: 'success',
          message: `Jenis Jual with code ${inputs.kode_jenis_id} successfullly updated`,
          result: update
        })
      }
    }
    return exits.notFound({
      status: 'failed',
      message: `Jenis Jual with code ${inputs.kode_jenis_id} not found`
    })
  }
};
