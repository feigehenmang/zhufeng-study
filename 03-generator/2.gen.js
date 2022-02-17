function* read() {
    // 第一次next会走到yield 1 next的返回值为 {value:1,done:false}
    // 第二次调用next如果传入参数 参数会作为yield的返回值给到a 
    // 且代码会执行到yield 2 等待我们给yield 2 赋予返回值
    const a = yield 1
    console.log(a)
    // 我们第三次调用next, 如果有参数会作为yield 2的返回值给到b 且一直执行完成
    const b = yield 2
    console.log(b)
    return 3
}
const it = read()
console.log(it.next('start'))
console.log(it.next('start2'))
console.log(it.next('start3'))