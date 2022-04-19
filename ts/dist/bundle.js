(function () {
    'use strict';

    // 斐波那契
    // F(0)=0，F(1)=1, F(n)=F(n - 1)+F(n - 2)
    function fib(n) {
        if (n == 0) {
            return 1;
        }
        if (n < 2) {
            return n;
        }
        return fib(n - 1) + fib(n - 2);
    }

    // debugger;
    // console.log(ArrayDeepFlat([1, 2, 3, [2, 3, [2, 2]], [1, 2]]))
    // console.log(mergeArr([[1, 2, 4], [2, 3, 7], [3, 5, 7], [4, 5, 8]]))
    // 1、1、2、3、5、8、13、21、34
    console.log(fib(9));

})();
//# sourceMappingURL=bundle.js.map
