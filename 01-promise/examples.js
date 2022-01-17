// nums = [2, 7, 11, 15], target = 9
const nums = [2, 7, 11, 15], target = 9
// 复杂解法
function getNums(arr, target) {
    const result = []
    arr = arr.filter(item => typeof item === 'number' && item.toString().indexOf('.') < 0)
    for (let index = 0; index < arr.length; index++) {
        const a = arr[index]
        for (let jndex = index; jndex < arr.length; jndex++) {
            const b = arr[jndex]
            if (a + b === target) {
                result.push(index, jndex)
            }
        }
    }
    return result
}

function getNumsTwo(arr, target) {
    const map = {}
    for (let index = 0; index < arr.length; index++) {
        const val = arr[index]
        map[val] = index
        const dec = target - val
        if (map[dec] !== undefined) {
            return [map[dec], index]
        }
    }
}
console.log(getNumsTwo(nums, target))