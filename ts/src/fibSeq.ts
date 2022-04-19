// 斐波那契
// F(0)=0，F(1)=1, F(n)=F(n - 1)+F(n - 2)
// 递归
// export function fib(n: number): any {
//     if(n < 0) {
//         throw new Error()
//     }
    
//     if (n < 2) {
//         return n
//     }
//     return fib(n - 1) + fib(n - 2)
// }
// deep + cache
export function fib(n: number, cache: number[] = []) :number {
    if(n < 2) return n
    if(cache[n]) return cache[n]
    let v = fib(n-1, cache) + fib(n-2, cache)
    cache[n] = v
    return v
}
// for循环
// export function fib(n: number) {
//     if(n < 0) {
//         return
//     }
//     let f0 = 0
//     let f1 = 1
//     let curF = 0
//     for(let i = 0; i < n; i++) {
//         curF = f0 + f1
//         f0 = f1
//         f1 = curF
//     }
//     return curF
// }

