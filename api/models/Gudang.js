/**
 * Gudang.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nama_gudang: {
      type: 'string',
      required: true
    },
    nomor_gudang: {
      type: 'string',
      required: true
    },
    alamat: {
      type: 'string',
      required: true
    },
    kota: {
      type: 'string',
      allowNull: true
    },
    kepala_gudang: {
      model: 'karyawan',
      unique: true
    },
    barang: {
      collection: 'barang',
      via: 'gudang_id',
      through: 'stokfisik'
    }
  },

  beforeCreate: async(valueToSet, proceed) => {
    const karyawanExist = await sails.helpers.checkChild(
      'Karyawan', valueToSet.kepala_gudang
    )

    if(karyawanExist.status == 'bad'){
      return proceed(`karyawan with id ${valueToSet.kepala_gudang} not exist`)
    }

    return proceed()
  }
};

