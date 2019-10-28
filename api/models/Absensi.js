/**
 * Absensi.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    karyawan_id: {
      model: 'karyawan'
    },
    jenis_absensi: {
      type: 'string',
      isIn: ['masuk', 'izin', 'mangkir'],
      defaultsTo: 'mangkir'
    }
  },

};

