// 斐波那契
// F(0)=0，F(1)=1, F(n)=F(n - 1)+F(n - 2)

export function fib(n: number): number {
    if(n == 0) {
        return 1
    }
    if (n < 2) {
        return n
    }
    return fib(n - 1) + fib(n - 2)
}

