/**
 * Customer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nama_customer: {
      type: 'string',
      required: true,
      maxLength: 50
    },
    alamat: {
      type: 'string',
      required: true
    },
    kota: {
      type: 'string',
      allowNull: true,
      maxLength: 75
    },
    nama_pic_1: {
      type: 'string',
      required: true,
      maxLength: 50
    },
    nama_pic_2: {
      type: 'string',
      required: true,
      maxLength: 50
    },
    telpon_pic_1: {
      type: 'string',
      required: true,
      maxLength: 13
    },
    telpon_pic_2: {
      type: 'string',
      required: true,
      maxLength: 13
    },
    telpon_kantor: {
      type: 'string',
      required: true,
      maxLength: 13
    },
    max_piutang: {
      type: 'number',
      columnType: 'double'
    },
    kode_salesman: {
      type: 'string',
      required: true
    }
  },

};

