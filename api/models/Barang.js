/**
 * Barang.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nama_barang: {
      type: 'string', required: true
    },
    barcode: {
      type: 'string',
      unique: true,
      allowNull: true
    },
    kode_barang: {
      type: 'string', required: true, unique: true
    },
    satuan_terkecil: {
      type: 'string', required: true
    },
    jenis_barang_id: {
      model: 'jenisbarang' 
    },
    harga_jual: {
      collection: 'hargajual',
      via: 'barang_id'
    },
    status_barang_id: {
      model: 'statusbarang'
    },
    satuan: {
      collection: 'konversisatuan',
      via: 'barang_id'
    },
    gudang: {
      collection: 'gudang',
      via: 'barang_id',
      through: 'stokfisik'
    }
  },

  beforeCreate: async(valueToSet, proceed) => {
    const codeBarang = await sails.helpers.generateKodeBarang(valueToSet.jenis_barang_id)
    const statusBarangExist = await sails.helpers.checkChild(
      'StatusBarang', valueToSet.status_barang_id
    )

    if(statusBarangExist.status == 'bad'){
      return proceed(`status barang with id ${valueToSet.status_barang_id} not exist`)
    }

    if(codeBarang.status == 'failed'){
      return proceed(`jenis barang with id ${valueToSet.jenis_barang_id} not exist`)
    }

    valueToSet.kode_barang = codeBarang.code_barang
    return proceed()
  },

  beforeUpdate: async(valueToSet, proceed) => {
    const statusBarangExist = await sails.helpers.checkChild(
      'StatusBarang', valueToSet.status_barang_id
    )
    
    if(statusBarangExist.status == 'bad'){
      return proceed(`status barang with id ${valueToSet.status_barang_id} not exist`)
    }
    return proceed()
  }
};

