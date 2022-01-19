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
// console.log(removeNnode(tree, 2))
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

// function reverseNode(tree) {
//     let pre = null, curr = tree
//     while (curr) {
//         const next = curr.next
//         curr.next = pre
//         pre = curr
//         curr = next
//     }
//     return pre
// }
console.log(JSON.stringify(reverseNode(tree)))


function reverseNode(tree) {
    let pre = null, curr = tree
    while (curr) {
        const next = curr.next // 取出下个指针并保留
        curr.next = pre // 修改当前项指针到上一项
        pre = curr // 上一项+1
        curr = next // 下一项+1
    }
    return pre
}

// 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
function reverseMtoNNode(tree, m, n) {

}