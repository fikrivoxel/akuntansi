/**
 * Jabatan.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nama_jabatan: {
      type: 'string',
      required: true
    },
    karyawan: {
      collection: 'karyawan',
      via: 'jabatan_id'
    }
  },

};

