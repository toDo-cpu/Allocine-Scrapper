const asyncForEach = require('../lib/asyncloop')
const get = require('../lib/get_http')
const fs_promise = require('fs').promises
const fs = require('fs')
const waitFor = require('../lib/waitFor')
const extract_links = require('../lib/extract_links')
const url = require('url')
const find_comms = require('../lib/crawling/find_all_comment_page')

debug_mode = false

first_label_url = fs.readFileSync('../Data/first_label.txt').toString().split('\n');

a = 0
asyncForEach(first_label_url , async(item , index) => {
  id = await extract_links(item)
  host = `http://www.allocine.fr/film/fichefilm-${id}/critiques/spectateurs/`
  query = url.parse(await get(host + '?page=1000' , { follow_redirect : true , debug :debug_mode} ))
  second_label_url = await find_comms( query , {debug : debug_mode})

  await fs_promise.writeFile('../Data/second_label.txt' , (second_label_url.join('\n') + '\n') , {flag : 'a+'})
  
  if (a == 5) {
    console.log('\x1b[33m' + 'SCAPPING[INFO]taking a break' + '\x1b[0m')
    console.log('\x1b[33m' + `SCAPPING[INFO]task ${ (Math.round(((index) / (first_label_url.length)) * 100)).toString()}% complete` + '\x1b[0m')
    await waitFor(3000)
    a = 0
  }
  a++
})