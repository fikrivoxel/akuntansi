module.exports = {
  friendlyName: 'Create Karyawan',

  description: 'Create Karyawan.',

  inputs: {
    nama: {
      description: 'Nama Karyawan',
      type: 'string',
      required: true
    },
    gaji: {
      description: 'Gaji karyawan',
      type: 'number',
      required: true
    },
    jabatan_id: {
      description: 'ID dari jabatan',
      type: 'number',
      required: true
    },
    status_karyawan_id: {
      description: 'ID dari status karyawan',
      type: 'number',
      required: true
    },
    user: {
      type: 'number',
      required: true,
      unique: true
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
    const exist = await Karyawan.findOrCreate({
      nama: inputs.nama
    }, {
      nama: inputs.nama,
      gaji: inputs.gaji,
      jabatan_id: inputs.jabatan_id,
      status_karyawan_id: inputs.status_karyawan_id,
      user: inputs.user
    })
    .intercept('E_NON_ERROR', (err) => {
      return exits.badRequest({
        status: 'failed',
        message: err.raw
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
          message: `Karyawan ${inputs.nama} successfully created`,
          result: data
        }) 
      }
      else{
        return exits.exist({
          status: 'failed',
          message: `Karyawan ${inputs.nama} already exist`
        })
      }
    })
  }
};
