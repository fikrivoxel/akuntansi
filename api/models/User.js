/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcryptjs')
module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },
    password: {
      type: 'string',
      required: true
    },
    karyawan: {
      collection: 'karyawan',
      via: 'user'
    }
  },

  beforeCreate: async(valueToSet, proceed) => {
    try{
      bcrypt.genSalt(10, (err, salt) => {
        if(err){
          return proceed(err)
        }
        bcrypt.hash(valueToSet.password, salt, (err, hash) => {
          if(err){
            return proceed(err)
          }
          valueToSet.password = hash
  
          return proceed()
        })
      })
    }
    catch(err){
      return proceed(err)
    }
  }
};

