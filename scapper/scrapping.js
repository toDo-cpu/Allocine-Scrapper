const fs =require('fs')
const get = require('../lib/get_http')
const asyncForEach = require('../lib/asyncloop')
const parser = require('../lib/scrapping/parse')
const fs_promise = require('fs').promises
const extract_id = require('../lib/scrapping/extract_id') 
const waitFor = require('../lib/waitFor')
const extract_id_page = require('../lib/scrapping/extract_id_page')


label = fs.readFileSync('../Data/label.txt').toString().split('\n')
label.push('END')

a= 0
asyncForEach(label , async(item , index) =>{
    if (item != 'END') {
        try {

            id = await extract_id(item)
            id_page = await extract_id_page(item)
            
            console.log('\x1b[33m' + `SCRAPPING[INFO] id ${id}` + '\x1b[0m')

            html = await get(item , { follow_redirection  : false})
        
            const corpus = require(`../Corpus/${id}.json`)
        
            new_corpus = await parser(html , id , corpus , id_page) 
            fs_promise.writeFile(`../Corpus/${id}.json` , JSON.stringify(new_corpus) , {flag : 'w+'})
        
        } catch (e) {
    
            if (e) {
                message = `SCRAPING[ERROR]${id}/${id_page} | ${e}`
                console.log('\x1b[31m' + message + '\x1b[0m')
                fs_promise.writeFile(`../Error_log.txt` , message + '\n' , {flag : 'a+'})
            }
    
        } finally {
            if (a == 15) {
                console.log('\x1b[33m' + 'SCRAPPING[INFO]taking a break' + '\x1b[0m')
                console.log('\x1b[33m' + `SCRAPPING[INFO]task ${ (Math.round(((index) / (label.length)) * 100)).toString()}% complete` + '\x1b[0m')
                await waitFor(5000)
                a = 0
            } else {
                await waitFor(10)
            }
              a++
        }
    } else {
        console.log('\x1b[33m' + 'SCRAPPING[INFO]task is complete' + '\x1b[0m')
    }   
})