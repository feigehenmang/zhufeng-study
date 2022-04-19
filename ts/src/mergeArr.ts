// var arr=[[1,2,4],[2,3,7],[3,5,7],[4,5,8]]
export function mergeArr(arr: any[]) : any[] {
    if(arr.length <= 1) {
        return arr[0]
    }
    let middle = arr.length / 2 | 0
    let leftArr = mergeArr(arr.slice(0, middle))
    let rightArr = mergeArr(arr.slice(middle))
    // console.log('merge', leftArr, rightArr)
    return merge(leftArr, rightArr)
}

export function merge(left: any[], right: any[]): any[] {
    console.log(left, right)
    let res = []
    let i = 0, j = 0
    while(i < left.length && j < right.length) {
        if(left[i] < right[j]) {
            res.push(left[i])
            i++
        } else {
            res.push(right[j])
            j++
        }
    }
    console.log(i, j)
    if(i < left.length) {
        res = res.concat(left.slice(i))
    }
    if(j < right.length) {
        res = res.concat(right.slice(j))
    }
    return res
}
// mergeArr(arr)