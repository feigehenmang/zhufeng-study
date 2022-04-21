// 重新构造做变化
// 针对数组
type Push<T extends unknown[], K> = [...T, K]
type UnShift<T extends unknown[], K> = [K, ...T]
let a1: Push<[number, string], string> // [number, string, string]
let a2: UnShift<[number, string], string> // [string, number, string]

type MergeTuple<T extends unknown[], K extends unknown[]> = [T, K]
type Zip<T extends [unknown, unknown], K extends [unknown, unknown]> = 
    T extends [infer T1, infer T2]
        ? K extends [infer T3, infer T4]
            ? [[T1, T3], [T2, T4]]
            : []
        :[]
type zipTupLoop<T extends unknown[], K extends unknown[]> = 
    T extends [infer T1, ...infer Args]
    ? K extends [infer K1, ...infer KArgs]
    ? [[T1, K1], ...zipTupLoop<Args, KArgs>]
    : []
    : []
type tup1 = [number, 'test']
type tup2 = [string, string,  boolean]
type mergeTup = MergeTuple<[number, 'test'], [string, string,  boolean]> // [[number, "test"], [string, string, boolean]]
type zipTup = Zip<[number, 'test'], [string, string]> // [[number, string], ["test", string]]
type zipLoopTup1 = zipTupLoop<[number, string, boolean], [1, '1', true]> // [[number, 1], [string, "1"], [boolean, true]]

let a3: mergeTup = [[1, 'test'], ['1', '2', true]]
// 针对字符串
type FirstElUpper<T extends string> = T extends `${infer FirstEl}${infer OtherEl}` ? `${Uppercase<FirstEl>}${OtherEl}` : ``
// dong_dong_dong => dongDongDong
type underToCapitalize<T extends string> = T extends `${infer S1}_${infer S2}_${infer S3}` ? `${S1}${FirstElUpper<S2>}${FirstElUpper<S3>}` : ``
type DropStr<T extends string, str extends string> = T extends `${infer Prefix}${str}${infer Affix}` ? DropStr<`${Prefix}${Affix}`, str> : T
let s1: FirstElUpper<'test'> // "Test"
let s2: Uppercase<'a'> // 'A' // 大写
let s3: Lowercase<'A'> // 'a' // 小写
let s4: Capitalize<'test'> // 'Test' // 首字母大写
let s5: Uncapitalize<'Test'> // 'test' // 首字母小写
let s6: underToCapitalize<'dong_dong_dong'> // 'dongDongDong'
let s7: DropStr<' te  s t ', ' '>  // 'test'
// 针对函数
type AppendParamsType<T extends Function, Args> = T extends (...args: infer PrevArgs) => infer ReturnType ? (...args: [...PrevArgs, Args]) => ReturnType : never
type ParamsToReturn<T extends Function> = T extends (...args: infer Args) => infer ReturnType ? (arg: ReturnType) => Args : never
function f1(name: string, num: number) {} 
type F2 = AppendParamsType<typeof f1, boolean>
type F3 = ParamsToReturn<typeof f1>

// 针对索引类型 所以类型指的就是有key值且是type指定的
type o1 = {
    name: string,
    age: number,
    address: string
}

type Mapping<T extends object> = {
    [k in keyof T]: [T[k], T[k], T[k]]
}

type StringKey = (number | string | symbol) & string // string
type KeyToUppercase<T extends object> = {
    [k in keyof T as Uppercase<k & string>] : T[k]
}

type o2 = Mapping<o1>
// {
//     name: [string, string, string];
//     age: [number, number, number];
//     address: [string, string, string];
// }
type o3 = KeyToUppercase<o1>
// {
//     NAME: string;
//     AGE: number;
//     ADDRESS: string;
// }