// 先序遍历
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
function preorder(tree: Tree) {
    if (!tree) return
    console.log('curr: ', tree.val)
    tree.left && preorder(tree.left)
    tree.right && preorder(tree.right)

}
function inorder(tree: Tree) {
    if(!tree) return
    tree.left && inorder(tree.left)
    console.log('inorder-curr: :', tree.val)
    tree.right && inorder(tree.right)
}

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

console.log(getIndexs(nums, 9))