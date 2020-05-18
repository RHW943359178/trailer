const Koa = require('koa')
const consola = require('consola')
const mongoose = require('mongoose')
const { Nuxt, Builder } = require('nuxt')
const router = require('./router/movie')
const { connect, initSchema } = require('./dbs/init')
const R = require('ramda')
const MIDDLEWARE = ['router']

const useMiddleware = app => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `../middleware/${name}`)
    )
  )(MIDDLEWARE)
}

// ;(async () => {
//   await connect()

//   initSchema()

//   // await initAdmin()

//   // require('./tasks/movie')
//   // require('./tasks/api')

//   const app = new Koa()
//   await useMiddleware(app)

// })()





// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

// async function start () {
async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // app
  //   .use(router.routes())
  //   .use(router.allowedMethods())

  await connect()

  initSchema()

  // await initAdmin()

  // require('./tasks/movie')
  // require('./tasks/api')

  const app = new Koa()
  await useMiddleware(app)

  app.use((ctx) => {
      ctx.status = 200
      ctx.respond = false // Bypass Koa's built-in response handling
      ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
      nuxt.render(ctx.req, ctx.res)
    })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
