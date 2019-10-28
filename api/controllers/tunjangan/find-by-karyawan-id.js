module.exports = {


  friendlyName: 'Find by karyawan id',


  description: 'Find Tunjangan by karyawan id',


  inputs: {
    karyawan_id: {
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
    let data = await Tunjangan.find()
    .populate('karyawans', {
      where: {
        id: inputs.karyawan_id
      }
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(data.length > 0){
      return exits.success({
        status: 'success',
        result: data
      })
    }
    return exits.notFound({
      status: 'failed',
      message: `Tunjangan with karyawan id ${inputs.karyawan_id} not found`
    })
  }
};
