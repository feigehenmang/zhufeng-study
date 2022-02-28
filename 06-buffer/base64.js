const transfer = str => {
    const mapCode = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    const buf = Buffer.from(str)
    let result = ''
    for (const b of buf) {
        // console.log(b) // 16 进制
        // console.log(b.toString(2)) // 2进制
        // 16 进制 => 2 进制
        result += b.toString(2)
    }
    const lastLen = result.length % 6
    result = result.slice(0, result.length - lastLen) + '0'.repeat(6 - lastLen) + result[result.length - 1]
    // console.log(result)
    const arr = result.match(/(\d{6})/g)
    console.log(arr)
    return arr.map(val => parseInt(val, 2)).map(val => mapCode[val]).join('')

}

console.log(transfer('a'))