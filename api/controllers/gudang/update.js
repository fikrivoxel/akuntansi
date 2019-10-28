module.exports = {
  friendlyName: 'Update Jenis Barang',

  description: 'Update Gudang.',

  inputs: {
    id: {
      type: 'number',
      required: true
    },
    nama_gudang: {
      description: 'Nama Gudang',
      type: 'string',
      required: true
    },
    nomor_gudang: {
      description: 'Nomor Gudang. Example: 0001',
      type: 'number',
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
    const isExist = await Gudang.findOne({
      id: inputs.id
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(isExist){
      if(isExist.kepala_gudang != inputs.kepala_gudang){
        const karyawanExist = await sails.helpers.checkChild('Karyawan', inputs.kepala_gudang)
        if(karyawanExist.status == 'bad'){
          return exits.serverError({
            status: 'failed',
            message: `karyawan with id ${inputs.kepala_gudang} not exist`
          })
        }
      }

      if(isExist.nama_gudang != inputs.nama_gudang && isExist.nomor_gudang != inputs.nomor_gudang){
        const find = await Gudang.find({
          nama_gudang: inputs.nama_gudang,
          nomor_gudang: inputs.nomor_gudang
        })
        .intercept((err) => {
          return exits.serverError({
            status: 'failed',
            message: err.message
          })
        })

        if(find.length > 0){
          return exits.exist({
            status: 'failed',
            message: `Gudang ${inputs.nama_gudang} with number ${inputs.nomor_gudang} already exist`
          })
        }
      }

      const update = await Gudang.updateOne({
        id: inputs.id
      })
      .set({
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
  
      if(update){
        return exits.success({
          status: 'success',
          message: `gudang with id ${inputs.id} successfullly updated`,
          result: update
        })
      }
    }
    return exits.notFound({
      status: 'failed',
      message: `gudang with id ${inputs.id} not found`
    })
  }
};
