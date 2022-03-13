const context = {}

function defineGetter(pro, target, key) {
    pro.__defineGetter__(key, function(){
        // console.log(this) // 指向application中的context
        return this[target][key]
    })
}
function defineSetter(pro, target, key) {
    pro.__defineSetter__(key, function (val) {
        // console.log(this)
        this[target][key] = val
    })
}


defineGetter(context,'request', 'url')
defineGetter(context, 'request', 'path')
defineGetter(context, 'response', 'body')
defineSetter(context, 'response', 'body')


module.exports = context