module.exports = {
  friendlyName: 'Create user',

  description: 'Create user.',

  inputs: {
    email: {
      description: 'email',
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },
    password: {
      description: 'password',
      type: 'string',
      required: true
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
    const exist = await User.findOrCreate({
      email: inputs.email
    }, {
      email: inputs.email,
      password: inputs.password
    })
    .intercept('E_UNIQUE', () => {
      return exits.exist({
        status: 'failed',
        message: `user with ${inputs.email} already exist`
      })
    })
    .intercept((err) => {
      return exits.serverError({
        status: 'failed',
        message: err.message
      })
    })
    .exec(async(err, data, wasCreated) => {
      if(err){
        return exits.serverError({
          status: 'failed',
          message: err.message
        })
      }

      if(wasCreated){
        return exits.success({
          status: 'success',
          message: `user ${inputs.email} successfully created`,
          result: data
        }) 
      }
      else{
        return exits.exist({
          status: 'failed',
          message: `user with ${inputs.email} already exist`
        })
      }
    })
  }
};
