/**
 * JenisJual.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    jenis_jual: {
      type: 'string',
      required: true
    },
    kode_jenis: {
      type: 'string',
      required: true,
      unique: true
    }
  },

};

