
const root = {
    val: "A",
    left: {
        val: "B",
        left: {
            val: "D"
        },
        right: {
            val: "E"
        }
    },
    right: {
        val: "C",
        right: {
            val: "F"
        }
    }
};
interface Tree {
    left?: Tree;
    right?: Tree;
    val?: string
}
// 先序遍历
function preorder(tree: Tree) {
    if (!tree) return
    console.log('curr: ', tree.val)
    tree.left && preorder(tree.left)
    tree.right && preorder(tree.right)

}
// 中序遍历
function inorder(tree: Tree) {
    if(!tree) return
    tree.left && inorder(tree.left)
    console.log('inorder-curr: :', tree.val)
    tree.right && inorder(tree.right)
}
// 后序遍历
function postorder(tree: Tree) {
    if(!tree) true
    tree.left && postorder(tree.left)
    tree.right && postorder(tree.right)
    console.log('postorder: ', tree.val)
}
// preorder(root)
// inorder(root)
// postorder(root)


// 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]
const nums = [2,7,11,15]

function getIndexs(nums: number[], target: number) {
    for(let i = 0; i < nums.length; i++) {
        for(let j = i+1; j < nums.length; j++) {
            if(nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
}
function getIndexsByMap(nums: number[], target: number) {
    const map = new Map()
    for(let i = 0; i< nums.length ; i++) {
        const searchKey = target - i
        if(map.has(searchKey)) {
            return [map.get(searchKey), i]
        } else {
            map.set(nums[i], i)
        }
    }
}

// console.log(getIndexs(nums, 9))
// console.log(getIndexsByMap(nums, 9))

// 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6], n = 3
// 输出: [1,2,2,3,5,6]

function merge(nums1: number[], m: number, nums2: number[], n:number): number[] {
    let i = m - 1, j = n - 1, z = m+n-1
    while(i>=0&&j>=0) {
        if(nums1[i] > nums2[j]) {
            nums1[z] = nums1[i]
            z--
            i--
        } else {
            nums1[z] = nums2[j]
            z--
            j--
        }
    }
    while(j>=0) {
        nums1[z] = nums2[j]
        z--
        j--
    }
    // console.log(i, j, nums1)
    return nums1
}

merge([1,2,3,0,0,0], 3, [2,5,6],3)
// 真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，
// 使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
function threeSum2(nums: number[]) {
    let result = []
    nums = nums.sort((a,b) => a- b)
    for(let i = 0; i < nums.length; i++) {
        let j = i+1
        let z = nums.length - 1
        if(i > 0 && nums[i] === nums[i-1]) {
            continue
        }

        while(j < z) {
            if(nums[i] + nums[j] + nums[z] < 0) {
                j ++
                while(j<z&&nums[j] === nums[j+1]){
                    j++
                }
            } else if(nums[i]+nums[j]+nums[z] > 0) {
                z -- 
                while(j<z&&nums[z] === nums[z-1]) {
                    z--
                }
            } else {
                result.push([nums[i], nums[j], nums[z]])
                j++
                z--
                while(j<z&&nums[j] === nums[j+1]){
                    j++
                }
                while(j<z&&nums[z] === nums[z-1]) {
                    z--
                }
            }
        }
    }
    return result
}
function threeSum(nums: number[]) {
    let result = []
    nums.sort((a,b) => a-b)
    let len = nums.length
    for(let i = 0; i< len; i++) {
        let j = i+1
        let k = len - 1
        if(i > 0 && nums[i] === nums[i-1]) {
            continue
        }
        while(j < k) {
            let r = nums[i] + nums[j] + nums[k]
            if(r > 0) {
                k --
                while(j < k && nums[k] === nums[k-1]){
                    k--
                }
            } else if(r < 0) {
                j++
                while(j < k && nums[j] === nums[j+1]){
                    j++
                }
            } else {
                result.push([nums[i], nums[j], nums[k]])
                k --
                j ++
                while(j < k && nums[k] === nums[k-1]){
                    k--
                }
                while(j < k && nums[j] === nums[j+1]){
                    j++
                }
            }
        }
    }
    return result
}

// console.log(threeSum([-1, 0, 1, 2, -1, -4]))

function validPalindrome(str:string) {
    let i = 0, j = str.length - 1
    while(i < j) {
        if(str[i] === str[j]) {
            i++
            j--
        }

        if(str[i] !== str[j]) {
            if(isPalindrome(i+1,j)) {
                return true
            }
            if(isPalindrome(i,j-1)) {
                return true
            }
            return false
        }
    }

    function isPalindrome(ss: number,se: number) {
        while(ss< se) {
            if(str[ss] === str[se]) {
                ss++
                se--
            }
            if(str[ss] !== str[se]) {
                return false
            }
        }
        return true
    }
}
// console.log('validPalindrome', validPalindrome('abacd'))
// 

function isPalindrome(str: string): boolean {
    for(let i = 0; i < Math.floor(str.length/2); i++) {
        if(str[i] !== str[str.length - i - 1]) return false
    }
    return true
}
function validPalindrome2(str: string): boolean {
    let i = 0, j = str.length - 1
    while(i < j) {
        if(str[i]===str[j]) {
            i++
            j--
        }
        if(str[i]!==str[j]) {
            if(isPalindrome(++i, j)) {
                return true
            }
            if(isPalindrome(i, --j)) {
                return true
            }
            return false
        }
    }

    function isPalindrome(start: number, end: number) {
        while(start < end) {
            if(str[start] !== str[end]) {
                return false
            } else {
                start ++
                end --
            }
        }
        return true
    }
    return true
}
console.log('isPalindrome', isPalindrome('abcba'))
console.log('isPalindrome', isPalindrome('abcbaa'))
console.log('validPalindrome2', validPalindrome2('abcbaa'))
function transformStr(str: string){
    const regexp1 = /\s*([+|-]?[0-9]*)/
}