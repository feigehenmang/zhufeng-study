const crypto = require('crypto')
// console.log(crypto)
// const str = crypto.createHmac('sha256', 'zf').update('123').digest('base64')
// console.log(str)
const http = require('http')
const app = http.createServer((request, response) => {

})
app.listen(3000, () => {
    console.log('server start in 3000')
})

