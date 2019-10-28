module.exports = {
  friendlyName: 'Update Barang',

  description: 'Update barang.',

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
      required: true
    },
    kode_barang_id: {
      description: 'Kode barang diawali dengan jenis barang. Example: RAW-0001',
      type: 'string',
      required: true
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
    const isExist = await Barang.findOne({
      kode_barang: inputs.kode_barang_id
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(isExist){
      if(isExist.jenis_barang_id != inputs.jenis_barang_id){
        const codebarang = await sails.helpers.generateKodeBarang(inputs.jenis_barang_id)
        if(codebarang.status == 'ok'){
          inputs.kode_barang = codebarang.code_barang
        }
        return exits.serverError({
          status: 'failed',
          message: 'failed to generate new kode barang'
        })
      }
      if(isExist.nama_barang != inputs.nama_barang){
        const exist = await Barang.findOne({
          nama_barang: inputs.nama_barang
        })
        if(exist){
          return exits.exist({
            status: 'failed',
            message: `barang ${inputs.nama_barang} already exist`
          })
        }
      }

      const update = await Barang.updateOne({
        kode_barang: inputs.kode_barang_id
      })
      .set({
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
          message: `Barang with barcode ${inputs.barcode} already exist`
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
          message: `Status Barang with kode ${inputs.kode_barang} successfullly updated`,
          result: update
        })
      }
    }

    return exits.notFound({
      status: 'failed',
      message: `Barang with kode ${inputs.kode_barang} not found`
    })
  }
};
