// 特性
// any any和任何类型取交集还是any
type IsAny<T> = 'a' extends ('b' & T) ? true : false

type bol1 = IsAny<true> // false
type bol2 = IsAny<any> // true

type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false)
type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? true : false;

type anyTest = IsEqual<'1', any> // true 有问题
type anyTest2 = IsEqual2<'1', any> // false hack写法
// 联合类型碰到extends 字符串 会进行解构，一个一个传入
// A extends A 是为了取出联合类型的每一项
// [B] extends [A] 是为了跳过联合类型解构,直接判断[联合类型]是否是[联合类型的某个值] 如果相等的话则说明传入参数不是联合类型
type IsUnion<A, B = A> = A extends A ? [B] extends [A] ? false : true : never

type bol3 = IsUnion<''> // false
type bol4 = IsUnion<any> // false

type IsNever<T> = [T] extends [never] ? true : false

type bol5 = IsNever<never> // true

type tupleLength = []['length'] // 0
type arrLength = number[]['length'] // number
type tupleIsReadonly1 = [1, 2, 3] extends readonly [1, 2, 3] ? true : false // true
type tupleIsReadonly2 = [1, 2, 3] extends [1, 2, 3] ? true : false // true

type NotEquals<A, B> = IsEqual2<A, B> extends true ? false : true
// 元组的length属性为数值的具体值
type IsTuple<T> = T extends readonly unknown[] ? NotEquals<T['length'], number> : false
type bol6 = IsTuple<number[]>

//  逆变 协变
//  父子类型  更具体的就是子类型
// 允许父类型赋值给子类型 叫逆变
// 允许子类型复制给父类型 叫协变

// unionToIntersection
type UnionToIntersection<T> = (T extends T ? (v: T) => unknown : never) extends (v: infer R) => unknown ? R : never

type inter1 = UnionToIntersection<{ name: 'test' } | { age: 19 }>
// {
//     name: 'test';
// } & {
//     age: 19;
// }

type pick1 = Pick<{ name?: string, age: number }, 'name'>
type pick2 = {} extends Pick<{ name?: string, age: number }, 'name'> ? true : false; // true
type pick3 = {} extends Pick<{ name: string, age: number }, 'name'> ? true : false; // false

type GetPartialProp<T extends Record<string, any>> = {
    [K in keyof T as {} extends Pick<T, K> ? K : never]: T[K]
}
type pick4 = GetPartialProp<{ name: string, age: number, address?: string }>
// {
//     address?: string | undefined;
// }
type GetRequiredProp<T extends Record<string, any>> = {
    [K in keyof T as {} extends Pick<T, K> ? never : K]: T[K]
}
type pick5 = GetRequiredProp<{ name: string, age: number, address?: string }>
// {
//     name: string;
//     age: number;
// }
// 索引签名不能构造成字符串字面量类型，因为它没有名字，而其他索引可以。
// K extends `${infer s}`
type RemoveIndexSignature<T extends Record<string, any>> = {
    [K in keyof T as K extends `${infer s}` ? K : never]: T[K]
}
type type1 = { [k: string]: any, seelp(): void }
type pick6 = RemoveIndexSignature<type1>
// keyof 只能拿到 class 的 public 索引，private 和 protected 的索引会被忽略。
class Animal {
    public name: string;
    private age: number;
    protected address: string;
    constructor() {
        this.name = 'test'
        this.age = 13
        this.address = ''
    }
}
type GetPublicProps<T extends Record<string, any>> = {
    [K in keyof T]: T[K]
}
type publicKeys = GetPublicProps<Animal>

export { }