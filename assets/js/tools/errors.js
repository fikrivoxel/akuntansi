import _ from 'lodash'

export default function (opts, err = new Error()) {
  if (!_.isError(err)) err = new Error()
  let re = {}
  if (opts.response) {
    let {data} = opts.response
    re = {
      name: 'Error',
      message: data.message
    }
  } else {
    re = {
      name: 'Error',
      message: err.message
    }
  }
  _.extend(err, re)
  return err
}
