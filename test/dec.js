class Boy {
  @speak('中文')
  run () {
    console.log('I can speak' + this.language)
    console.log('I can run')
  }
}

function speak (language) {
  return function (target, key, descriptor) {
    console.log(target, 1)
    console.log(key, 2)
    console.log(descriptor, 3)

    target.language = language
  
    return descriptor
  }
}


const luke = new Boy()

luke.run()
