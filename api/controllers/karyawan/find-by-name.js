module.exports = {
  friendlyName: 'Find by name',

  description: 'Find Karyawan by name',

  inputs: {
    nama: {
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
    const total = await Karyawan.count({
      nama: {
        contains: inputs.nama
      }
    })

    const data = await Karyawan.find({
      nama: {
        contains: inputs.nama
      }
    })
    .skip((inputs.page - 1)*inputs.perpage)
    .limit(inputs.perpage)
    .populate('jabatan_id')
    .populate('status_karyawan_id')
    .populate('tunjangans')
    .populate('absensi')
    .populate('user')
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
        result
      })
    }
    return exits.notFound({
      status: 'failed',
      message: `Karyawan with name ${inputs.nama} not found`
    })
  }


};
