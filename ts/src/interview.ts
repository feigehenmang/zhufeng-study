interface Action<T> {
    payload?: T;
    type: string;
}

interface ParamType {
    count: number;
    message: string;
    asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
    syncMethod<T, U>(action: T): Action<U>;
}

type Handle<T> = T extends any ? {
    [k in keyof T as  T[k] extends Function ? k : never]: HandleFunc<T[k]>
} : never
type HandleFunc<T extends Function> = T extends (val: infer Arg) => infer Return ? (val: Awaited<Arg>) => Awaited<Arg>: never 

declare function connnect(param: ParamType): Handle<ParamType>;

let r = connnect({} as ParamType)
/**
 * 
 * 实现 Handle 类型定义，要求返回的类型为：
 * type Result {
 *  asyncMethod<T, U>(input: T): Action<U>;
 *  syncMethod<T, U>(action: T): Action<U>;
 * }
 */