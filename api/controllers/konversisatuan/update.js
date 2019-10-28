module.exports = {
  friendlyName: 'Update Konversi Satuan',

  description: 'Update KonversiSatuan.',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'ID konversi satuan'
    },
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
    const isExist = await KonversiSatuan.findOne({
      id: inputs.id
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(isExist){
      if(isExist.barang_id != inputs.barang_id){
        const exist = await sails.helpers.checkChild('Barang', inputs.barang_id)
        if(exist.status == 'bad'){
          return exits.badRequest({
            status: 'failed',
            message: `barang with id ${inputs.barang_id} not exist`
          })
        }
      }

      const update = await KonversiSatuan.updateOne({
        id: inputs.id
      })
      .set({
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

      if(update){
        return exits.success({
          status: 'success',
          message: `Konversi Satuan with id ${inputs.id} successfullly updated`,
          result: update
        })
      }
    }
    return exits.notFound({
      status: 'failed',
      message: `Konversi Satuan with id ${inputs.id} not found`
    })
  }
};
