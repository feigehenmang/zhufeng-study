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
const matchName = (filename) => filename.match(/\/(\w+)/);
const reducer = Object.keys(reducerModule).reduce((memo, reducerKey) => {
  const match = matchName(reducerKey); // 将文件名称中的name检索出来
  if (match) {
    const key = match[1];
    memo[key] = reducerModule[reducerKey].default; // 取出分reducer函数
  }
  return memo;
}, {});
export function addReducer(key, value) {
  reducer[key] = value
}
export default reducer;
