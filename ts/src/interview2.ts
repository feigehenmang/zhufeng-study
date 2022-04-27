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
export {}