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
function afterOrderLoop(node) {
    if (!node) {
        return
    }
    afterOrderLoop(node.left)
    afterOrderLoop(node.right)
    console.log(node.val)
}
console.log(afterOrderLoop(root))