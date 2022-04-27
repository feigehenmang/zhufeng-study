function func(name: string): string
function func(name: number): number
function func(name: number|string):number|string {
    return name
}
interface Func {
    (name: string): string;
    (name: number): number;
}
let fn: Func 
// fn()
type Func3 = ((name: string) => string) & ((name: number) => number)
let fn2: Func3
// fn2
// T 作为函数参数时， 要作为可以兼容传入参数的类型才可以，所以会发生逆变，联合转交叉
type unionToInter<T> = (T extends T ? (x: T) => unknown : never) extends (x: infer R) => unknown ? R : never

type int1 = unionToInter<(() => 'a')|(() => 'b')> // (() => 'a') & (() => 'b')
type unionToFunc<T> = unionToInter<T extends any ? () => T : never>
type int2 = unionToFunc<'a'|'b'> // (() => "a") & (() => "b")
type int3 = ReturnType<int2> // b

//  联合类型转交叉类型 并且通过returnType将最后一个取出，递归取出
type unionToTuple<T extends any> = unionToInter<T extends any ? () => T:never> extends (...args: any[]) => infer R ? [...unionToTuple<Exclude<T, R>>, R]: []
type tup1 = unionToTuple<'a'|'b'|'c'> // ["a", "b", "c"]
// type JoinType<T extends string, K extends unknown[]> = K extends [infer V, ...infer Rest] ? `${V&string}${T}${JoinType<T, Rest>}`:``;
type RemoveFirstDelimiter<
    Str extends string
> = Str extends `${infer _}${infer Rest}` 
        ? Rest
        : Str;
type JoinType<
    Items extends any[],
    Delimiter extends string,
    Result extends string = ''
> = Items extends [infer Cur, ...infer Rest]
        ? JoinType<Rest, Delimiter, `${Result}${Delimiter}${Cur & string}`>
        : RemoveFirstDelimiter<Result>;
type jointype = JoinType<['a', 'b', 'c'], '-' >
function join<T extends string>(dim: T) {
    return function<Items extends string[]>(val: Items): JoinType<Items, T> {
        return (val.join(dim) as JoinType<Items, T>)
    }
}
let r = join('-')(['a','b','c'])
type obj = {
    aaa_bbb: string;
    bbb_ccc: [
        {
            ccc_ddd: string;
        },
        {
            ddd_eee: string;
            eee_fff: {
                fff_ggg: string;
            }
        }
    ]
}
type Caml<T extends string> = T extends any ? T extends `${infer First}_${infer Rest}` ? `${First}${Caml<Capitalize<Rest>>}` : T :never
type DeepCaml<T extends Record<string, any>> = {
    [key in keyof T as Caml<key&string>]: T[key] extends Record<string, any> ? DeepCaml<T[key]>: T[key]
}

type obj2 = DeepCaml<obj>
export {}