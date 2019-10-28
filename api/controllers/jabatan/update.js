module.exports = {
  friendlyName: 'Update Jabatan',

  description: 'Update Jabatan.',

  inputs: {
    id: {
      type: 'number',
      required: true
    },
    nama_jabatan: {
      description: 'Nama Jabatan',
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
    const isExist = await Jabatan.findOne({
      nama_jabatan: inputs.nama_jabatan
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
        message: `Jabatan ${inputs.nama_jabatan} already exist`
      })
    }

    const update = await Jabatan.updateOne({
      id: inputs.id
    })
    .set({
      nama_jabatan: inputs.nama_jabatan
    })
    .intercept('E_UNIQUE', () => {
      return exits.exist({
        status: 'failed',
        message: `Jabatan ${inputs.nama_jabatan} already exist`
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
        message: `Jabatan with id ${inputs.id} successfullly updated`,
        result: update
      })
    }

    return exits.notFound({
      status: 'failed',
      message: `Jabatan with id ${inputs.id} not found`
    })
  }
};
