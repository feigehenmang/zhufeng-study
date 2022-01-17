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
function middleOrderLoop(node) {
    if (!node) return
    middleOrderLoop(node.left)
    console.log(node.val)
    middleOrderLoop(node.right)
}
middleOrderLoop(root)