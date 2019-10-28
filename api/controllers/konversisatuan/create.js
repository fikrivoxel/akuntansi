module.exports = {
  friendlyName: 'Create Konversi Satuan',

  description: 'Create konversi satuan.',

  inputs: {
    barang_id: {
      description: 'ID barang',
      type: 'number',
      required: true
    },
    satuan_lain: {
      description: 'satuan lain barang. Example: Karton, Lusin',
      type: 'string',
      required: true
    },
    satuan_terkecil: {
      description: 'satuan terkecil barang. Example: pcs, g, cm',
      type: 'string',
      required: true
    },
    konversi: {
      description: 'konversi dari satuan lain ke satuan kecil. Example: 1 lusin = 12 pcs. konversi = 12',
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
    const barangExist = await sails.helpers.checkChild('Barang', inputs.barang_id)
    if(barangExist.status == 'bad'){
      return exits.badRequest({
        message: `barang with id ${inputs.barang_id} not exist`
      })
    }
    const create = await KonversiSatuan.findOrCreate({
      or: [
        {
          barang_id: inputs.barang_id
        },
        {
          satuan_lain: inputs.satuan_lain
        }
      ]
    },{
      barang_id: inputs.barang_id,
      satuan_lain: inputs.satuan_lain,
      satuan_terkecil: inputs.satuan_terkecil,
      konversi: inputs.konversi
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
          message: `konversi satuan ${inputs.satuan_lain} to ${inputs.satuan_terkecil} successfully created`,
          result: data
        }) 
      }
      else{
        return exits.exist({
          status: 'failed',
          message: `konversi satuan ${inputs.satuan_lain} to ${inputs.satuan_terkecil} already exist`
        })
      }
    })
  }
};
