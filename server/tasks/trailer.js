const cp = require('child_process')
const { resolve } = require('path')


const path = '../crawler/video'
;(async () => {
  const script = resolve(__dirname,  path)
  const child = cp.fork(script, [])

  //  创建标识符
  let invoked = false

  child.on('error', err => {
    if (invoked) {
      return
    }
    invoked = true
    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) {
      return
    }
    invoked = false

    let err = code === 0 ? null : new Error('exit code' + code)
    console.log(err)
  })

  child.on('message', data => {
    // let result = data.result

    console.log(data)
  })
})()
