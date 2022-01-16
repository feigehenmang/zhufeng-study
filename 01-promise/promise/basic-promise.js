const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
// 基本处理了异步调用的问题 接下来要解决链式调用的问题
class Promise {
    constructor(exector) {
        this.status = PENDING // Promise 状态
        this.value = undefined // 当前Promise成功的值
        this.reson = undefined // 当前Promise失败的值
        this.onRejectedFns = [] // 执行成功函数
        this.onFulfilledFns = [] // 执行失败函数
        const resolve = v => {
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
        if (this.status === FULFILLED) {
            onFulfilled(this.value)
        }
        if (this.status === REJECTED) {
            onRejected(this.reson)
        }
        if (this.status === PENDING) {
            this.onFulfilledFns.push(onFulfilled)
            this.onRejectedFns.push(onRejected)
        }
    }
}

module.exports = Promise