module.exports = {
  friendlyName: 'Find All konversi satuan',

  description: 'Find all konversi satuan',

  inputs: {
    page: {
      type: 'number',
      defaultsTo: 1
    },
    perpage: {
      type: 'number',
      defaultsTo: 50
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
    const total = await KonversiSatuan.count()
    .intercept((err) => {
      return exits.serverError({
        message: err.message
      })
    })
    
    const data = await KonversiSatuan
      .find()
      .skip((inputs.page - 1)*inputs.perpage)
      .limit(inputs.perpage)
      .populate('barang_id')
      .intercept((err) => {
        return exits.serverError({
          status: 'failed',
          message: err.message
        })
      })

    if(data.length > 0){
      let total_page, total_perpage, next_page, prev_page, current_page;

      total_page = Math.ceil(total/inputs.perpage)
      total_perpage = inputs.perpage
      current_page = inputs.page
      prev_page = current_page == 1 ? null : current_page - 1
      next_page = current_page == total_page ? null : current_page + 1

      const result = {
        data: data,
        pagination: {
          total_records: total,
          total_per_page: total_perpage,
          total_page: total_page,
          current_page: current_page,
          next_page: next_page,
          prev_page: prev_page
        }
      }
      return exits.success({
        status: 'success',
        result: result
      })
    }
    return exits.notFound({
      status: 'failed',
      message: 'No records found in konversi satuan'
    })
  }
};
