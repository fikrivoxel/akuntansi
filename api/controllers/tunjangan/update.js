module.exports = {
  friendlyName: 'Update Tunjangan',

  description: 'Update Tunjangan.',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'ID Tunjangan'
    },
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
    const isExist = await Tunjangan.findOne({
      id: inputs.id
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(isExist){
      if(isExist.nama_tunjangan != inputs.nama_tunjangan){
        const check = await Tunjangan.findOne({
          nama_tunjangan: inputs.nama_tunjangan
        })

        if(check){
          return exits.exist({
            status: 'failed',
            message: `Tunjangan ${inputs.nama_tunjangan} already exist`
          })
        }
      }
      
      const update = await Tunjangan.updateOne({
        id: inputs.id
      })
      .set({
        nama_tunjangan: inputs.nama_tunjangan,
        jumlah_tunjangan: inputs.jumlah_tunjangan
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
          message: `Tunjangan with id ${inputs.id} successfullly updated`,
          result: update
        })
      }
    }
    return exits.notFound({
      status: 'failed',
      message: `Tunjangan with id ${inputs.id} not found`
    })
  }
};
