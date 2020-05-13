const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.types.Mixed

const movieSchema = new Schema({
  username: {
    unique: true,
    type: String
  },
  email: {
    unique: true,
    type: String
  },
  password: {
    unique: true,
    type: String
  },
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

mongoose.model('Movie', movieSchema)