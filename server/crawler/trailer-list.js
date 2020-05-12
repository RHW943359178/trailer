const puppeteer = require('puppeteer')

const url = `https://movie.douban.com/explore#!type=movie&tag=热门&sort=recommend&page_limit=20&page_start=0`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

let res = async () => {
  console.log('Start visit the target page');

  const browser = await puppeteer.launch({
    // executablePath: 'D:/Node JS/chrome-win',
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })

  await sleep(3000)

  await page.waitForSelector('.more')

  for (let i = 0; i < 1; i++) {
    await sleep(3000)
    await page.click('.more')
  }

  const result = await page.evaluate(() => {
    var $ = window.$
    var items = $('.list-wp .item')
    var links = []
    console.log(items, 'items')
    if (items.length >= 1) {
      
      items.each((index, item) => {
        let it = $(item)

        let doubanId = it.find('div').data('id')
        let title = it.find('img').attr('alt')
        let rate = Number(it.find('strong').text())
        let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')

        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }
    return links
  })
  browser.close()

  process.send({result})
  process.exit(0)
}

res()
