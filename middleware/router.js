const { Route } = require('../server/lib/decorator')
const { resolve } = require('path')

export const router = app => {
  const apiPath = resolve(__dirname, '../server/router')
  const router = new Route(app, apiPath)

  router.init()
}
