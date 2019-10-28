/**
 * StatusBarang.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nama_status: {
      type: 'string'
    },
    barang: {
      collection: 'barang',
      via: 'status_barang_id'
    }
  },

};

