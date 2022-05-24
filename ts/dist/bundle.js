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
    // console.log(search(tree1, 3))
    // console.log(searchDeep(tree1, 9))
    function insertToBSTTree(root, val) {
        if (!root) {
            // console.log(val);
            root = new TreeNode(val);
            return root;
        }
        if (root.val > val) {
            root.left = insertToBSTTree(root.left, val);
            console.log(root.left);
        }
        if (root.val < val) {
            root.right = insertToBSTTree(root.right, val);
        }
        return root;
    }
    console.log(insertToBSTTree(tree1, 5));

})();
//# sourceMappingURL=bundle.js.map
