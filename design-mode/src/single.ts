function createSignle(fn: any) {
  let instance: any;
  return function (this: any, ...args: any[]) {
    // console.log(instance);
    // if (!instance) {
    //   instance = fn.apply(this, args);
    // }
    // return instance;
    return instance || (instance = fn.apply(this, args));
  };
}

const app = document.getElementById("#app");
const createDiv = createSignle(() => {
  const div = document.createElement("div");
  div.innerHTML = "test";
  return div;
});
const div1 = createDiv();
const div2 = createDiv();
console.log(div1 === div2);
export {};
