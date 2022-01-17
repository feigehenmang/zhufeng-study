class ListNode {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

const list = new ListNode(1)
list.node = new ListNode(2)
list.node.next = new ListNode(3)