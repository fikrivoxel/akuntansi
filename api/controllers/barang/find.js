module.exports = {
    friendlyName: 'Find',
  
    description: 'Find barang',
  
    inputs: {
      criteria: {
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
      const total = await Barang.count({
        or: [
            {
                nama_barang: {
                    contains: inputs.criteria
                }
            },
            {
                barcode: {
                    contains: inputs.criteria
                }
            },
            {
                kode_barang: {
                    contains: inputs.criteria
                }
            }
        ]
      })
  
      const data = await Barang.find({
        or: [
            {
                nama_barang: {
                    contains: inputs.criteria
                }
            },
            {
                barcode: {
                    contains: inputs.criteria
                }
            },
            {
                kode_barang: {
                    contains: inputs.criteria
                }
            }
        ]
      })
      .skip((inputs.page - 1)*inputs.perpage)
      .limit(inputs.perpage)
      .populate('jenis_barang_id')
      .populate('status_barang_id')
      .populate('satuan')
      .populate('harga_jual')
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
        message: `barang with criteria ${inputs.criteria} not found`
      })
    }
  };
  