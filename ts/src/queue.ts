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
function levelOrder(root: TreeNode | null): number[] {
    let result = []
    let squeue = [root]
    while(squeue && squeue.length > 0) {
        const treeNode = squeue.shift()
        if(treeNode && treeNode.hasOwnProperty('val')) {
            result.push(treeNode.val)
        }
        if(treeNode && treeNode.left) {
            squeue.push(treeNode.left)
        }
        if(treeNode && treeNode.right) {
            squeue.push(treeNode.right)
        }
    }
    return result
};
export { }