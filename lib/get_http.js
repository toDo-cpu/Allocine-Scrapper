const http = require('http')

module.exports = function(url , options ) {
    return new Promise (function(resolve , reject){

        try {
            req = http.get(url , function(res){
                if ( res.statusCode == 404 ) {
                    console.log('\x1b[31m' + 'SCAPPING[STATUSCODE]' + url + ' : ' + res.statusCode + '\x1b[0m')
                    resolve()
                } else if (res.statusCode == 301 && options.follow_redirect == true ) {
                    console.log('\x1b[35m' + 'SCAPPING[STATUSCODE]' + url + ' : ' + res.statusCode + '\x1b[0m')
                    resolve(res.headers['location'])
                } 
                else if (res.statusCode == 301 && options.follow_redirect == false ) {
                    console.log('\x1b[35m' + 'SCAPPING[STATUSCODE]' + url + ' : ' + res.statusCode + '\x1b[0m')
                    reject('Cannot acces to comment by this way')
                } else {
                    console.log('\x1b[32m' + 'SCAPPING[STATUSCODE]' + url + ' : ' + res.statusCode + '\x1b[0m')
                    chunk_body = []
                    res.on('data' , function(d){
                        chunk_body.push(d)
                    })
                    res.on('end' , function(){        
                        body = Buffer.concat(chunk_body)
                        resolve(body)
                    })
                }
            })

            req.on('error' , function(e){
                reject(e)
            })
        } catch (e) {
            reject(e)
        }
    })
}