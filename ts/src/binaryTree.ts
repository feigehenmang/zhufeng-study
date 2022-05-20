// 二叉树
export class TreeNode {
    left: TreeNode | undefined
    right: TreeNode | undefined
    constructor(public val: any) {

    }
}

// 给定一个二叉树，返回它的前序（先序）遍历序列。
// 输入: [1,null,2,3]
// 输出: [1,2,3]

function preorderTraversal(treeNode: TreeNode) {
    let result = []
    let stack = [treeNode]
    while (stack.length > 0) {
        let value = stack.pop()
        result.push(value!.val)
        if (value?.left) {
            stack.push(value.left)
        }
        if (value?.right) {
            stack.push(value.right)
        }
    }
    return result
}
// [1,null,2,3]
const tree = new TreeNode(1)
tree.right = new TreeNode(2)
tree.right.left = new TreeNode(3)
// console.log(tree)
// console.log(preorderTraversal(tree))
function postorderTraversal(treeNode: TreeNode) {
    let result = []
    let stack = [treeNode]
    while (stack.length > 0) {
        const value = stack.pop()
        result.unshift(value?.val)
        if (value?.left) {
            stack.push(value.left)
        }
        if (value?.right) {
            stack.push(value.right)
        }
    }
    return result
}
// console.log(postorderTraversal(tree))

// function inorderTraversal(tree: TreeNode|undefined) {
//     let result = []
//     let stack = []
//     let cur = tree
//     while(cur || stack.length) {
//         while(cur) {
//             stack.push(cur)
//             cur != cur.left
//         }

//         cur = stack.pop()
//         result.push(cur?.val)
//         cur = cur?.right
//     }
//     return result
// }

// const inorderTraversal = function (root) {
//     // 定义结果数组
//     const res = []
//     // 初始化栈结构
//     const stack = []
//     // 用一个 cur 结点充当游标
//     let cur = root
//     // 当 cur 不为空、或者 stack 不为空时，重复以下逻辑
//     while (cur || stack.length) {
//         // 这个 while 的作用是把寻找最左叶子结点的过程中，途径的所有结点都记录下来 
//         while (cur) {
//             // 将途径的结点入栈
//             stack.push(cur)
//             // 继续搜索当前结点的左孩子
//             cur = cur.left
//         }
//         // 取出栈顶元素
//         cur = stack.pop()
//         // 将栈顶元素入栈
//         res.push(cur.val)
//         // 尝试读取 cur 结点的右孩子
//         cur = cur.right
//     }
//     // 返回结果数组
//     return res
// };
// console.log(inorderTraversal(tree))
// 层序遍历
function levelOrderTraversal(tree: TreeNode) {
    const res = []
    const stack = []
    stack.push(tree)
    while (stack.length) {
        let lever = []
        let len = stack.length
        for (let i = 0; i < len; i++) {
            let val = stack.shift()
            lever.push(val?.val)
            if (val?.left) {
                stack.push(val.left)
            }
            if (val?.right) {
                stack.push(val.right)
            }
        }
        res.push(lever)
    }
    return res
}
const tree2 = new TreeNode(3)
tree2.left = new TreeNode(9)
tree2.right = new TreeNode(20)
tree2.right.left = new TreeNode(15)
tree2.right.right = new TreeNode(7)
// console.log(levelOrderTraversal(tree2))

function invertTree(tree: TreeNode | undefined) {
    if (!tree) {
        return tree
    }

    const left = invertTree(tree.left)
    const right = invertTree(tree.right)
    tree.left = right
    tree.right = left
    return tree
}

const tree3 = new TreeNode(4)
tree3.left = new TreeNode(2)
tree3.right = new TreeNode(7)
tree3.right.left = new TreeNode(6)
tree3.right.right = new TreeNode(9)
tree3.left.left = new TreeNode(1)
tree3.left.right = new TreeNode(3)
// console.log(invertTree(tree3))
export { }