// 写一个 mySetInterVal(fn, a, b),
// 每次间隔 a,a+b,a+2b 的时间，
// 然后写一个 myClear，停止上面的 mySetInterVal
export function mySetInterVal(fn: () => void, a: number, b: number) {
    let handlerTimer: NodeJS.Timeout
    let times = 0
    const start = () => {
        handlerTimer = setInterval(() => {
            times ++
            fn()
        }, a + times * b)
    }
    return {
        start,
        clear: () => {
            clearInterval(handlerTimer)
        }
    }
}
export {}