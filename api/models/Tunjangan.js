/**
 * Tunjangan.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    karyawans: {
      collection: 'karyawan',
      via: 'tunjangans'
    },
    nama_tunjangan: {
      type: 'string',
      required: true
    },
    jumlah_tunjangan: {
      type: 'number',
      columnType: 'double',
      required: true
    }
  },

};

