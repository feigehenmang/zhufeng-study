export function cb(callback: (val: string | number) => number) {
  callback("123");
}
// 逆变 当涉及到函数入参时，此时函数主体只接受string，但是cb函数的参数要求可能是string or number，此时如果传入number，会导致函数无法正常执行
cb((val: string) => {
  console.log(val);
});
cb((val: string | number | null) => {
  console.log(val);
  return 123;
});
