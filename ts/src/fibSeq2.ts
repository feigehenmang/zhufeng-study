export function fib(n: number): number {
    if (n < 2) {
        return 1
    }
    return fib(n - 1) + fib(n - 2)
}

export function fibCache(n: number, cache: number[] = []): number {
    if(n < 2) return 1
    if(cache[n]) return cache[n]
    let result = fibCache(n - 1, cache) + fibCache(n-2, cache)
    cache[n] = result
    return result
}
export function fibLoop(n: number): number {
    let f0 = 0, f1 = 1, cur = 0
    for(let i = 0; i < n; i++) {
        cur = f0 + f1
        f0 = f1
        f1 = cur
    }
    return cur
}
// console.log(fib(5))