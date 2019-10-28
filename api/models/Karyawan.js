/**
 * Karyawan.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nama: {
      type: 'string',
      required: true
    },
    gaji: {
      type: 'number',
      columnType: 'double',
      required: true
    },
    gudang: {
      collection: 'gudang',
      via: 'kepala_gudang'
    },
    jabatan_id: {
      model: 'jabatan'
    },
    status_karyawan_id: {
      model: 'statuskaryawan'
    },
    tunjangans: {
      collection: 'tunjangan',
      via: 'karyawans'
    },
    absensi: {
      collection: 'absensi',
      via: 'karyawan_id'
    },
    user: {
      model: 'user',
      unique: true
    }
  },

  customToJSON: function() {
    return _.omit(this, ['user.password'])
  },

  beforeCreate: async(valueToSet, proceed) => {
    const jabatanExist = await sails.helpers.checkChild(
      'Jabatan', valueToSet.jabatan_id
    )

    if(jabatanExist.status == 'bad'){
      return proceed(`jabatan with id ${valueToSet.jabatan_id} not exist`)
    }

    const statusKaryawanExist = await sails.helpers.checkChild(
      'StatusKaryawan', valueToSet.status_karyawan_id
    )

    if(statusKaryawanExist.status == 'bad'){
      return proceed(`status karyawan with id ${valueToSet.jabatan_id} not exist`)
    }

    return proceed()
  }
};

