require('babel-core/register')()
require('babel-polyfill')

const Movie = require()

const { initSchema, connect } = require('./server/dbs/init')

;(async () => {
  initSchema()
  await connect()

  require('./server/tasks/api')
})()


