(function () {
  'use strict';

  function createSignle(fn) {
      let instance;
      return function (...args) {
          // console.log(instance);
          // if (!instance) {
          //   instance = fn.apply(this, args);
          // }
          // return instance;
          return instance || (instance = fn.apply(this, args));
      };
  }
  document.getElementById("#app");
  const createDiv = createSignle(() => {
      const div = document.createElement("div");
      div.innerHTML = "test";
      return div;
  });
  const div1 = createDiv();
  const div2 = createDiv();
  console.log(div1 === div2);

})();
//# sourceMappingURL=bundle.js.map
