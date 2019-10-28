module.exports = {
  friendlyName: 'Find by jenis jual',

  description: 'Find harga jual by jenis jual',

  inputs: {
    jenis_jual: {
      type: 'string',
      required: true
    },
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
    const datas = await HargaJual.find()
    .skip((inputs.page - 1)*inputs.perpage)
    .limit(inputs.perpage)
    .populate('jenis_jual')
    .intercept((err) => {
      return exits.serverError({
        message: err.message
      })
    })

    const regex = new RegExp(inputs.jenis_jual, 'ig')
    const data = _.filter(datas, (d) => {
      return d.jenis_jual.jenis_jual.match(regex)
    })

    if(data.length > 0){
      const total = data.length
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
      message: `harga jual with jenis jual ${inputs.jenis_jual} not found`
    })
  }


};
