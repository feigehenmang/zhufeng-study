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
priteAddress = priteName
priteName = priteAddress