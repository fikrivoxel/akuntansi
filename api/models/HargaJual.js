/**
 * HargaJual.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    barang_id: {
      model: 'barang'
    },
    qty_min: {
      type: 'number',
      required: true
    },
    harga: {
      type: 'number',
      required: true
    },
    jenis_jual: {
      model: 'jenisjual'
    }
  },

};

