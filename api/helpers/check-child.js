const sails = require('sails')
module.exports = {
  friendlyName: 'Check child',


  description: '',


  inputs: {
    model: {
      type: 'string',
      required: true
    },
    value: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'All done',
    }
  },


  fn: async function (inputs, exits) {
    const model = require(`../models/${inputs.model}`)
    const modelId = model.identity
    const Model = sails.models[modelId]
    const exist = await Model.findOne({
      id: inputs.value
    })
    .intercept((err) => {
      exits.success({status: 'bad'})
    })

    if(exist){
      return exits.success({status: 'ok'})
    }
    return exits.success({status: 'bad'})
  }
};

