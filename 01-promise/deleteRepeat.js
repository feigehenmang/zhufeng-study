const tree = {
    value: 0,
    next: {
        value: 1,
        next: {
            value: 1,
            next: {
                value: 2,
                next: {
                    value: 2,
                    next: {
                        value: 3,
                        next: {
                            value: 4
                        }
                    }
                }
            }
        }
    }
}
console.log(deletaRepeat(tree))
function deletaRepeat(queue) {
    let currHead = queue
    while (currHead.next) {
        if (currHead.value === currHead.next.value) {
            currHead.next = currHead.next.next
        } else {
            currHead = currHead.next
        }
    }
    // console.log(JSON.stringify(queue))
    return queue
}

class ListNode {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

