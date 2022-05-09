const arr = [
  { id: 11, fenlei: 1 },
  { id: 22, fenlei: 1 },
  { id: 33, fenlei: 1 },
  { id: 44, fenlei: 2 },
  { id: 55, fenlei: 2 },
  { id: 66, fenlei: 3 },
  { id: 77, fenlei: 4 },
  { id: 88, fenlei: 4 },
  { id: 99, fenlei: 4 },
  { id: 100, fenlei: 4 },
];
function ReduceArr(arr: Record<string, number>[]) {
  const copyArr = [...arr];
  copyArr.reduce((memo, result, index) => {
    if (memo[result.fenlei] >= 0) {
      copyArr[memo[result.fenlei]].jishu =
        copyArr[memo[result.fenlei]].jishu + 1;
    } else {
      memo[result.fenlei] = index;
      copyArr[index].jishu = 1;
      copyArr[index].index = Object.keys(memo).length;
    }
    return memo;
  }, {});
  return copyArr;
}

console.log(ReduceArr(arr));
