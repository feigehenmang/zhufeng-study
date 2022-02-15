


// const utils = require('utils')
const fs = require('fs')
const path = require('path')
const Promise = require('./promise')
// const readFile = utils.promisify(fs.readFile)
// new Promise(resolve => {
//     setTimeout(() => {
//         resolve(5)
//     })
// }).then(res => console.log(res)).then(() => {
//     return new Promise(resolve => resolve(5))
// }).then(res => console.log(res))

const timeout = times => new Promise(resolve => setTimeout(() => resolve(times), times))


const promises = [timeout(200), timeout(300), timeout(400)]
Promise.all(promises).then(result => {
    console.log(result)
})

// const readFile = (path) => new Promise((resolve, reject) => {
//     fs.readFile(path, 'utf-8', (err, data) => {
//         if (err) reject(err)
//         resolve(data)
//     })
// })

// readFile(
//     path.resolve(__dirname, 'name.txt')
// ).then(
//     data => readFile(path.resolve(__dirname, data))
// ).then(
//     res => console.log(res)
// )
