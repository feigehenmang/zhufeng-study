// 内置高阶类型
type fn = (this: {name: string}, val: string, num: number) => {val: string,num: number}
type ParametersCustom<T extends Function> = T extends (...args: infer Args) => unknown ? Args : never
type ReturnTypeCustom<T extends Function> = T extends (...args: any[]) => infer Return ? Return : any
type ThisParameterTypeCustom<T extends Function> = T extends(this: infer R, ...args: any[]) => unknown ? R : never
type FnParamters = Parameters<fn> // [val: string, num: number]
type FnParamters2 = ParametersCustom<fn> // [val: string, num: number]
type FnReturnType = ReturnType<fn>
// {
//     val: string;
//     num: number;
// }
type FnReturnType2 = ReturnTypeCustom<fn>
// {
//     val: string;
//     num: number;
// }
type thisType = ThisParameterType<fn> // {name: string}
type thisType2 = ThisParameterTypeCustom<fn> // {name: string}

type OmitThisParameterType<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T
let fn1: fn = function(val: string, num: number) {
    this // { name: string; }
    return {
        val,
        num
    }
}
let fn2: OmitThisParameter<fn> = function(val: string, num: number) {
    // this // "this" 隐式具有类型 "any"，因为它没有类型注释
    return {
        val,
        num
    }
}
let fn3: OmitThisParameterType<fn> = function(val: string, num: number) {
    // this // "this" 隐式具有类型 "any"，因为它没有类型注释
    return {
        val,
        num
    }
}


class Test {
    constructor(public name: string, public age: number) {}
}

type ConstructorParametersCustom<T extends {new (...args: any): any}> = T extends {new (...args: infer R): any} ? R : never
type InstanceTypeCustom<T extends {new (...args: any): any}> = T extends { new (...args: any[]): infer R} ? R : never
type constructorParams1 = ConstructorParameters<typeof Test> // [name: string, age: number]
type constructorParams2 = ConstructorParametersCustom<typeof Test> // [name: string, age: number]
type instanceType1 = InstanceType<typeof Test> // Test
type instanceType2 = InstanceTypeCustom<typeof Test> // Test


// 索引类型
type o1 = {
    name: string,
    age: number,
    address: string
}
type PartialCustom<T extends Record<string, any>> = {
    [k in keyof T]?: T[k]
}
type o2 = Partial<o1>
// {
//     name?: string | undefined;
//     age?: number | undefined;
//     address?: string | undefined;
// }
type o3 = PartialCustom<o1>
// {
//     name?: string | undefined;
//     age?: number | undefined;
//     address?: string | undefined;
// }
type RequiredCustom<T extends Record<string, any>> = {
    [k in keyof T]-?: T[k]
}
type o4 = Required<o3>
type o5 = RequiredCustom<o3>
// {
//     name: string;
//     age: number;
//     address: string;
// }
type ReadonlyCustom<T extends Record<string, any>> = {
    readonly [k in keyof T]: T[k]
}
type o6 = Readonly<o5>
type o7 = ReadonlyCustom<o5>
// {
//     readonly name: string;
//     readonly age: number;
//     readonly address: string;
// }
type PickCustom<T, K extends keyof T> = {
    [k in  K]: T[k]
}
type o8 = Pick<o5, 'name'|'address'>
type o9 = PickCustom<o5, 'name'|'address'>
// type a = keyof {}
// {
//     name: string;
//     address: string;
// }
type RecordCustom<T extends keyof any, K> = {
    [k in T]: K
}
type o10 = Record<'a'|'b', string>
type o12 = RecordCustom<'a'|'b', string>
// {
//     a: string;
//     b: string;
// }
type o11 = Record<string, any>
// {
//     [x: string]: any;
// }
// 联合类型处理

type union1 = Exclude<'a'|'b'|'c'|'d', 'a'|'e'> // "b" | "c" | "d" 从联合类型中移除某些类型
type EcludeCustom<T, K> = T extends K ? never: T
type union2 = EcludeCustom<'a'|'b'|'c'|'d', 'a'> // "b" | "c" | "d"

type union3 = Extract<'a'|'b'|'c'|'d', 'a'|'c'|'e'> // "a" | "c" 取交集
type ExtractCustom<T, K> = T extends K ? T : never
type union4 = ExtractCustom<'a'|'b'|'c'|'d', 'a'|'c'|'e'>

type o13 = Omit<{name: string, age: number, address: string}, 'name'> // 反选生成新的索引类型
// { 
//     age: number;
//     address: string;
// }
type OmitCustom<T extends Record<string, any>, k> = Pick<T, Exclude<keyof T, k>>
type o14 = OmitCustom<{name: string, age: number, address: string}, 'name'>
// {
//     age: number;
//     address: string;
// }
// Promise
type p1 = Promise<any>
type p2 = Awaited<p1> //  any
type AwaitedCustom<T> = T extends Promise<infer R> ? AwaitedCustom<R> : T
type p3 = AwaitedCustom<p1> //any

export {}