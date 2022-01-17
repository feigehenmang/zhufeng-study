// nums = [2, 7, 11, 15], target = 9
//  给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
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
// 将已遍历的值以 value：index的形式储存，每次循环时查看差值是否存在，存在就返回
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