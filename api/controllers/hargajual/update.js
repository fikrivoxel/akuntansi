module.exports = {
  friendlyName: 'Update Harga Jual',

  description: 'Update HargaJual.',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'ID Harga Jual'
    },
    barang_id: {
      description: 'ID barang',
      type: 'number',
      required: true
    },
    qty_min: {
      description: 'minimal quantity',
      type: 'number',
      required: true
    },
    harga: {
      description: 'harga per satuan',
      type: 'number',
      required: true
    },
    jenis_jual: {
      description: 'ID jenis jual',
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
    const isExist = await HargaJual.findOne({
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

      if(isExist.jenis_jual != inputs.jenis_jual){
        const jenisExist = await sails.helpers.checkChild('JenisJual', inputs.jenis_jual)
        if(jenisExist.status == 'bad'){
          return exits.badRequest({
            status: 'failed',
            message: `jenis jual with id ${inputs.jenis_jual} not exist`
          })
        }
      }

      const update = await HargaJual.updateOne({
        id: inputs.id
      })
      .set({
        barang_id: inputs.barang_id,
        qty_min: inputs.qty_min,
        harga: inputs.harga,
        jenis_jual: inputs.jenis_jual
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
          message: `Harga Jual with id ${inputs.id} successfullly updated`,
          result: update
        })
      }
    }
    return exits.notFound({
      status: 'failed',
      message: `Harga Jual with id ${inputs.id} not found`
    })
  }
};
