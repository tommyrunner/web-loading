'use strict'
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/web-loading.cjs.min.js')
} else {
  module.exports = require('./dist/web-loading.cjs.js')
}
