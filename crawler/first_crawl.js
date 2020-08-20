const asyncForEach = require('../lib/asyncloop')
const web_parser = require('../lib/crawling/parser')
const get = require('../lib/get_http')
const fs_promise = require('fs').promises
const fs = require('fs')
const waitFor = require('../lib/waitFor')

base_url = 'http://www.allocine.fr/films/?page=' 

compteur = fs.readFileSync('./compteur.txt').toString().split('\n')

a = 0 
asyncForEach(compteur , async(item) => {
  html = await get(base_url + item)
  if (html) {
    links_list = await web_parser(html)
    await fs_promise.writeFile('../Data/first_label.txt' , (links_list.join('\n') + '\n') , {flag : 'a+'})
    if (a == 5) {
      console.log('\x1b[33m' + 'SCAPPING[INFO]taking a break' + '\x1b[0m')
      await waitFor(7000)
      a = 0
    }
    a++
  }
})


