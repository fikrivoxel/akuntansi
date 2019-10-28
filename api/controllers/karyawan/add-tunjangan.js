module.exports = {
    friendlyName: 'Update Karyawan',
  
    description: 'Update Karyawan.',
  
    inputs: {
      karyawan_id: {
        type: 'number',
        required: true
      },
      tunjangan_id: {
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
        id: inputs.karyawan_id
      })
      .intercept((err) => {
        return exits.serverError({
          status: 'failed',
          message: err.message
        })
      })
  
      if(isExist){
        const tunjanganExist = await sails.helpers.checkChild('Tunjangan', inputs.tunjangan_id)
        if(tunjanganExist.status == 'bad'){
            return exits.serverError({
                status: 'failed',
                message: `tunjangan with id ${inputs.tunjangan_id} not exist`
            })
        }
          
        const addTunjangan = await Karyawan.addToCollection(inputs.karyawan_id, 'tunjangans', inputs.tunjangan_id)
        .intercept((err) => {
            return exits.badRequest({
                status: 'failed',
                message: 'Error while add tunjangan to karyawan'
            })
        })

        const update = await Karyawan.findOne({
            id: inputs.karyawan_id
        })
        .populate('tunjangans')
        .intercept((err) => {
            return exits.success({
                status: 'success',
                message: `Successfullly add tunjangan to karyawan id ${inputs.karyawan_id}. But failed to retrieve callback data`
            })
        })

        return exits.success({
            status: 'success',
            message: `Successfullly add tunjangan to karyawan id ${inputs.karyawan_id}`,
            result: update
        })
      }
  
      return exits.notFound({
        status: 'failed',
        message: `Karyawan with id ${inputs.karyawan_id} not found`
      })
    }
  };
  