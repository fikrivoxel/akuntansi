module.exports = {
  friendlyName: 'Create barang',

  description: 'Create barang.',

  inputs: {
    nama_barang: {
      description: 'Nama barang',
      type: 'string',
      required: true
    },
    barcode: {
      description: 'Barcode barang. Opsional',
      type: 'string',
      allowNull: true
    },
    kode_barang: {
      description: 'Kode barang diawali dengan jenis barang. Example: RAW-0001',
      type: 'string',
      defaultsTo: 'code'
    },
    satuan_terkecil: {
      description: 'Satuan terkecil barang. Example: pcs, g, cm',
      type: 'string',
      required: true
    },
    jenis_barang_id: {
      description: 'ID dari jenis barang',
      type: 'number',
      required: true
    },
    status_barang_id: {
      description: 'ID dari status barang',
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
    const exist = await Barang.findOrCreate({
      nama_barang: inputs.nama_barang
    }, {
      nama_barang: inputs.nama_barang,
      barcode: inputs.barcode,
      kode_barang: inputs.kode_barang,
      satuan_terkecil: inputs.satuan_terkecil,
      jenis_barang_id: inputs.jenis_barang_id,
      status_barang_id: inputs.status_barang_id
    })
    .intercept('E_UNIQUE', () => {
      return exits.exist({
        status: 'failed',
        message: `barang with kode ${inputs.kode_barang} already exist`
      })
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
          message: `barang ${inputs.nama_barang} successfully created`,
          result: data
        }) 
      }
      else{
        return exits.exist({
          status: 'failed',
          message: `barang ${inputs.nama_barang} already exist`
        })
      }
    })
  }
};
