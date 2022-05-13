(function () {
    'use strict';

    // 链表操作
    class ListNode {
    }
    const list1$1 = new ListNode();
    list1$1.value = 1;
    list1$1.next = new ListNode();
    list1$1.next.value = 2;
    list1$1.next.next = new ListNode();
    list1$1.next.next.value = 4;
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
        while (values[0]) {
            curr.value = values[0];
            values.shift();
            if (values[0]) {
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
    createList([1, 2, 3, 4, 5, 6, 7, 8]);

    var _a, _b, _c;
    // 环形链表
    let list1 = createList([1, 2, 3, 4, 5]);
    let next1 = (_c = (_b = (_a = list1.next) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.next) === null || _c === void 0 ? void 0 : _c.next;
    // console.log(next1)
    next1.next = list1;
    console.log(list1);
    function hasCycle(head) {
        while (head) {
            if (head.isCycle) {
                return true;
            }
            else {
                head.isCycle = true;
                head != head.next;
            }
        }
    }
    console.log(hasCycle(list1));

})();
//# sourceMappingURL=bundle.js.map
