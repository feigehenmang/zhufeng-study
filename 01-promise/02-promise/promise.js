const PENDING = 'PENDING'
const FULFILED = 'FULFILED'
const REJECTED = 'REJECTED'
const resolvePromise = (promise1, result, resolve, reject) => {

}
class Promise {
    constructor(exector) {
        this.value = undefined
        this.reson = undefined
        this.status = PENDING
        this.callbacks = []
        const resolve = value => {
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
                    resolvePromise(p1, x, resolve, reject)
                }
            }
            if (this.status === REJECTED) {
                if (onRejected) {
                    const y = onRejected(this.reson)
                    resolvePromise(p1, y, resolve, reject)
                }
            }
            if (this.status === PENDING) {
                this.callbacks.push(() => {
                    if (this.status === FULFILED) {
                        if (onFulfilled) {
                            const x = onFulfilled(this.value)
                            resolvePromise(p1, x, resolve, reject)
                        }
                    }
                    if (this.status === REJECTED) {
                        if (onRejected) {
                            const y = onRejected(this.reson)
                            resolvePromise(p1, y, resolve, reject)
                        }
                    }
                })
            }
        })
        return p1
    }
}

module.exports = Promise