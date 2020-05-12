const rp = require('request-promise-native')

//  http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10

async function fetchMovie (item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  // const url = `http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10${item.doubanId}`
  const res = await rp(url)
  return res
}

;(async () => {
  let movies = [
    {
      doubanId: 30166972,
      title: '少年的你',
      rate: 8.3,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2572166063.jpg'
    },
    {
      doubanId: 30292777,
      title: '阳光普照',
      rate: 8.4,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2570235120.jpg'
    }
  ]

  movies.map(async movie => {
    let movieData = await fetchMovie(movie)

    try {
      movieData = JSON.parse(movieData)
      console.log(movieData.tags)
      console.log(movieData.summary)
    } catch (err) {
      console.log(err)
    }
  })
})()