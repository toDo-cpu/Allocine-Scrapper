module.exports = function(str) {
    return new Promise(function(resolve , reject){
        str = str.split('=')
        str = str[1].split('.')
        str = str[0]
        resolve(str)
    })
}