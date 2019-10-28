module.exports = {
  friendlyName: 'Update Jenis Barang',

  description: 'Update jenisbarang.',

  inputs: {
    jenis_barang: {
      description: 'Nama jenis barang',
      type: 'string',
      unique: true,
      required: true
    },
    kode_jenis: {
      description: 'Kode jenis barang. Example: RAW0001',
      type: 'string',
      unique: true,
      required: true
    },
    kode_jenis_id: {
      description: 'Kode jenis barang. Example: RAW0001',
      type: 'string',
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
    const isExist = await JenisBarang.findOne({
      kode_jenis: inputs.kode_jenis_id
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(isExist){
      if(isExist.jenis_barang != inputs.jenis_barang){
        const isBarangExist = await JenisBarang.findOne({
          jenis_barang: inputs.jenis_barang
        })

        if(isBarangExist){
          return exits.exist({
            status: 'failed',
            message: `Jenis barang ${inputs.jenis_barang} already exist`
          })
        }
      }
      const update = await JenisBarang.updateOne({
        kode_jenis: inputs.kode_jenis_id
      })
      .set({
        jenis_barang: inputs.jenis_barang,
        kode_jenis: inputs.kode_jenis
      })
      .intercept('E_UNIQUE', () => {
        return exits.exist({
          status: 'failed',
          message: `Jenis barang with kode jenis ${inputs.kode_jenis} already exist`
        })
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
          message: `Jenis barang with kode jenis ${inputs.kode_jenis_id} successfullly updated`,
          result: update
        })
      }
    }
    return exits.notFound({
      status: 'failed',
      message: `Jenis barang with kode jenis ${inputs.kode_jenis_id} not found`
    })
  }
};
