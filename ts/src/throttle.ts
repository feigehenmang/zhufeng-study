export function throttle(fn: () => void, wait) {
    let prev = 0
    return function (this: any, ...args: []) {
        if (Date.now() - prev >= wait) {
            prev = Date.now()
            return fn.apply(this, args)
        }
    }
}