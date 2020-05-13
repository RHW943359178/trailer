const puppeteer = require('puppeteer')

const base = `https://movie.douban.com/subject/`
const videoBase = `https://movie.douban.com/trailer/219491/#content`
const doubanId = '26739551'

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  console.log('Start visit the target page');

  const browser = await puppeteer.launch({
    // executablePath: 'D:/Node JS/chrome-win',
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()
  await page.goto(base + doubanId, {
    waitUntil: 'networkidle2'
  })

  await sleep(1000)

  const result = await page.evaluate(() => {
    var $ = window.$
    var it = $('.related-pic-video')
    if (it && it.length > 0) {
      var link = it.attr('href')
      var urlStyle = it.css('backgroundImage')
      var cover = urlStyle.split('("')[1].split('")')[0]
      return {
        link,
        cover
      }
    }
    return {}
  })

  let video
  if (result.link) {
    await page.goto(result.link, {
      waitUntil: 'networkidle2'
    })
    await sleep(1000)

    video = await page.evaluate(() => {
      var $ = window.$
      var it = $('source')

      if (it && it.length > 0) {
        return it.attr('src')
      }
      return ''
    })
  }

  const data = {
    video,
    doubanId,
    cover: result.cover
  }

  browser.close()

  process.send(data)
  process.exit(0)
})()




