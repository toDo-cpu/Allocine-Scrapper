module.exports = function(url) {
    return new Promise(function(resolve, reject){
        if (url != undefined) {
            url = url.split('-')
            url = url[1].split('/')
            id = url[0]
            resolve(id)
        } else {
            reject('extract_id')
        }

    })
}