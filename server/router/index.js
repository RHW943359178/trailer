const Router = require('koa-router')
const mongoose = require('mongoose')
// const Movie = mongoose.model('Movie')

const router = new Router()

//  获取全部电影列表
router.get('/movie/all', async (ctx, next) => {
  const Movie = mongoose.model('Movie')
  const movies = await Movie.find({}).sort({
    'meta.createdAt': -1
  })

  ctx.body = {
    movies
  }
})

//  根据id获取电影详情
router.get('/movie/detail/:id', async (ctx, next) => {
  const Movie = mongoose.model('Movie')
  const id = ctx.params.id
  const movie = await Movie.findOne({_id: id})

  ctx.body = {
    movie
  }
})

module.exports = router