const Promise = require('./promise/chain.promise')
const setOutSync = times => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(times)
    }, times)
})
// const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 1000)
// }).then(result => {
//     // console.log(result)
//     return setOutSync(result)
//     // return 4
// }).then(result => {
//     console.log(result)
// }).then(result => {
//     console.log(result)
// })
// Promise.all([setOutSync(200), setOutSync(300), setOutSync(400)]).then(result => {
//     console.log(result)
// })
// Promise.race([setOutSync(200), setOutSync(300), setOutSync(400)]).then(result => {
//     console.log(result)
// })
function wrapPromise(promise) {
    let cancel
    let resultPromise = Promise.race([promise, new Promise((resolve, reject) => {
        cancel = reject
    })])
    resultPromise.cancel = cancel
    return resultPromise
}

const p = wrapPromise(setOutSync(4000))
// p.cancel('timeout')
p.then(result => {
    console.log(result)
}, err => {
    console.log(err)
})




// console.log('1', p)



