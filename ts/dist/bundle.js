(function () {
    'use strict';

    // 链表操作
    class ListNode {
    }
    const list1 = new ListNode();
    list1.value = 1;
    list1.next = new ListNode();
    list1.next.value = 2;
    list1.next.next = new ListNode();
    list1.next.next.value = 4;
    const list2 = new ListNode();
    list2.value = 1;
    list2.next = new ListNode();
    list2.next.value = 3;
    list2.next.next = new ListNode();
    list2.next.next.value = 4;
    const list3 = new ListNode();
    list3.value = 1;
    list3.next = new ListNode();
    list3.next.value = 1;
    list3.next.next = new ListNode();
    list3.next.next.value = 1;
    list3.next.next.next = new ListNode();
    list3.next.next.next.value = 3;
    function createList(values) {
        let list = new ListNode();
        let curr = list;
        while (values.length > 0) {
            curr.value = values[0];
            values.shift();
            if (values.length > 0) {
                curr.next = new ListNode();
                curr = curr.next;
            }
        }
        return list;
    }
    createList([1, 1, 2, 2, 3, 4, 5]);
    // console.log(list4)
    // console.log(deleteDuplicates(list4))
    // 删除指定节点
    createList([1, 2, 3, 4, 5]);
    // console.log(deleteIndex2(list5, 2))
    let list6 = createList([1, 2, 3, 4, 5, 6, 7, 8]);
    function reverseList(list) {
        let cur = list;
        let prev;
        while (cur != null) {
            cur.next;
            cur.next = prev;
            prev = cur;
        }
        return prev;
    }
    console.log(reverseList(list6));

})();
//# sourceMappingURL=bundle.js.map
