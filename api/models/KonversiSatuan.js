/**
 * KonversiSatuan.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    barang_id: {
      model: 'barang'
    },
    satuan_lain: {
      type: 'string'
    },
    satuan_terkecil: {
      type: 'string'
    },
    konversi: {
      type: 'number'
    }
  },

};

