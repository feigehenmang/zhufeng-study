// 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]
console.log(getMaxBySqueue([1, 3, -1, -3, 5, 3, 6, 7], 3))
function getMaxBySqueue(queue: number[], k: number) {
    let i = 0, j = k - 1
    let result = []
    while (j < queue.length) {
        let max = getMax(queue, i, j)
        result.push(max)
        j++
        i++
    }

    function getMax(queue: number[], i: number, j: number) {
        let max = -Infinity
        for (let l = i; l <= j; l++) {
            if (max < queue[l]) {
                max = queue[l]
            }
        }
        return max
    }

    return result
}
// DFS 深度优先搜索
// BFS 广度优先搜索
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
//   ABCDEF
function bfs(root: any) {
    let queue = []
    queue.push(root)
    while (queue && queue.length > 0) {
        const value = queue.shift()
        console.log(value.val)
        if (value.left) {
            queue.push(value.left)
        }
        if (value.right) {
            queue.push(value.right)
        }
    }
}
bfs(root)
// [3,9,20,null,null,15,7],
// function levelOrder(root: TreeNode | null): number[] {
//     let result = []
//     let squeue = [root]
//     while(squeue && squeue.length > 0) {
//         const treeNode = squeue.shift()
//         if(treeNode && treeNode.hasOwnProperty('val')) {
//             result.push(treeNode.val)
//         }
//         if(treeNode && treeNode.left) {
//             squeue.push(treeNode.left)
//         }
//         if(treeNode && treeNode.right) {
//             squeue.push(treeNode.right)
//         }
//     }
//     return result
// };

function premute(nums: number[]): number[][] {
    let result: number[][] = []
    let curr: number[] = []
    let visited: Record<string, number> = {}
    function dfs(index: number) {
        if(index === nums.length) {
            result.push(curr.slice())
            return
        }
        for(let i = 0; i < nums.length; i++) {
            if(!visited[nums[i]]) {
                visited[nums[i]] = 1
                curr.push(nums[i])
                dfs(index + 1)
                curr.pop()
                visited[nums[i]] = 0
            }
            

        }
    }

    dfs(0)

    return result

}
const permute = function(nums: any) {
    // 缓存数组的长度
    const len = nums.length
    // curr 变量用来记录当前的排列内容
    const curr: any = []
    // res 用来记录所有的排列顺序
    const res: any = []
    // visited 用来避免重复使用同一个数字
    const visited: any = {}
    // 定义 dfs 函数，入参是坑位的索引（从 0 计数）
    function dfs(nth: any) {
        // 若遍历到了不存在的坑位（第 len+1 个），则触碰递归边界返回
        if(nth === len) {
            // 此时前 len 个坑位已经填满，将对应的排列记录下来
            res.push(curr.slice())
            return 
        }
        // 检查手里剩下的数字有哪些
        for(let i=0;i<len;i++) {
            // 若 nums[i] 之前没被其它坑位用过，则可以理解为“这个数字剩下了”
            if(!visited[nums[i]]) {
                // 给 nums[i] 打个“已用过”的标
                visited[nums[i]] = 1
                // 将nums[i]推入当前排列
                curr.push(nums[i])
                // 基于这个排列继续往下一个坑走去
                dfs(nth+1) 
                // nums[i]让出当前坑位
                curr.pop()
                // 下掉“已用过”标识
                visited[nums[i]] = 0
            }
        }
    }
    // 从索引为 0 的坑位（也就是第一个坑位）开始 dfs
    dfs(0)
    return res
  };
console.log(premute( [1,2,3]))
export { }