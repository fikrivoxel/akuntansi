module.exports = {
  friendlyName: 'Create stok fisik',

  description: 'Create stok fisik.',

  inputs: {
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
    const exist = await StokFisik.create({
      stok: inputs.stok,
      barang_id: inputs.barang_id,
      gudang_id: inputs.gudang_id
    })
    .fetch()
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(exist){
      return exits.success({
        status: 'success',
        message: `stok fisik successfully created`,
        result: exist
      }) 
    }

    return exits.badRequest({
      status: 'failed',
      message: `failed to create stok`
    })
  }
};
