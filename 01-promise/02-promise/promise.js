const PENDING = 'PENDING'
const FULFILED = 'FULFILED'
const REJECTED = 'REJECTED'
const resolvePromise = (promise1, result, resolve, reject) => {
    if (promise1 === result) {
        throw new Error('promise and x is not a object')
    }
    if ((typeof result === 'object' && result != null) || typeof result === 'function') {
        const then = result.then
        if (typeof then === 'function') {
            then.call(result, res => {
                // resolve(res)
                resolvePromise(promise1, res, resolve, reject)
            }, err => {
                reject(err)
            })
        }
    } else {
        resolve(result)
    }

}
class Promise {
    constructor(exector) {
        this.value = undefined
        this.reson = undefined
        this.status = PENDING
        this.callbacks = []
        const resolve = value => {
            if (value instanceof Promise) { // 这个不属于规范
                return value.then(resolve, reject)
            }
            this.value = value
            this.status = FULFILED
            this.callbacks.forEach(fn => fn())
        }
        const reject = reson => {
            this.reson = reson
            this.status = REJECTED
            this.callbacks.forEach(fn => fn())
        }

        exector(resolve, reject)
    }
    then(onFulfilled, onRejected) {
        const p1 = new Promise((resolve, reject) => {
            if (this.status === FULFILED) {
                if (onFulfilled) {
                    const x = onFulfilled(this.value)
                    setTimeout(() => {
                        resolvePromise(p1, x, resolve, reject)
                    })
                }
            }
            if (this.status === REJECTED) {
                if (onRejected) {
                    const y = onRejected(this.reson)
                    // resolvePromise(p1, y, resolve, reject)
                }
            }
            if (this.status === PENDING) {
                this.callbacks.push(() => {
                    if (this.status === FULFILED) {
                        if (onFulfilled) {
                            const x = onFulfilled(this.value)
                            setTimeout(() => {
                                resolvePromise(p1, x, resolve, reject)
                            })
                        }
                    }
                    if (this.status === REJECTED) {
                        if (onRejected) {
                            const y = onRejected(this.reson)
                            // resolvePromise(p1, y, resolve, reject)
                        }
                    }
                })
            }
        })
        return p1
    }

    static resolve(value) {
        return new Promise(resolve => {
            resolve(value)
        })
    }

    static reject(reson) {
        return new Promise((resolve, reject) => {
            reject(reson)
        })
    }


    static all(promises) {
        return new Promise((resolve, reject) => {
            let len = promises.length, result = new Array(len)
            function resolveStep(v, index) {
                result[index] = v
                if (--len == 0) {
                    resolve(result)
                }
            }
            promises.forEach((promise, index) => {
                Promise.resolve(promise).then(res => {
                    resolveStep(res, index)
                }, err => {
                    reject(err)
                })
            })
        })
    }

    static allSetted(promises) {
        let index = 0, result = new Array(promises.length)
        return new Promise((resolve, reject) => {
            const resolveStep = (v, i, status) => {
                result[i] = { status, value: v }
                if (++index === promises.length) {
                    resolve(result)
                }
            }
            promises.forEach((p, i) => {
                Promise.resolve(p).then(v => {
                    resolveStep(v, i, FULFILED)
                }, e => {
                    resolveStep(v, i, REJECTED)
                })
            })
        })
    }
    static race(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach(p => {
                p.then(x => {
                    resolve(x)
                }, e => {
                    reject(e)
                })
            })
        })
    }
}

module.exports = Promise