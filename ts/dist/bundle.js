(function () {
    'use strict';

    function fibLoop(n) {
        let f0 = 0, f1 = 1, cur = 0;
        for (let i = 0; i < n; i++) {
            cur = f0 + f1;
            f0 = f1;
            f1 = cur;
        }
        return cur;
    }
    // console.log(fib(5))

    // debugger;
    // console.log(ArrayDeepFlat([1, 2, 3, [2, 3, [2, 2]], [1, 2]]))
    // console.log(mergeArr([[1, 2, 4], [2, 3, 7], [3, 5, 7], [4, 5, 8]]))
    // 1、1、2、3、5、8、13、21、34
    // let d = Date.now()
    // console.log((d = Date.now()))
    console.log(fibLoop(30));

})();
//# sourceMappingURL=bundle.js.map
