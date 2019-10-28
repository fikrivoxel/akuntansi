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
        const removeTunjangan = await Tunjangan.removeFromCollection(inputs.tunjangan_id, 'karyawans', inputs.karyawan_id)
        .intercept((err) => {
            return exits.badRequest({
                status: 'failed',
                message: 'Error while remove tunjangan to karyawan'
            })
        })

        const update = await Karyawan.findOne({
            id: inputs.karyawan_id
        })
        .populate('tunjangans')
        .intercept((err) => {
            return exits.success({
                status: 'success',
                message: `Successfullly remove tunjangan from karyawan id ${inputs.karyawan_id}. But failed to retrieve callback data`
            })
        })

        return exits.success({
            status: 'success',
            message: `Successfullly remove tunjangan from karyawan id ${inputs.karyawan_id}`,
            result: update
        })
    }
  };
  