// function checkType(type, value) {
//     return Object.prototype.toString.call(value) === `[object ${type}]`
// }
// console.log(checkType('String', 123))

const utils = {}
const types = ['String', 'Number', 'Boolean', 'Array', 'Object']
function checkType(type) {
    return function (value) {
        return Object.prototype.toString.call(value) === `[object ${type}]`
    }
}
types.forEach(type => {
    utils[`is${type}`] = checkType(type)
})

console.log(utils.isString('123'))
console.log(utils.isArray('123'))
console.log(utils.isObject({ a: 'b' }))