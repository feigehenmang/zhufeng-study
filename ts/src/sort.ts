// sort
let arr = [1,3,4,2,1,3,45,5,6]

// console.log(arr.sort((a,b) => a-b)) // 升序 [1, 1, 2, 3, 3, 4, 5, 6, 45]
// console.log(arr.sort((a,b) => b-a)) // 降序 [45, 6, 5, 4, 3, 3, 2, 1, 1]

let arr2 = [
    {value: 3, maxValue: 100},
    {value: 6, maxValue: 400},
    {value: 2, maxValue: 300},
    {value: 33, maxValue: 600},
    {value: 22, maxValue: 800},
    {value: 10, maxValue: 1100},
    {value: 1, maxValue: 1300},
    {value: 20, maxValue: 1200},
    {value: 50, maxValue: 2200},
]
type Value = {
    value: number,
    maxValue: number
}
function sort(arr: Value[], sortField: keyof Value, isDesc = true) {
    return arr.sort((a, b) => isDesc ? a[sortField] - b[sortField] : b[sortField] - a[sortField])
}

// console.log('value 升序', sort(arr2, 'value'))
// console.log('value 降序', sort(arr2, 'value', false))
// console.log('maxValue 升序', sort(arr2, 'maxValue'))
// console.log('maxValue 降序', sort(arr2, 'maxValue', false))

export {}