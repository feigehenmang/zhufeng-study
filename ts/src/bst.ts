// 二叉搜索树 BST binary search tree
import { TreeNode } from "./binaryTree"
const tree1 = new TreeNode(6)
tree1.left = new TreeNode(3)
tree1.right = new TreeNode(8)
tree1.right.left = new TreeNode(7)
tree1.right.right = new TreeNode(9)
tree1.left.left = new TreeNode(1)
tree1.left.right = new TreeNode(4)
function search(root: TreeNode, n: number) {
    let stack = [root]
    while (stack.length) {
        let value = stack.shift()
        if (value?.val === n) {
            return value
        }
        if (value?.right && value?.val < n) {
            stack.push(value.right)
        }

        if (value?.left && value.val > n) {
            stack.push(value.left)
        }
    }
}

function searchDeep(root: TreeNode, n: number): any {
    // 若 root 为空，查找失败，直接返回
    if (!root) {
        return
    }
    // 找到目标结点，输出结点对象
    if (root.val === n) {
        // console.log('目标结点是：', root)
        return root
    } else if (root?.left && root.val > n) {
        // 当前结点数据域大于n，向左查找
        return searchDeep(root.left, n)
    } else {
        // 当前结点数据域小于n，向右查找
        return root.right && searchDeep(root.right, n)
    }
}
console.log(search(tree1, 3))
console.log(searchDeep(tree1, 9))

export { }