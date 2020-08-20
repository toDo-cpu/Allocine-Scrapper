module.exports = function ( url , options) {
    return new Promise (function(resolve ,reject){

        if (options.debug == true) {
            console.log(url)
        }

        params = url.search
        if (params != null) {
            params = params.split('=')
            max_comment_page = params[1]            
            label = []
            for (let i = 2 ; i <= max_comment_page ; i ++) {
               label.push(`http://www.allocine.fr/film/fichefilm-${id}/critiques/spectateurs/?page=${i}`)
            }
        }
        resolve(label)
    })
}