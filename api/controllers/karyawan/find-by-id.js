module.exports = {
  friendlyName: 'Find by id',

  description: 'Find Karyawan by id',

  inputs: {
    id: {
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
    const data = await Karyawan.findOne({
      id: inputs.id
    })
    .populate('jabatan_id')
    .populate('status_karyawan_id')
    .populate('tunjangans')
    .populate('absensi')
    .populate('user')
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(data){
      return exits.success({
        status: 'success',
        result: data
      })
    }
    return exits.notFound({
      status: 'failed',
      message: `Karyawan with id ${inputs.id} not found`
    })
  }
};
