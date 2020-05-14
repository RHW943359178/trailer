const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

//  http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10

async function fetchMovie (item) {
  // const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  const url = `https://api.douban.com/v2/movie/subject/${item.doubanId}?apikey=0df993c66c0c636e29ecbb5344252a4a`
  // const url = `http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10${item.doubanId}`
  const res = await rp(url)

  let body
  try {
    body = JSON.parse(res)
  } catch (err) {
    console.log(err)
  }

  return body
}

;(async () => {
  // let movies = [
  //   {
  //     doubanId: 30166972,
  //     title: '少年的你',
  //     rate: 8.3,
  //     poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2572166063.jpg'
  //   },
  //   {
  //     doubanId: 30292777,
  //     title: '阳光普照',
  //     rate: 8.4,
  //     poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2570235120.jpg'
  //   }
  // ]

  let movies = await Movie.find({
    $or: [
      { summary: { $exists: false } },
      { summary: null },
      { title: '' },
      { summary: '' },
    ]
  })

  for (let i = 0; i < [movies[0]].length; i++) {
    let movie = movies[i]
    let movieData = await fetchMovie(movie)

    if (movieData) {
      let tags = movieData.tags || []

      movie.tags = tags
      movie.summary = movieData.summary || ''
      movie.title = movieData.alt_title || movieData.title || ''
      movie.rawTitle = movieData.title || ''

      if (movieData.attrs) {
        movie.movieTypes = movieData.attrs.movie_type || []

        for (let i = 0;  i < movie.movieTypes.length; i++) {
          let item = movie.movieTypes[i]
          let cat = await Category.findOne({
            name: item
          })

          if (!cat) {
            cat = new Category({
              name: item,
              movies: [movie._id]
            })
          } else {
            if (cat.movies.indexOf(movie._id) === -1) {
              cat.movies.push(movie._id)
            }
          }

          await cat.save()

          if (!movie.category) {
            movie.category.push(cat._id)
          } else {
            if (movie.category.indexOf(cat._id) === -1) {
              movie.category.push(cat._id)
            }
          }

          let dates = movieData.attrs.pubdate || []
          let pubdates = []

          dates.map(item => {
            if (item && item.split('(').length > 0) {
              let parts = item.split('(')
              let date = parts[0]
              let country = '未知'

              if (parts[1]) {
                country = parts[1].split(')')[0]
              }

              pubdates.push({
                date: new Date(date),
                country
              })
            }
          })

          movie.pubdate = pubdates
        }

        tags.forEach(tag => {
          movie.tags.push(tag.name)
        })

        console.log(movie)
        // await movie.save()


      }
    }
  }

})()
