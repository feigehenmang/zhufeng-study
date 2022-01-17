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
function loopLibraryTree(node) {
    if (!node) return
    console.log(node.val)
    loopLibraryTree(node.left)
    loopLibraryTree(node.right)
}
loopLibraryTree(root)