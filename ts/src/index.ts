// debugger;
let a: string = "1";

// document 内置类型  下载文件中
const enum Stats {
  active,
  unActive,
}

const state = 0;
console.log(Stats.active);
if (state == Stats.active) {
  console.log(1);
}

interface IFruit {
  name?: string;
  color: string;
  age: number;
}

type Partial<T> = {
  [key in keyof T]?: T[key];
};
type Required<T> = {
  [key in keyof T]-?: T[key];
};
type Readonly<T> = {
  readonly [key in keyof T]: T[key];
};
type IFruitParital = Partial<IFruit>;
type IFruitRequired = Required<IFruit>;
type IFruitReadonly = Readonly<IFruit>;
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
type PickType = Pick<IO, "name" | "age">;
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type OmitType = Omit<IO, "name" | "age">;
export {};
