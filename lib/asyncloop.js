module.exports = async function (arr , callback) {
    for ( i in arr ) {
        await callback(arr[i] , i , arr)
    }
}