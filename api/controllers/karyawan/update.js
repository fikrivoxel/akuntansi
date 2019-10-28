module.exports = {
  friendlyName: 'Update Karyawan',

  description: 'Update Karyawan.',

  inputs: {
    id: {
      type: 'number',
      required: true
    },
    nama: {
      description: 'Nama Karyawan',
      type: 'string',
      required: true
    },
    gaji: {
      description: 'Gaji karyawan',
      type: 'number',
      required: true
    },
    jabatan_id: {
      description: 'ID dari jabatan',
      type: 'number',
      required: true
    },
    status_karyawan_id: {
      description: 'ID dari status karyawan',
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
    const isExist = await Karyawan.findOne({
      id: inputs.id
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(isExist){
      if(isExist.jabatan_id != inputs.jabatan_id){
        const jabatanExist = await sails.helpers.checkChild('Jabatan', inputs.jabatan_id)
        if(jabatanExist.status == 'bad'){
          return exits.serverError({
            status: 'failed',
            message: `jabatan with id ${inputs.jabatan_id} not exist`
          })
        }
      }

      if(isExist.status_karyawan_id != inputs.status_karyawan_id){
        const jabatanExist = await sails.helpers.checkChild('StatusKaryawan', inputs.status_karyawan_id)
        if(jabatanExist.status == 'bad'){
          return exits.serverError({
            status: 'failed',
            message: `status karyawan with id ${inputs.status_karyawan_id} not exist`
          })
        }
      }

      if(isExist.nama != inputs.nama){
        const exist = await Karyawan.findOne({
          nama: inputs.nama
        })
        if(exist){
          return exits.exist({
            status: 'failed',
            message: `Karyawan ${inputs.nama} already exist`
          })
        }
      }

      const update = await Karyawan.updateOne({
        id: inputs.id
      })
      .set({
        nama: inputs.nama,
        gaji: inputs.gaji,
        jabatan_id: inputs.jabatan_id,
        status_karyawan_id: inputs.status_karyawan_id
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
          message: `Karyawan with id ${inputs.id} successfullly updated`,
          result: update
        })
      }
    }

    return exits.notFound({
      status: 'failed',
      message: `Karyawan with id ${inputs.id} not found`
    })
  }
};
