const tree = {
    value: 0,
    next: {
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: {
                        value: 5,
                        next: {
                            value: 6
                        }
                    }
                }
            }
        }
    }
}
// console.log(deletaRepeat(tree))
// function deletaRepeat(queue) {
//     let currHead = queue
//     while (currHead.next) {
//         if (currHead.value === currHead.next.value) {
//             currHead.next = currHead.next.next
//         } else {
//             currHead = currHead.next
//         }
//     }
//     // console.log(JSON.stringify(queue))
//     return queue
// }

class ListNode {
    constructor(val) {
        this.val = val
        this.next = null
    }
}
console.log(removeNnode(tree, 2))
function removeNnode(queue, n) {
    const dummyNode = new ListNode()
    dummyNode.next = queue
    let start = dummyNode, end = dummyNode
    // let currHead = queue
    let i = 1
    while (i < n) {
        i++
        end = end.next
    }
    while (end.next) {
        start = start.next
        end = end.next
    }
    start.next = start.next.next
    // console.log(JSON.stringify(queue))
    return queue
}
