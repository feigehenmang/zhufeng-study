// 链表操作

export class ListNode {
    value?: any
    next?: ListNode
}

const list1 = new ListNode()
list1.value = 1
list1.next = new ListNode()
list1.next.value = 2
list1.next.next = new ListNode()
list1.next.next.value = 4

const list2 = new ListNode()
list2.value = 1
list2.next = new ListNode()
list2.next.value = 3
list2.next.next = new ListNode()
list2.next.next.value = 4
// console.log(list1, list2)
// console.log(mergeList(list1, list2))
// 单向链表的合并
function mergeList(l1?: ListNode, l2?: ListNode): ListNode {
    const r = new ListNode()
    let cur = r
    while(l1 && l2) {
        // console.log(l1, l2)
        if(l1.value >= l2.value) {
            cur.next = l2
            l2 = l2.next
        } else {
            cur.next = l1
            l1 = l1.next
        }
        cur = cur.next
    }
    // console.log(l1, l2)
    cur.next = l1?.next ? l1 : l2
    return r
}

const list3 = new ListNode()
list3.value = 1
list3.next = new ListNode()
list3.next.value = 1
list3.next.next = new ListNode()
list3.next.next.value = 1
list3.next.next.next = new ListNode()
list3.next.next.next.value = 3

function deleteListNode(list: ListNode) {
    let cur = list
    while(cur && cur.next) {
        // console.log(cur)
        if(cur.value === cur.next.value) {
            cur.next = cur.next.next
        } else {
            if(cur.next) {
                cur = cur.next
            }
        }
    }
    return list
}
// console.log(JSON.stringify(list3))
// console.log(JSON.stringify(deleteListNode(list3)))
function deleteDuplicates(list: ListNode) {
    if(!list || !list.next) {
        return list
    }
    const dummy = new ListNode()
    dummy.next = list
    let cur = dummy
    while(cur.next && cur.next.next) {
        if(cur.next.value === cur.next.next.value) {
            let val = cur.next.value
            while(cur.next && cur.next.value === val) {
                cur.next = cur.next.next
            }
        } else {
            cur = cur.next
        }
    }
    return dummy.next
}
export function createList(values: any[]) {
    let list = new ListNode()
    let curr = list
    while(values[0]) {
        curr.value = values[0]
        values.shift()
        if(values[0]) {
            curr.next = new ListNode()
            curr = curr.next
        }
    }
    return list
}
const list4 = createList([1,1,2,2,3,4,5])
// console.log(list4)
// console.log(deleteDuplicates(list4))

// 删除指定节点
const list5 = createList([1,2,3,4,5])

function deleteIndex(list: ListNode, i: number) {
    let cur = list, index = 0
    while(cur && cur.next) {
        index++
        cur = cur.next
    }
    const deleteIndex = index - i
    let repeateCurr = list, jndex = 0
    while(repeateCurr && repeateCurr.next) {
        if(++jndex === deleteIndex) {
            if(repeateCurr.next.next) {
                repeateCurr.next = repeateCurr.next.next
            }
        } else {
            repeateCurr = repeateCurr.next
        }
    }
    return list
}
function deleteIndex2(list: ListNode, n: number) {
    let dummy = new ListNode(), i = 0
    dummy.next = list
    let slow = dummy.next, fast = dummy.next
    while(slow && slow.next && fast && fast.next) {
        if(++i > n) {
            slow = slow.next
        }
        fast = fast.next
    }
    // console.log(slow, fast)
    slow.next = slow?.next?.next
    return dummy.next
}
// console.log(deleteIndex2(list5, 2))

let list6 = createList([1,2,3,4,5,6,7,8])
function reverseList(list: ListNode) {
    let cur = list
    let prev;
    while(cur != null) {
        let next = cur.next
        cur.next = prev
        prev = cur
        cur != next
    } 
    return prev
}
// console.log(reverseList(list6))


export {}