export function cb(callback: (val: string | number) => number | string) {
  callback("123");
}
// 逆变 当涉及到函数入参时，此时函数主体只接受string，但是cb函数的参数要求可能是string or number，此时如果传入number，会导致函数无法正常执行
// 此时 函数的执行在cb函数内部，而cb函数的入参有约束，所以在编写入参函数时需要要求函数的参数类型大于cb的约束
// 外部函数参数约束只能大于内部函数约束
cb((val: string|number|boolean) => {
  console.log(val);
  return "123";
});
// 协变的话 函数的返回值必须继承子内部函数的返回值
// 传父返子
cb((val: string | number | null) => {
  console.log(val);
  return "123";
});
function isNumber(v: number | string): v is number {
  return typeof v === "number";
}
function getValue(v: number | string) {
  if (isNumber(v)) {
    v;
  }
}
// 简单赋值
let n1!: number | string
let n2!: number | string | boolean
n2 = n1
type Fn1 = (name: string, age: number) => number
type Fn2 = (name: string, age: number, address: string) => number
let fn1!: Fn1
let fn2!: Fn2
// 参数少的可以赋值给参数多的
fn2 = fn1

// 逆变： 函数作为函数参数时 函数执行者是ajax，所以要遵循ajax的参数约束，只能传入number 或者string
// 此时外部函数定义只能定义包含number string的类型也就是number string的子类型
// 协变： 函数返回值约束，以传入函数的返回值为准，ajax定义的函数返回值需要是返回值约束类型的父类型
function ajax(type: 'get' | 'post', cb: (code: number | string) => {code: number|string}) {
  let obj = cb(200)
  obj.code
}

ajax('get', (code: number|string): {code: number|string, age: number} => {
  console.log(code)
  return {code, age: 1}
})


function fn<T, k>(a: T): T{
  return a
}
let r = fn(1)