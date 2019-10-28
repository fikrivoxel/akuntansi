module.exports = {


    friendlyName: 'Find by id',
  
  
    description: 'Find Gudang by id',
  
  
    inputs: {
      id: {
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
      const data = await Gudang.findOne({
        id: inputs.id
      })
      .populate('kepala_gudang')
      .populate('barang')
      .intercept((err) => {
        return exits.serverError({
          status: 'failed',
          message: err.message
        })
      })
  
      if(data){
        return exits.success({
          status: 'success',
          result: data
        })
      }
      return exits.notFound({
        status: 'failed',
        message: `Gudang with id ${inputs.id} not found`
      })
    }
  };
  