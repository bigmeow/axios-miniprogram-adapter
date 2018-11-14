const path = require( 'path' )

function resolve (...args) {
  return path.resolve( __dirname, '../', ...args)
}

module.exports = {
  resolve
}
