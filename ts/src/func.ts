export function cb(callback: (val: string | number) => number | string) {
  callback("123");
}
// 逆变 当涉及到函数入参时，此时函数主体只接受string，但是cb函数的参数要求可能是string or number，此时如果传入number，会导致函数无法正常执行
// 此时 函数的执行在cb函数内部，而cb函数的入参有约束，所以在编写入参函数时需要要求函数的参数类型大于cb的约束
// 外部函数参数约束只能大于内部函数约束
cb((val: string) => {
  console.log(val);
  return "123";
});
// 协变的话 函数的返回值必须继承子内部函数的返回值
// 传父返子
cb((val: string | number | null) => {
  console.log(val);
  return "123";
});
function isNumber(v: number | string): v is number {
  return typeof v === "number";
}
function getValue(v: number | string) {
  if (isNumber(v)) {
    v;
  }
}
