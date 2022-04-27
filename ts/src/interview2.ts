// parseQureyString
type MergeParams<T, K> = {
    [key in (keyof T | keyof K)]: key extends keyof T ? T[key] : key extends keyof K ? K[key] : never
}
type GetParams<T> = T extends `${infer Key}=${infer Value}` ? {[k in Key]: Value} : Record<string, any>
type ParseQueryString<T> = T extends `${infer First}&${infer Rest}` ? MergeParams<GetParams<First>, ParseQueryString<Rest>>:GetParams<T>
function parseQueryString<Str extends string>(queryStr: Str): ParseQueryString<Str> {
    if (!queryStr || !queryStr.length) {
        return {} as any;
    }
    const queryObj = {} as any;
    const items = queryStr.split('&');
    items.forEach(item => {
        const [key, value] = item.split('=');
        if (queryObj[key]) {
            if(Array.isArray(queryObj[key])) {
                queryObj[key].push(value);
            } else {
                queryObj[key] = [queryObj[key], value]
            }
        } else {
            queryObj[key] = value;
        }
    });
    return queryObj as any;
}
const res = parseQueryString('a=1&b=2&c=3&a=c');

// kebabCase => CamlCase

type kebabToCaml<S> = S extends `${infer First}-${infer Rest}` ? `${First}${kebabToCaml<Capitalize<Rest>>}`: S
type str = kebabToCaml<'aaa-bbb-ccc-ddd'>
type camlToKebab<S extends string> = S extends `${infer First}${infer Rest}` ? First extends Lowercase<First> ? `${First}${camlToKebab<Rest>}` : `-${Lowercase<First>}${camlToKebab<Rest>}`: S
type str2 = camlToKebab<str>

type Chunk<T extends unknown[], len extends number, Curr extends unknown[] = [], Result extends unknown[] = []> = T extends [infer First, ... infer Rest] ? Curr['length'] extends len ? Chunk<Rest, len, [First], [...Result, Curr]> : Chunk<Rest, len, [...Curr, First], Result> : [...Result, Curr]

type chunk1 = Chunk<[1,2,3,4,5,6,7], 2> // [[1, 2], [3, 4], [5, 6], [7]]

type TupleToObject<T extends unknown[], Value> = T extends [infer First, ...infer Rest] ? {
    [k in First as k extends keyof any ? k: never]: Rest extends unknown[] ? TupleToObject<Rest, Value>: Value
} : Value
type tuple1 = TupleToObject<['a', 'b','c'], string>
type Copy<Obj extends Record<string, any>> = {
    [Key in keyof Obj]:Obj[Key]
}
// 如果将对象的某些属性设置为可选参数
// 1. Pick 选出要设置的
// 2. Partial 设置
// 3. Omit 反选出正常的值
// 4. 联合类型返回
type PartialObjectProp<T extends Record<string, any>, K extends keyof T> = Copy<Partial<Pick<T, K>> & Omit<T, K>>
type obj1 = PartialObjectProp<{name: string,age: number, address: string}, 'name'|'age'>
// {
//     name?: string | undefined;
//     age?: number | undefined;
//     address: string;
// }
export {}