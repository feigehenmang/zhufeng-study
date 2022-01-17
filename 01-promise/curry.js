function curry(fn, ...args) {
    const len = fn.length
    return (...newArgs) => {
        let arg = args.concat(newArgs)
        if (arg.length >= len) {
            return fn(...arg)
        } else {
            return curry(fn, ...arg)
        }
    }
}

const add = (a, b, c, d, e) => {
    return a + b + c + d + e
}

const curryAdd = curry(add)


console.log(curryAdd(1)(2, 3)(4)(5))




