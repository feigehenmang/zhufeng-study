// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标
export function TwoSum(nums: number[], count: number): number[] {
    let result: [number, number] = [-1, -1]
    nums.reduce((memo: Record<string, number>, curr, index) => {
        const findValue = count - curr
        if (memo.hasOwnProperty(findValue)) {
            result = [memo[findValue], index]
        } else {
            memo[curr] = index
        }
        return memo
    }, {})
    return result
}
function TwoSum2(arr: number[], target: number): [number, number] {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                return [i, j]
            }
        }
    }
    return [-1, -1]
}
function TwoSum3(arr: number[], target: number): [number, number] {
    let map: Record<string, number> = {}
    for (let i = 0; i < arr.length; i++) {
        if (map[(arr[i])] >= 0) {
            return [map[arr[i]], i]
        } else {
            map[target - arr[i]] = i
        }
    }
    return [-1, -1]
}
// console.log(
//     TwoSum3([2, 7, 11, 15], 9)
// )
// 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

function mergeNums(nums1: number[], m: number, nums2: number[], n: number): number[] {
    let i = m - 1, j = n - 1, k = m + n - 1
    while (i >= 0 && j >= 0) {
        if (nums1[i] >= nums2[j]) {
            nums1[k] = nums1[i]
            k--
            i--
        }
        if (nums1[i] < nums2[j]) {
            nums1[k] = nums2[j]
            k--
            j--
        }
    }
    console.log(i, j)
    while (j >= 0) {
        nums1[k] = nums2[j]
        k--
        j--
    }
    return nums1
}
let nums1 = [1, 2, 3, 0, 0, 0], m = 3
let nums2 = [2, 5, 6], n = 3
// console.log(mergeNums(nums1, m, nums2, n))
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

// function threeNums(nums: number[], target: number): Array<number>[] {
//     let result: Array<number>[] = []
//     nums.sort((a, b) => a - b)
//     for(let i = 0; i < nums.length; i ++) {
//         let j = i+1, k = nums.length - 1
//         while(j < nums.length && k > i+1) {
//             if(target - nums[i] === nums[j] + nums[k]) {
//                 result.push([i, j, k])
//             }

//         }
//     }
//     return result
// }

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums: number[]) {
    // 用于存放结果数组
    let res = []
    // 给 nums 排序
    nums = nums.sort((a, b) => {
        return a - b
    })
    // 缓存数组长度
    const len = nums.length
    // 注意我们遍历到倒数第三个数就足够了，因为左右指针会遍历后面两个数
    for (let i = 0; i < len - 2; i++) {
        // 左指针 j
        let j = i + 1
        // 右指针k
        let k = len - 1
        // 如果遇到重复的数字，则跳过
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        while (j < k) {
            // 三数之和小于0，左指针前进
            if (nums[i] + nums[j] + nums[k] < 0) {
                j++
                // 处理左指针元素重复的情况
                while (j < k && nums[j] === nums[j - 1]) {
                    j++
                }
            } else if (nums[i] + nums[j] + nums[k] > 0) {
                // 三数之和大于0，右指针后退
                k--

                // 处理右指针元素重复的情况
                while (j < k && nums[k] === nums[k + 1]) {
                    k--
                }
            } else {
                // 得到目标数字组合，推入结果数组
                res.push([nums[i], nums[j], nums[k]])

                // 左右指针一起前进
                j++
                k--

                // 若左指针元素重复，跳过
                while (j < k && nums[j] === nums[j - 1]) {
                    j++
                }

                // 若右指针元素重复，跳过
                while (j < k && nums[k] === nums[k + 1]) {
                    k--
                }
            }
        }
    }

    // 返回结果数组
    return res
};