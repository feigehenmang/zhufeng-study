Function.prototype.before = function (cb) {
    return (...args) => {
        const x = cb()
        const then = x.then
        if ((typeof then === 'object' && then !== null) || typeof then === 'function') {
            then.call(x, (v) => {
                this(...args)
            }, (r) => {
                this(...args)
            })
        } else {
            this(...args)
        }
    }
}

function test(...args) {
    console.log(args)
}

const newTest = test.before(() => new Promise((resolve) => {
    setTimeout(() => {
        resolve('before')
    }, 3000)
}))

newTest('test')


