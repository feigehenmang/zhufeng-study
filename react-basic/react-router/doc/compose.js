let promise = (next) => (action) => {
  console.log("promise", next, action);
  next(action);
};
let thunk = (next) => (action) => {
  console.log("thunk", next, action);
  next(action);
};
let logger = (next) => (action) => {
  console.log("logger", next, action);
  next(action);
};
const dispatch = () => {
  console.log("old dispatch");
};

const chain = [promise, thunk, logger];
function compose(...middlewares) {
  return function (args) {
    for (let i = middlewares.length - 1; i >= 0; i--) {
      args = middlewares[i](args);
    }
    return args;
  };
}
const composed = compose(...chain); // 聚合函数 调用返回函数，会将入参作为参数放入最后一个传入的函数中往前执行

console.log("composed", composed);

const newDispatch = composed(dispatch);
console.log("newDispatch", newDispatch);
newDispatch({ type: "test" });
