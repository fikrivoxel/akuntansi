import _ from 'lodash'
export default function (opts, err = new Error()) {
  if (!_.isError(err)) err = new Error()
  if (opts.response) {
    let {data} = opts.response
    opts = {
      ...opts,
      name: 'Error',
      message: data.message
    }
  } else {
    opts = {
      ...opts,
      name: 'Error',
      message: err.message
    }
  }
  err = {
    ...err,
    ...opts
  }
  return err
}
