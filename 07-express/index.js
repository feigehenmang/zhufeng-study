const qs = require('qs')

const result = qs.parse('https://anyzdoor-dev.emdlz.com.cn/api-storeservice/api/store/security/106/code/?code=123123123', true)
console.log(result)

