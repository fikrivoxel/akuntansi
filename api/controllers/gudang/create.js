module.exports = {
  friendlyName: 'Create Gudang',

  description: 'Create Gudang.',

  inputs: {
    nama_gudang: {
      description: 'Nama Gudang',
      type: 'string',
      required: true
    },
    nomor_gudang: {
      description: 'Nomor Gudang. Example: 0001',
      type: 'string',
      required: true
    },
    alamat: {
      type: 'string',
      required: true
    },
    kota: {
      type: 'string',
      allowNull: true
    },
    kepala_gudang: {
      description: 'ID kepala gudang (karyawan id)',
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
    const exist = await Gudang.findOrCreate({
      nama_gudang: inputs.nama_gudang,
      nomor_gudang: inputs.nomor_gudang
    }, {
      nama_gudang: inputs.nama_gudang,
      nomor_gudang: inputs.nomor_gudang,
      alamat: inputs.alamat,
      kota: inputs.kota,
      kepala_gudang: inputs.kepala_gudang
    })
    .intercept('E_UNIQUE', () => {
      return exits.exist({
        status: 'failed',
        message: `gudang with kepala gudang id ${inputs.kepala_gudang} already exist`
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
          message: `Gudang ${inputs.nama_gudang} successfully created`,
          result: data
        }) 
      }
      else{
        return exits.exist({
          status: 'failed',
          message: `Gudang ${inputs.nama_gudang} with number ${inputs.nomor_gudang} already exist`
        })
      }
    })
  }
};
