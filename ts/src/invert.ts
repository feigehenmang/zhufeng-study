interface Person {
    name: string;
    age: number
}
interface Guang {
    name: string;
    age: number;
    address: string;
}

let o1!: Person
let o2!: Guang

o1 = o2 // 子类型可以赋值给父类型 协变 更具体的类型可以赋值给和他拥有相同特征的类型 这是正常现象 因为子类型拥有父类型所有的特性，所以可以赋值（鸭子类型检测）

let priteAddress = function(val: Guang) {
    console.log(val.address)
}

let priteName = function(val: Person) {
    console.log(val.name)
}
// 父类型可以赋值给子类型 逆变
priteAddress = priteName // 父可以赋值给子的原因是父函数参数特征子函数都有，且父函数的实现不会牵扯到子函数参数中额外的属性
priteName = priteAddress // 子不可以赋值给父的原因是子函数的参数特征父函数不全部包含

// type unionToInter<T> =( T extends T ? (x: T) => unknown : never) extends (x: infer R) => unknown ? R: never

// type t1 = unionToInter<{name: string}|{age: number}>
// type GetReturnType = ReturnType<() => t1>

// T 作为函数参数时， 要作为可以兼容传入参数的类型才可以，所以会发生逆变，联合转交叉
type unionToInter<T> = (T extends T ? (x: T) => unknown : never) extends (x: infer R) => unknown ? R : never

type int1 = unionToInter<(() => 'a')|(() => 'b')> // (() => 'a') & (() => 'b')
type unionToFunc<T> = unionToInter<T extends any ? () => T : never>
type int2 = unionToFunc<'a'|'b'> // (() => "a") & (() => "b")
type int3 = ReturnType<int2> // b

//  联合类型转交叉类型 并且通过returnType将最后一个取出，递归取出
type unionToTuple<T extends any> = unionToInter<T extends any ? () => T:never> extends (...args: any[]) => infer R ? [...unionToTuple<Exclude<T, R>>, R]: []
export {}