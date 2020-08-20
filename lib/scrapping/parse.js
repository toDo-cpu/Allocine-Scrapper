const cheerio = require('cheerio')

module.exports = function(html , id , corpus , id_page) {
    return new Promise(function(resolve ,reject){
        const $ = cheerio.load(html)
        movie = {data : {}}
        movie.data['comments'] = parse_comments($)
        movie.data['stareval_note'] = parse_stareval($)

        for ( i in movie.data['comments'] ) {
            corpus['data'].push({
                id_movie : id,
                page_movie : id_page,
                comment : movie.data['comments'][i],
                stareval_note : movie.data['stareval_note'][i]
            })
        }
        //console.log(corpus)
        resolve(corpus)
    })
}

function parse_stareval($) {
    stareval_note = $('.stareval-note').text()
        stareval = []
        stareval_note = stareval_note.split('')
        for (i in stareval_note) {
            item = stareval_note[i]
            if (i%3 != 0) {
                eval += item
            } else {
                stareval.push(eval)
                eval = ''
                eval += item
            }
        }
        stareval.splice(0 , 1)
        return stareval
}
function parse_comments ($) {
    comments = []
    try {
        raw_html = $('.review-card-review-holder')
        delete raw_html.options
        delete raw_html._root
        delete raw_html.length
        delete raw_html.prevObject   
        for (i in raw_html) {
           comments.push(raw_html[i].children[3].children[0].data)
        }
    } catch(e) {
    } finally {
        return comments
    }
   
}
//#review_57850317 > div.review-card-review-holder > div.content-txt.review-card-content
//document.querySelector("#review_57850317 > div.review-card-review-holder > div.content-txt.review-card-content")