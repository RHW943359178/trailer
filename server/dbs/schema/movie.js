const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.types.Mixed

const movieSchema = new Schema({
  doubanId: String,
  rate: Number,
  title: String,
  video: String,
  poster: String,
  cover: String,

  videoKey: String,
  posterKey: String,
  coverKey: String,

  rawTitle: String,
  movieTypes: [String],
  pubDate: Mixed,
  year: Number,
  tags: [String],
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

//  判断是否是第一次创建
movieSchema.pre('save', next => {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

mongoose.model('Movie', movieSchema)