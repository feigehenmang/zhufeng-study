// 类型运算符
// if
type iIf = 1 extends 1 ? true : false;

// type iEven<T extends number> = T extends 2 ? true : false
type isTwo<T> = T extends 2 ? true : false;
const bol: isTwo<2> = true;

// infer 推导
type FirstEl<T extends unknown[]> = T extends [infer First, ...infer Other]
  ? First
  : never;
const el: FirstEl<[1]> = 1;

// 联合类型
type union = 1 | 2 | 3;
type u = 1 extends union ? true : false;

type union2 = { name: string } | { age: number };
let b = { name: "123", age: 13 };
let u2: union2 = { name: "123", age: 13 };
// 交叉类型
type union3 = { name: string } & { age: number };
// u2.name

// 循环
type Loop<T> = {
  [key in keyof T]: T[key];
};
type keyofTest = keyof ({ name: string } & { age: number });
// keyof 取出联合类型
// in 便利
// T[key] 取出对应类型
const lp: Loop<union3> = { name: "", age: 13 };

// 模式匹配
// Typescript 类型的模式匹配是通过 extends 对类型参数做匹配，
// 结果保存到通过 infer 声明的局部类型变量里，
// 如果匹配就能从该局部变量里拿到提取出的类型。
type GetValue<T> = T extends Promise<infer Value> ? Value : never;
let pV: GetValue<Promise<undefined>>;
// 模式匹配针对数组
type getArrFirst<T extends unknown[]> = T extends [infer First, ...unknown[]]
  ? First
  : never;
type getArrLast<T extends unknown[]> = T extends [...unknown[], infer Last]
  ? Last
  : never;
type getArrExcludeFirst<T extends unknown[]> = T extends [
  unknown,
  ...infer ExcludeType
]
  ? ExcludeType
  : never;
type getArrExcludeLast<T extends unknown[]> = T extends [
  ...infer ExcludeType,
  unknown
]
  ? ExcludeType
  : never;
let f1: getArrFirst<["1", 2, 3]>; // f1: '1'
let l1: getArrLast<["1", 2, 3]>; // l1: 3
let o1: getArrExcludeFirst<[1, 2, 3]>; // o1: [2,3]
let o2: getArrExcludeLast<[1, 2, 3]>; // o1: [1,2]
// 模式匹配 针对字符串
type startsWith<T extends string, Prefix extends string> = Prefix extends ""
  ? false
  : T extends `${Prefix}${string}`
  ? true
  : false;

type ReplaceStr<
  T extends string,
  From extends string,
  To extends string
> = T extends `${infer Prefix}${From}${infer affix}`
  ? `${Prefix}${To}${affix}`
  : never;
type TrimRight<T extends string> = T extends `${infer S}${" " | "\n" | "\t"}`
  ? TrimRight<S>
  : T;
type TrimLeft<T extends string> = T extends `${" " | "\t" | "\n"}${infer S}`
  ? TrimLeft<S>
  : T;
type Trim<T extends string> = TrimLeft<TrimRight<T>>;
let s1: startsWith<"123", "">;
let s2: ReplaceStr<"hello!", "!", "1">;
let s3: TrimRight<"he\n\t ">;
let s4: TrimLeft<"   he">;

type getParamType<T extends Function> = T extends (...args: infer Args) => any
  ? Args
  : never;

let fn1: getParamType<(a: number) => void>;

// 取函数返回值

type getReturnType<T> = T extends (...args: any[]) => infer ReturnType
  ? ReturnType
  : never;
// interface iGetSchool {
//   (name: string, age: number, address: string): any;
// }
export function getSchool(name: string, age: number, address: string) {
  return {
    name,
    age,
    address,
  };
}
type SchoolType = getReturnType<typeof getSchool>;
export class Person {}
export type InstanceType1<T> = T extends new (...args: any[]) => infer R
  ? R
  : never;
type iP = InstanceType1<typeof Person>;

// 元祖转换成联合类型
type TupleToUnion<T extends { [key in number]: any }> = T[number];
type u3 = TupleToUnion<[string, number]>;
// 联合类型转元祖 未完成
type UnionToTuple<T> = T extends Array<infer R> ? R : never;

type t3 = UnionToTuple<string | number>;

// unknown

type x = unknown | number;
type t = unknown & number;
