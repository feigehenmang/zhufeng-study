export function throttle(fn: () => void, wait: number) {
    let prev = 0
    return function (this: any, ...args: []) {
        if (Date.now() - prev >= wait) {
            prev = Date.now()
            return fn.apply(this, args)
        }
    }
}