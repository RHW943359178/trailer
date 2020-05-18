const Router = require('koa-router')
const { 
  controller, 
  get, 
  post, 
  put 
} = require('../lib/decorator.js')
const { 
  getAllMovies,
  getMovieDetail,
  getRelativeMovies 
} = require('../service/movie.js')

const router = new Router()

@controller('api/v0/movies')
export class movieController {
  @get('/')
  // @login
  @admin(['developer'])
  // @log
  async getMovies (ctx, next) {
    const { type, year } = ctx.query
    const movies = await getAllMovies(type, year)

    ctx.body = {
      movies
    }
  }

  
  @get('/:id')
  async getMovieDetail (ctx, next) {
    const id = ctx.params.id
    const movie = await getMovieDetail(id)
    const relativeMovies = await getRelativeMovies(movie)
  
    ctx.body = {
      data: {
        movie,
        relativeMovies
      },
      success: true
    }
  }
}

module.exports = router