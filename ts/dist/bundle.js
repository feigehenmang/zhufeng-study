(function () {
    'use strict';

    // 写一个 mySetInterVal(fn, a, b),
    // 每次间隔 a,a+b,a+2b 的时间，
    // 然后写一个 myClear，停止上面的 mySetInterVal
    function mySetInterVal(fn, a, b) {
        let handlerTimer;
        let times = 0;
        const start = () => {
            handlerTimer = setInterval(() => {
                times++;
                fn();
            }, a + times * b);
        };
        return {
            start,
            clear: () => {
                clearInterval(handlerTimer);
            }
        };
    }

    function ArrayDeepFlat(arr) {
        return arr.reduce((value, item) => {
            value = Array.isArray(item) ? value.concat(ArrayDeepFlat(item)) : value.concat(item);
            return value;
        }, []);
    }

    // debugger;
    console.log(0 /* active */);
    {
        console.log(1);
    }
    let date = Date.now();
    const { start, clear } = mySetInterVal(() => {
        console.log('timers', Date.now() - date);
    }, 1000, 1000);
    start();
    setTimeout(() => {
        clear();
    }, 2000);
    console.log(ArrayDeepFlat([1, 2, 3, [2, 3, [2, 2]], [1, 2]]));

})();
//# sourceMappingURL=bundle.js.map
