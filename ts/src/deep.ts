// 递归复用做循环
type deepPromiseType = Promise<Promise<Promise<number>>>

type getPromiseType<T> =
    T extends Promise<infer Value> ? getPromiseType<Value> : T

type PromiseType = getPromiseType<deepPromiseType> // number
// 针对数组
type Arr = [1, 2, 3, 4, 5]
type SortArr<T> = T extends [...infer OhterArg, infer LastArg] ? [LastArg, ...SortArr<OhterArg>] : T
type sortArr = SortArr<Arr> // [5, 4, 3, 2, 1]
type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false)
type IncludesItem<T extends unknown[], FindItem> = T extends [infer FirstItem, ...infer OtherArgs] ? IsEqual<FirstItem, FindItem> extends true ? true : IncludesItem<OtherArgs, FindItem> : false
type isInclude5 = IncludesItem<Arr, 5> // true
type isInclude6 = IncludesItem<Arr, 6> // false
type RemoveItem<
    T extends unknown[],
    DeleteItem, Result extends unknown[] = []
    > =
    T extends [...infer Args, infer LastArg]
    ? IsEqual<LastArg, DeleteItem> extends true
    ? RemoveItem<Args, DeleteItem, Result>
    : RemoveItem<Args, DeleteItem, [LastArg, ...Result]>
    : Result
type del5Arr = RemoveItem<Arr, 5>

type BuildArr<T extends number, Item extends unknown, Result extends unknown[] = []> =
    Result['length'] extends T ? Result : BuildArr<T, Item, [...Result, Item]>
type newArr = BuildArr<5, string> // [string, string, string, string, string]
// 针对字符串
type ReplaceAll<T extends string, From extends string, To extends string> = T extends `${infer LeftStr}${From}${infer RightStr}` ? `${LeftStr}${To}${ReplaceAll<RightStr, From, To>}` : T

type replaceStr = ReplaceAll<'Teste', 'e', '?'> // "T?st?"

type StringToUnion<T extends string> = T extends `${infer First}${infer Last}` ? First | StringToUnion<Last> : never

type union1 = StringToUnion<'tes'> // "t" | "e" | "s"

type ReverseStr<T extends string, Result extends string = ''> = T extends `${infer First}${infer Last}` ? ReverseStr<Last, `${First}${Result}`> : Result
type reverseStr1 = ReverseStr<'hello'> // "olleh"
// 针对索引类型
type DeepReadonly<T extends object> = {
    readonly [k in keyof T]: T[k] extends object ? T[k] extends Function ? T[k] : DeepReadonly<T[k]> : T[k]
} // 这种类型推导出来时只包含第一层 不会继续往下
type DeepReadonly2<T extends Record<string, any>> = T extends any ? {
    readonly [k in keyof T]: T[k] extends object ? T[k] extends Function ? T[k] : DeepReadonly2<T[k]> : T[k]
}:never
type deepObj = {
    name: string,
    age: number,
    children: [
        {
            name: string,
            age: number,
            children: [{
                name: string,
                age: number
            }]
        },
        {
            name: string,
            age: number,
            children: [{
                name: string,
                age: number
            }]
        }
    ]
}
type readonlyDeepObj = DeepReadonly<deepObj>
// {
//     readonly name: string;
//     readonly age: number;
//     readonly children: readonly [DeepReadonly<{
//         name: string;
//         age: number;
//         children: [
//             {
//                 name: string;
//                 age: number;
//             }
//         ];
//     }>, DeepReadonly<{
//         name: string;
//         age: number;
//         children: [
//             {
//                 name: string;
//                 age: number;
//             }
//         ];
//     }>];
// }
type readonlyDeepObj2 = DeepReadonly2<deepObj>
// {
//     readonly name: string;
//     readonly age: number;
//     readonly children: readonly [{
//         readonly name: string;
//         readonly age: number;
//         readonly children: readonly [{
//             readonly name: string;
//             readonly age: number;
//         }];
//     }, {
//         readonly name: string;
//         readonly age: number;
//         readonly children: readonly [{
//             readonly name: string;
//             readonly age: number;
//         }];
//     }];
// }
let o: readonlyDeepObj = {
    name: 'test',
    age: 13,
    children: [
        {
            name: '',
            age: 13,
            children: [
                {
                    name: '',
                    age: 12
                }
            ]
        },
        {
            name: '',
            age: 13,
            children: [
                {
                    name: '',
                    age: 12
                }
            ]
        }
    ]
}
// o.children[0].name = 13 // 无法分配到 "name" ，因为它是只读属性。ts(2540)
export { }