// 模式匹配针对函数
type Parameters<T extends (...args: any[]) => unknown> = T extends (...args: infer R) => unknown ? R : never
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never
type GetThis<T extends (this: any, ...args: any[]) => unknown> = T extends (this: infer R, ...args: any[]) => unknown ? R : never
type iInstanceParamsType = Parameters<typeof getInstance>
type iInstanceReturnType = ReturnType<typeof getInstance>
type iInstanceThisType = GetThis<typeof getInstance>
function getInstance(this: {}, instanceId: number, name: string, instance: { name: string }): { name: string } {
    return instance
}
// 模式匹配针对构造函数
class O {
    constructor(public name: string) {}
}
type ConstructorParameters<T extends { new (...args: any[]): any}> = T extends { new (...args: infer R): any} ? R : never
type InstanceType<T extends {new (...args: any[]): any}> = T extends {new (...args: any[]) : infer R} ? R : never
type IO = InstanceType<typeof O>
type IOParameters = ConstructorParameters<typeof O>
// 模式匹配针对索引类型
let p = {
    name: 'test',
    age: 19
}

type GetRef<T> = 'name' extends keyof T ? T extends {name: infer V|undefined} ? V: never : never

let p1!: GetRef<typeof p>
export { }