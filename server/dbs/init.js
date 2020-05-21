const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-test'
const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise = global.Promise

exports.initSchema = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.connect = () => {
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }

    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    mongoose.connection.on('disconnected', () => {
      maxConnectTimes ++

      if (maxConnectTimes < 5) {
        mongoose.connect(db, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
      } else {
        throw new Error('数据库挂了吧， 快去查看')
      }
    })

    mongoose.connection.on('error', err => {
      maxConnectTimes ++
      
      if (maxConnectTimes < 5) {
        mongoose.connect(db, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
      } else {
        throw new Error('数据库挂了，快去维修')
      }
    })

    mongoose.connection.on('open', () => {
      // const Dog = mongoose.model('Dog', {name: String})
      // const dog = new Dog({name: '阿尔法'})

      // dog.save().then(() => {
      //   console.log('wang')
      // })

      resolve()
      console.log('MongoDB Connected Successfully!')
    })
  })
}