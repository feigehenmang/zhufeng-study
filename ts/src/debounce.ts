// 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
export interface DebounceOptions {
    immediate?: boolean
}
export function debounce(fn: (...args: any[]) => void, wait: number, options: DebounceOptions = {}) {
    let timer: NodeJS.Timeout
    let isWait = !!options.immediate
    return function (this: any, ...args: any[]) {
        let result
        if (isWait) {
            result = fn.apply(this, args)
            isWait = false
        } else {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, wait)
        }
        return result
    }
}