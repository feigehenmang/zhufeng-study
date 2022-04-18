export function ArrayDeepFlat(arr: any[]) {
    return arr.reduce((value, item) => {
        value = Array.isArray(item) ? value.concat(ArrayDeepFlat(item)) : value.concat(item)
        return value
    }, [])
}