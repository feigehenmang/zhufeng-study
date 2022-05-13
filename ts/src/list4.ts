import { ListNode, createList } from './list2'

// 环形链表
let list1 = createList([1,2,3,4,5])
let next1 = list1.next?.next?.next?.next
// console.log(next1)
next1!.next = list1
console.log(list1)

function hasCycle(head: ListNode) {
    while(head) {
        if((head as any).isCycle) {
            return true
        } else {
            (head as any).isCycle = true
            head != head.next
        }
    }
}
console.log(hasCycle(list1))
export {}