module.exports = {
  friendlyName: 'Delete Status Karyawan',

  description: 'Delete StatusKaryawan.',

  inputs: {
    nama_status: {
      description: 'Nama Status Karyawan. Example: active',
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
    const destroy = await StatusKaryawan.destroyOne({
      nama_status: inputs.nama_status
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(destroy){
      return exits.success({
        status: 'success',
        message: `Status Karyawan ${inputs.nama_status} successfully deleted`,
        result: destroy
      })
    }
    return exits.notFound({
      status: 'failed',
      message: `Status Karyawan ${inputs.nama_status} not found`
    })
  }
};
