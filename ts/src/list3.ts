import { ListNode, createList } from './list2'
let list1 = createList([1,2,3,4,5,6])

function reverseList(list: ListNode, m: number, n: number) {
    let prev, curr, lefeHead
    let dummy = new ListNode()
    dummy.next = list
    let p = dummy
    for(let i = 0; i < m; i++) {
        p.next && (p = p.next)
    }
    // console.log(p)
    lefeHead = p // 反转列表的左边
    let start = lefeHead.next
    prev = start
    curr = prev!.next
    // console.log(prev, curr)
    for(let i = m; i < n; i++) {
        let next: any = curr!.next
        curr!.next = prev
        prev = curr
        curr = next
    }
    // console.log(start)
    // lefeHead.next = prev
    // start!.next = curr
    return dummy.next
    
}
const reverseBetween = function(head, m, n) {
    // 定义pre、cur，用leftHead来承接整个区间的前驱结点
    let pre,cur,leftHead
    // 别忘了用 dummy 嗷
    const dummy = new ListNode()  
    // dummy后继结点是头结点
    dummy.next = head
    // p是一个游标，用于遍历，最初指向 dummy
    let p = dummy  
    // p往前走 m-1 步，走到整个区间的前驱结点处
    for(let i=0;i<m-1;i++){
        p = p.next
    }
    // 缓存这个前驱结点到 leftHead 里
    leftHead = p
    // start 是反转区间的第一个结点
    let start = leftHead.next  
    // pre 指向start
    pre = start
    // cur 指向 start 的下一个结点
    cur = pre.next
    // 开始重复反转动作
    for(let i=m;i<n;i++){
        let next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    //  leftHead 的后继结点此时为反转后的区间的第一个结点
    leftHead.next = pre
    // 将区间内反转后的最后一个结点 next 指向 cur
    start.next=cur
    // dummy.next 永远指向链表头结点
    return dummy.next
};
console.log(reverseBetween(list1, 2, 4))
export { }