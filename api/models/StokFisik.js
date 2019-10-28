/**
 * StokFisik.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    barang_id: {
      model: 'barang'
    },
    gudang_id: {
      model: 'gudang'
    },
    stok: {
      type: 'number',
      defaultsTo: 0
    }
  },

  beforeCreate: async(valueToSet, proceed) => {
    const barangExist = await sails.helpers.checkChild(
      'Barang', valueToSet.barang_id
    )

    if(barangExist.status == 'bad'){
      return proceed(`barang with id ${valueToSet.barang_id} not exist`)
    }

    const gudangExist = await sails.helpers.checkChild(
      'Gudang', valueToSet.gudang_id
    )

    if(gudangExist.status == 'bad'){
      return proceed(`gudang with id ${valueToSet.gudang_id} not exist`)
    }

    return proceed()
  },

  beforeUpdate: async(valueToSet, proceed) => {
    const barangExist = await sails.helpers.checkChild(
      'Barang', valueToSet.barang_id
    )

    if(barangExist.status == 'bad'){
      return proceed(`barang with id ${valueToSet.barang_id} not exist`)
    }

    const gudangExist = await sails.helpers.checkChild(
      'Gudang', valueToSet.gudang_id
    )

    if(gudangExist.status == 'bad'){
      return proceed(`gudang with id ${valueToSet.gudang_id} not exist`)
    }

    return proceed()
  },  
};

