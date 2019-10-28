module.exports = {
  friendlyName: 'Update Stok Fisik',

  description: 'Update StokFisik.',

  inputs: {
    id: {
      type: 'number',
      required: true
    },
    stok: {
      description: 'Jumlah stok fisik',
      type: 'number',
      required: true
    },
    barang_id: {
      description: 'ID barang',
      type: 'number',
      required: true
    },
    gudang_id: {
      description: 'ID Gudang',
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
    const update = await StokFisik.updateOne({
      id: inputs.id
    })
    .set({
      stok: inputs.stok,
      barang_id: inputs.barang_id,
      gudang_id: inputs.gudang_id
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
        message: `Stok Fisik with id ${inputs.id} successfullly updated`,
        result: update
      })
    }

    return exits.notFound({
      status: 'failed',
      message: `Stok Fisik with id ${inputs.id} not found`
    })
  }
};
