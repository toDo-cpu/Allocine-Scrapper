const cheerio = require('cheerio')

module.exports = function (html) {
    return new Promise(function(resolve , reject){
        link = {}
        const $ = cheerio.load(html)
        balise_script = ($('script').get())
        balise_script.forEach(item => {
            if (item.attribs.type == 'application/ld+json') {
                link = JSON.parse(item.children[0].data)
            }
        })
        links_list = []
        if (link['@type'] == 'ItemList') {
            link.itemListElement.forEach(function(item){
                url = item.url.split('/')
                links_list.push(url[4])
            })
        }
        resolve(links_list)
    })
}