(function () {
    'use strict';

    // 二叉树
    class TreeNode {
        constructor(val) {
            this.val = val;
        }
    }
    // [1,null,2,3]
    const tree = new TreeNode(1);
    tree.right = new TreeNode(2);
    tree.right.left = new TreeNode(3);
    const tree2 = new TreeNode(3);
    tree2.left = new TreeNode(9);
    tree2.right = new TreeNode(20);
    tree2.right.left = new TreeNode(15);
    tree2.right.right = new TreeNode(7);
    const tree3 = new TreeNode(4);
    tree3.left = new TreeNode(2);
    tree3.right = new TreeNode(7);
    tree3.right.left = new TreeNode(6);
    tree3.right.right = new TreeNode(9);
    tree3.left.left = new TreeNode(1);
    tree3.left.right = new TreeNode(3);

    // 二叉搜索树 BST binary search tree
    const tree1 = new TreeNode(6);
    tree1.left = new TreeNode(3);
    tree1.right = new TreeNode(8);
    tree1.right.left = new TreeNode(7);
    tree1.right.right = new TreeNode(9);
    tree1.left.left = new TreeNode(1);
    tree1.left.right = new TreeNode(4);
    function search(root, n) {
        let stack = [root];
        while (stack.length) {
            let value = stack.shift();
            if ((value === null || value === void 0 ? void 0 : value.val) === n) {
                return value;
            }
            if ((value === null || value === void 0 ? void 0 : value.right) && (value === null || value === void 0 ? void 0 : value.val) < n) {
                stack.push(value.right);
            }
            if ((value === null || value === void 0 ? void 0 : value.left) && value.val > n) {
                stack.push(value.left);
            }
        }
    }
    function searchDeep(root, n) {
        // 若 root 为空，查找失败，直接返回
        if (!root) {
            return;
        }
        // 找到目标结点，输出结点对象
        if (root.val === n) {
            // console.log('目标结点是：', root)
            return root;
        }
        else if ((root === null || root === void 0 ? void 0 : root.left) && root.val > n) {
            // 当前结点数据域大于n，向左查找
            return searchDeep(root.left, n);
        }
        else {
            // 当前结点数据域小于n，向右查找
            return root.right && searchDeep(root.right, n);
        }
    }
    console.log(search(tree1, 3));
    console.log(searchDeep(tree1, 9));

})();
//# sourceMappingURL=bundle.js.map
