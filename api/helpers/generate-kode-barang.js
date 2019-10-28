const pad = require('pad-number')
module.exports = {
  friendlyName: 'Generate kode barang',

  description: 'Helper for check Jenis barang by id and generate kode barang',

  inputs: {
    jenis_barang_id: {
      type: 'string',
      description: 'ID dari jenis barang',
      required: true
    }
  },

  exits: {
    success: {
      description: 'All done.',
    }
  },

  fn: async function (inputs, exits) {
    const jenis_barang = await JenisBarang.findOne({id: inputs.jenis_barang_id})
    .intercept((err) => {
      exits.success({status: 'bad'})
    })

    if(!_.isUndefined(jenis_barang)){
      kode_jenis_barang = jenis_barang.kode_jenis.replace(/[0-9]/g, '')
      const barang = await Barang.find({
        where: {
          kode_barang: {
            contains: kode_jenis_barang
          }
        },
        select: ['kode_barang'],
        limit: 1,
        sort: 'kode_barang DESC'
      })
      .intercept((err) => {
        exits.success({status: 'bad'})
      })

      let code = 0;
      if(barang.length <= 0){
        code = 1
        code = pad(code, 4)
      }
      else{
        code = barang[0].kode_barang.split('-')
        code = code[1]
        code = Number.parseInt(code)
        code += 1
        code = pad(code, 4)
      }
      const kodeBarang = `${kode_jenis_barang}-${code}`

      return exits.success({status: 'ok', code_barang: kodeBarang})
    }
    return exits.success({status: 'failed', message: `jenis barang with id ${inputs.jenis_barang_id} not exist`})
  }
};

