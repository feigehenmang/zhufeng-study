import { isObject } from "@vue/shared";
import { ActiveEffect } from "./effect";
import { TypeEnum } from "./reactive";
const tranverse = (obj, set = new Set()) => {
  if (isObject(obj)) {
    if (set.has(obj)) {
      return obj;
    }
    set.add(obj);
    for (const key in obj) {
      return tranverse(obj[key]);
    }
  } else {
    return obj;
  }
};
export function isReactive(v) {
  return !!(v && v[TypeEnum.ISReactive]);
}
export function watch(objOrFn, callback) {
  let getter;
  if (isReactive(objOrFn)) {
    getter = () => {
      // getter 主要是为了收集依赖
      return tranverse(objOrFn);
    };
  } else {
    getter = objOrFn;
  }
  let oldValue;
  let clear;
  let cleanup = (fn) => {
    clear = fn;
  };
  const cb = () => {
    clear && clear();
    const newValue = effect.run();
    callback(newValue, oldValue, cleanup);
    oldValue = newValue;
  };
  const effect = new ActiveEffect(getter, cb);
  oldValue = effect.run();
}
