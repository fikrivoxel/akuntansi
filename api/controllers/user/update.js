const bcrypt = require('bcryptjs')
module.exports = {
  friendlyName: 'Update User',

  description: 'Update User.',

  inputs: {
    id: {
      type: 'number',
      required: true
    },
    email: {
      description: 'Nama User',
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      allowNull: true
    }
  },

  exits: {
    success: {
      responseType: 'ok'
    },
    notFound: {
      responseType: 'notFoundResponse'
    },
    badRequest: {
      responseType: 'badRequest'
    },
    forbidden: {
      responseType: 'forbidden'
    },
    exist: {
      responseType: 'existResponse'
    },
    serverError: {
      responseType: 'serverError'
    }
  },

  fn: async function (inputs, exits) {
    const isExist = await User.findOne({
      id: inputs.id
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })

    if(isExist){
      if(isExist.email != inputs.email){
        const emailExist = await User.findOne({
          email: inputs.email
        })
        .intercept((err) => {
          return exits.serverError({
            status: 'failed',
            message: err.message
          })
        })

        if(emailExist){
          return exits.exist({
            status: 'failed',
            message: `User with email ${inputs.email} already exist`
          })
        }
      }

      if(!_.isEmpty(inputs.password)){
        try{
          const salt = bcrypt.genSaltSync(10)
          const hash = bcrypt.hashSync(inputs.password, salt)
          if(hash){
            inputs.password = hash
          }
        }
        catch(err){
          return exits.serverError({
            status: 'failed',
            message: err.message
          })
        }
      }

      const update = await User.updateOne({
        id: inputs.id
      })
      .set({
        email: inputs.email,
        password: !_.isEmpty(inputs.password) ? inputs.password : isExist.password
      })
      .intercept('E_UNIQUE', () => {
        return exits.exist({
          status: 'failed',
          message: `User with email ${inputs.email} already exist`
        })
      })
      .intercept((err) => {
        return exits.serverError({
          status: 'failed',
          message: err.message
        })
      })
  
      if(update){
        return exits.success({
          status: 'success',
          message: `User with id ${inputs.id} successfullly updated`,
          result: update
        })
      }
    }

    return exits.notFound({
      status: 'failed',
      message: `User with id ${inputs.id} not found`
    })
  }
};
