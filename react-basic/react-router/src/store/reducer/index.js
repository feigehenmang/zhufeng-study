const reducerModule = import.meta.globEager("./*.js");
// const reducer = Object.keys(reducerModule).reduce((memo, reducerKey) => {
//   const match = reducerKey.match(/\/(\w+)/);
//   if (match) {
//     const key = match[1];
//     reducerModule[reducerKey]().then((module) => {
//       memo[key] = module.default;
//     });
//   }
//   return memo;
// }, {});
const reducer = Object.keys(reducerModule).reduce((memo, reducerKey) => {
  const match = reducerKey.match(/\/(\w+)/);
  if (match) {
    const key = match[1];
    memo[key] = reducerModule[reducerKey].default;
  }
  return memo;
}, {});
export default reducer;
