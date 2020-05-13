const qiniu  = require('qiniu')
// import { nanoid } from 'nanoid'
const nanoid = require('nanoid').nanoid
const config = require('../../config')
const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}

;(async () => {
  let movies = [
    {
      video: 'http://vt1.doubanio.com/202005131435/ebf995081799dabb342ca485ec64160b/view/movie/M/402560730.mp4',
      doubanId: '30176393',
      cover: 'https://img1.doubanio.com/img/trailer/medium/2576740658.jpg?',
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2576090251.jpg'
    }
  ]

  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        console.log('开始传 video')
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        console.log('开始传 cover')
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.jpg')
        console.log('开始传 poster')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.jpg')

        if (videoData.key) {
          movie.videoKey = videoData.key
        }
        if (coverData.key) {
          movie.coverKey = coverData.key
        }
        if (posterData.key) {
          movie.posterKey = posterData.key
        }
        console.log(movie)
      } catch (err) {
        console.log(err)
      }
    } 
  })
})()