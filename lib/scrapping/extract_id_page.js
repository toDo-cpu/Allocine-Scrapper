const url = require('url')

module.exports = function(query) {
    return new Promise(function(resolve ,reject){

        if ( query != undefined) {
            query = url.parse(query)
            if (query.search != undefined) {
    
                params = query.search
                params = params.split('=')
                resolve(params[1])
    
            } else {
                resolve('1')
            }
        } else {
            reject('extract_id_page')
        }
    })
}