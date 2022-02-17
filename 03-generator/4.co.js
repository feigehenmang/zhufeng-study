const fs = require('fs').promises
const path = require('path')

function* read() {
    const fileName = yield fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf-8')
    const content = yield fs.readFile(path.resolve(__dirname, fileName), 'utf-8')
    return content
}

function co(genFn) {
    const iterator = genFn()
    return new Promise((resolve, reject) => {
        const loop = v => {
            const data = iterator.next(v)
            if (data.done) {
                resolve(data.value)
            } else {
                Promise.resolve(data.value).then(res => {
                    loop(res)
                }, reject)
            }
        }
        loop()
    })
}
co(read).then(result => {
    console.log(result)
})
