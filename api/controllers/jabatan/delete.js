module.exports = {
  friendlyName: 'Delete jabatan',

  description: 'Delete Jabatan.',

  inputs: {
    nama_jabatan: {
      description: 'Nama jabatan. Example: active',
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
    const destroy = await Jabatan.destroyOne({
      nama_jabatan: inputs.nama_jabatan
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
        message: `jabatan ${inputs.nama_jabatan} successfully deleted`,
        result: destroy
      })
    }
    return exits.notFound({
      status: 'failed',
      message: `jabatan ${inputs.nama_jabatan} not found`
    })
  }
};
