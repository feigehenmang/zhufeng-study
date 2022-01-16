const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
        return reject(new TypeError('promise and x is not same object'))
    }
    let called = false
    if ((typeof x === 'object' && x != null) || typeof x === 'function') {
        try {
            const then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                if (called) return
                called = true
                resolve(x)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        }
    } else {
        resolve(x)
    }
}
// 基本处理了异步调用的问题 接下来要解决链式调用的问题
class Promise {
    constructor(exector) {
        this.status = PENDING // Promise 状态
        this.value = undefined // 当前Promise成功的值
        this.reson = undefined // 当前Promise失败的值
        this.onRejectedFns = [] // 执行成功函数
        this.onFulfilledFns = [] // 执行失败函数
        const resolve = v => {
            if (v instanceof Promise) { // 这个不属于规范
                return v.then(resolve, reject)
            }
            if (this.status === PENDING) {
                this.value = v
                this.status = FULFILLED
                this.onFulfilledFns.forEach(fn => fn(this.value))
            }
        }
        const reject = e => {
            if (this.status === PENDING) {
                this.reson = e
                this.status = REJECTED
                this.onRejectedFns.forEach(fn => fn(this.reson))
            }
        }
        try {
            exector(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : err => {throw new Error(err)}
        const p1 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                let x = onFulfilled(this.value)
                // 无法直接使用p1 因为立即使用的话p1还未声明完成，需要加延时
                setTimeout(() => {
                    resolvePromise(p1, x, resolve, reject)   
                })
                // resolve(x)
            }
            if (this.status === REJECTED) {
                let x = onRejected(this.reson)
                reject(x)

            }
            if (this.status === PENDING) {
                this.onFulfilledFns.push(() => {
                    let x = onFulfilled(this.value)
                    // resolve(x)
                    setTimeout(() => {
                        resolvePromise(p1, x, resolve, reject)   
                    })
                })
                this.onRejectedFns.push(() => {
                    let x = onRejected(this.reson)
                    reject(x)
                })
            }
        })
        // console.log(p1)
        return p1
    }
    static resolve(x) {
        return new Promise(resolve => {
            resolve(x)
        })
    }
    static reject(r) {
        return new Promise((resolve, reject) => {
            reject(r)
        })
    }
    static all(promises) {
        let result = []
        let index = 0
        return new Promise((resolve, reject) => {
            // console.log(promises)
            const resolveResult = (i, value) => {
                console.log(i, value)
                result[i] = value
                if (++index == promises.length) {
                    resolve(result)
                }
            }
            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i]).then(result => {
                    resolveResult(i, result)
                }, err => {
                    reject(err)
                })
            }
        })
    }
    static race(promises) {
        let result = []
        return new Promise((resolve, reject) => {
            // console.log(promises)
            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i]).then(result => {
                    resolve(result)
                }, err => {
                    reject(err)
                })
            }
        })
    }
}
Promise.deferred = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd
}


module.exports = Promise