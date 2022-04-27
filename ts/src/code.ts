// type ParseParam<Param extends string> = 
//     Param extends `${infer Key}=${infer Value}`
//         ? {
//             [K in Key]: Value 
//         } : Record<string, any>;

// type MergeValues<One, Other> = 
//     One extends Other 
//         ? One
//         : Other extends unknown[]
//             ? [One, ...Other]
//             : [One, Other];

// type MergeParams<
//     OneParam extends Record<string, any>,
//     OtherParam extends Record<string, any>
// > = {
//   readonly [Key in keyof OneParam | keyof OtherParam]: 
//     Key extends keyof OneParam
//         ? Key extends keyof OtherParam
//             ? MergeValues<OneParam[Key], OtherParam[Key]>
//             : OneParam[Key]
//         : Key extends keyof OtherParam 
//             ? OtherParam[Key] 
//             : never
// }

// type ParseQueryString<Str extends string> = 
//     Str extends `${infer Param}&${infer Rest}`
//         ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
//         : ParseParam<Str>;
type MergeValues<One, Other> = 
    One extends Other 
        ? One
        : Other extends unknown[]
            ? [One, ...Other]
            : [One, Other];
type MergeParam<OneParam, OtherParam> = {
    [Key in keyof OneParam | keyof OtherParam]: Key extends keyof OneParam
    ? Key extends keyof OtherParam
        ? MergeValues<OneParam[Key], OtherParam[Key]>
        : OneParam[Key]
    : Key extends keyof OtherParam 
        ? OtherParam[Key] 
        : never
}
type ParseParam<T> = T extends `${infer Key}=${infer Value}` ? {[k in Key]: Value}: {}
type ParseQueryString<T> = T extends `${infer Param}&${infer Rest}` ? MergeParam<ParseParam<Param>, ParseQueryString<Rest>> : ParseParam<T>
type obj1 = ParseParam<'a=1'>
type obj3 = ParseParam<'b=1'>
type obj2 = MergeParam<obj1,obj3>

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


const res = parseQueryString('a=1&b=2&c=3');