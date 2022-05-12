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
    // console.log(list1, list2)
    console.log(mergeList(list1, list2));
    // 单向链表的合并
    function mergeList(l1, l2) {
        const r = new ListNode();
        let cur = r;
        while (l1 && l2) {
            // console.log(l1, l2)
            if (l1.value >= l2.value) {
                cur.next = l2;
                l2 = l2.next;
            }
            else {
                cur.next = l1;
                l1 = l1.next;
            }
            cur = cur.next;
        }
        // console.log(l1, l2)
        cur.next = (l1 === null || l1 === void 0 ? void 0 : l1.next) ? l1 : l2;
        return r;
    }

})();
//# sourceMappingURL=bundle.js.map
