const files = require.context('.', false, /\.js$/)
const menus = {}

files.keys().forEach(function (fileName) {
  if (fileName === './index.js') return
  menus[fileName.replace(/(\.\/|\.js)/g, '')] = files(fileName).default
})

export default menus
