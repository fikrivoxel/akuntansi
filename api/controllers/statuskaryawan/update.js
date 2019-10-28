module.exports = {
  friendlyName: 'Update Status Karyawan',

  description: 'Update StatusKaryawan.',

  inputs: {
    id: {
      type: 'number',
      required: true
    },
    nama_status: {
      description: 'Nama Status Karyawan',
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
    const isExist = await StatusKaryawan.findOne({
      nama_status: inputs.nama_status
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(isExist){
      return exits.exist({
        status: 'failed',
        message: `Status Karyawan ${inputs.nama_status} already exist`
      })
    }

    const update = await StatusKaryawan.updateOne({
      id: inputs.id
    })
    .set({
      nama_status: inputs.nama_status
    })
    .intercept('E_UNIQUE', () => {
      return exits.exist({
        status: 'failed',
        message: `Status Karyawan ${inputs.nama_status} already exist`
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
        message: `Status Karyawan with id ${inputs.id} successfullly updated`,
        result: update
      })
    }

    return exits.notFound({
      status: 'failed',
      message: `Status Karyawan with id ${inputs.id} not found`
    })
  }
};
