// debugger;
let a: string = "1";

// document 内置类型  下载文件中
const enum Stats {
  active,
  unActive,
}

const state = 0;
// console.log(Stats.active);
if (state == Stats.active) {
  // console.log(1);
}

interface IFruit {
  name?: string;
  color: string;
  age: number;
}
// 必选参数变可选参数
type Partial<T> = {
  [key in keyof T]?: T[key];
};
// 可选参数变必选参数
// type Required<T> = {
//   [key in keyof T]-?: T[key];
// };
type Readonly<T> = {
  readonly [key in keyof T]: T[key];
};
type IFruitParital = Partial<IFruit>;
type IFruitRequired = Required<IFruit>;
// 必选参数 可选参数 变只读参数
type IFruitReadonly = Readonly<IFruit>;

interface IOb {
  name?: string;
  age?: number;
}

type IOType = Readonly<IOb>

// 递归变可选参数
type DeepParital<T> = {
  [key in keyof T]?: T[key] extends object ? DeepParital<T[key]> : T[key];
};

interface ParentIfo {
  info: {
    num: number;
    age: number;
  };
}

type DeepParitalType = DeepParital<ParentIfo>;
let b: DeepParitalType = {
  info: {
    num: 13,
  },
};

interface IO {
  name: string;
  age: number;
  gender: string;
}
type Pick<T, K extends keyof T> = {
  [key in K]: T[key];
};
// 取出对应属性组成新对象
type PickType = Pick<IO, "name" | "age">;
// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// 排除对应属性 留下的组成新对象
type OmitType = Omit<IO, "name" | "age">;
// Record 返回新对象，传入的第一个参数为key 第二个参数为类型
type RecodeType = Partial<Record<"name", string>>
import { mySetInterVal } from './clear'
import { fib, fibCache, fibLoop } from './fibSeq2';
let date = Date.now()
// const { start, clear } = mySetInterVal(() => {
//   console.log('timers', Date.now() - date)
// }, 1000, 1000)
// start()

// setTimeout(() => {
//   clear()
// }, 2000)


import { ArrayDeepFlat } from './flat'
import { mergeArr } from './mergeArr';
// console.log(ArrayDeepFlat([1, 2, 3, [2, 3, [2, 2]], [1, 2]]))

// console.log(mergeArr([[1, 2, 4], [2, 3, 7], [3, 5, 7], [4, 5, 8]]))
// 1、1、2、3、5、8、13、21、34
// let d = Date.now()
// console.log((d = Date.now()))
console.log(fibLoop(30))
// console.log(Date.now() -d)
export { };
