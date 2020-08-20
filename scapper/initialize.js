const extract_links = require('../lib/extract_links')
const fs_promise = require('fs').promises
const fs =require('fs')
const asyncForEach = require('../lib/asyncloop')

fs.mkdirSync('../Corpus/')

first_label = fs.readFileSync('../Data/first_label.txt').toString().split('\n')
second_label = fs.readFileSync('../Data/second_label.txt').toString().split('\n')

asyncForEach(first_label , async(item) =>{
    id = await extract_links(item)
    link = `http://www.allocine.fr/film/fichefilm-${id}/critiques/spectateurs/`
    fs_promise.writeFile('../Data/label.txt', link + '\n' , {flag : 'a+'})
    fs_promise.writeFile(`../Corpus/${id}.json` , JSON.stringify({ data : []}) , {flag : 'w+'})
})

asyncForEach(second_label , async(link)=> {
    fs_promise.writeFile('../Data/label.txt', link + '\n' , {flag : 'a+'})
})