module.exports = {
  friendlyName: 'Create Harga Jual',

  description: 'Create Harga Jual.',

  inputs: {
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
    const barangExist = await sails.helpers.checkChild('Barang', inputs.barang_id)
    const jenisExist = await sails.helpers.checkChild('JenisJual', inputs.jenis_jual)
    if(barangExist.status == 'bad'){
      return exits.badRequest({
        message: `barang with id ${inputs.barang_id} not exist`
      })
    }

    if(jenisExist.status == 'bad'){
      return exits.badRequest({
        message: `jenis jual with id ${inputs.jenis_jual} not exist`
      })
    }

    const create = await HargaJual.findOrCreate({
      or: [
        {
          barang_id: inputs.barang_id
        },
        {
          jenis_jual: inputs.jenis_jual
        }
      ]
    },{
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
          message: `Harga Jual successfully created`,
          result: data
        }) 
      }
      else{
        return exits.exist({
          status: 'failed',
          message: `Harga Jual already exist`
        })
      }
    })
  }
};
