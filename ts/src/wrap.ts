// 装包拆包
type IProxy<T> = {
  get(): T;
  set(v: T): boolean;
};
type IProxify<T> = {
  [k in keyof T]: IProxy<T[k]>;
};
export function proxify<T>(obj: T): IProxify<T> {
  let r = {} as IProxify<T>;
  for (let key in obj) {
    let val = obj[key];
    r[key] = {
      get() {
        return val;
      },
      set(v) {
        val = v;
        return true;
      },
    };
  }
  return r;
}
let obj = {
  name: "test",
  age: 18,
};
let o = proxify(obj);
// IProxify<{
//     name: string;
//     age: number;
// }>
console.log(o.name.get());
// TODO unProxify
