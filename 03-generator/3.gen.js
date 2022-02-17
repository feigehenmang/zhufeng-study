const { readFile } = require("fs");
const path = require('path')

function* read() {
    const fileName = yield 'name.txt'
    const content = yield fileName
    return content
}

function co(genFn) {
    return new Promise((resolve, reject) => {
        const iterator = genFn()
        const loop = (value) => {
            const data = iterator.next(value)
            if (data.done) {
                resolve(data.value)
            } else {
                readFile(path.resolve(__dirname, data.value), 'utf-8', (err, data) => {
                    if (err) reject(err)
                    loop(data)
                })
                // loop()
            }
        }
        loop()
        // let data = iterator.next()
        // if (data.done) {
        //     resolve(data.value)
        // } else {

        // }

    })
}

co(read).then(result => {
    console.log(result)
})