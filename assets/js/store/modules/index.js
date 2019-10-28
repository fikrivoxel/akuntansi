const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(fileName => {
  if (fileName === './index.js') return
  modules[fileName.replace(/(\.\/|\.js)/g, '')] = {
    ...files(fileName).default,
    namespaced: true
  }
})

export default modules
