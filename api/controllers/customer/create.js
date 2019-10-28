module.exports = {
  friendlyName: 'Create Customer',

  description: 'Create Customer.',

  inputs: {
    nama_customer: {
      description: 'Nama Customer',
      type: 'string',
      required: true
    },
    alamat: {
      description: 'alamat Customer',
      type: 'string',
      required: true
    },
    kota: {
      type: 'string',
      allowNull: true
    },
    nama_pic_1: {
      type: 'string',
      required: true
    },
    nama_pic_2: {
      type: 'string',
      required: true
    },
    telpon_pic_1: {
      type: 'string',
      required: true
    },
    telpon_pic_2: {
      type: 'string',
      required: true
    },
    telpon_kantor:{
      type: 'string',
      required: true
    },
    max_piutang: {
      type: 'number',
      required: true
    },
    kode_salesman: {
      type: 'string',
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
    const exist = await Customer.findOrCreate({
      nama_customer: inputs.nama_customer
    }, {
      nama_customer: inputs.nama_customer,
      alamat: inputs.alamat,
      kota: inputs.kota,
      nama_pic_1: inputs.nama_pic_1,
      nama_pic_2: inputs.nama_pic_2,
      telpon_pic_1: inputs.telpon_pic_1,
      telpon_pic_2: inputs.telpon_pic_2,
      telpon_kantor: inputs.telpon_kantor,
      max_piutang: inputs.max_piutang,
      kode_salesman: inputs.kode_salesman
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
          message: `Customer ${inputs.nama_customer} successfully created`,
          result: data
        }) 
      }
      else{
        return exits.exist({
          status: 'failed',
          message: `Customer ${inputs.nama_customer} already exist`
        })
      }
    })
  }
};
