import { track, trigger } from "./effect";
import { isObject } from "@vue/shared/";

export let cache = new WeakMap();
export const enum TypeEnum {
  ISReactive = "__is__reactive",
}
const mutableHandlers = {
  get(target, key, recevie) {
    if (key === TypeEnum.ISReactive) {
      return true;
    }
    const res = Reflect.get(target, key, recevie);
    track(target, "get", key);
    if (isObject(res)) {
      return reactive(res);
    }
    return res;
  },
  set(target, key, value, recevie) {
    const oldValue = target[key];
    const res = Reflect.set(target, key, value, recevie);
    if (oldValue !== value) {
      trigger(target, "set", key);
    }
    return res;
  },
};

export function reactive(v) {
  const exitProxy = cache.get(v);
  if (exitProxy) {
    return exitProxy;
  }

  if (v[TypeEnum.ISReactive]) {
    return v;
  }

  const proxy = new Proxy(v, mutableHandlers);

  cache.set(v, proxy);
  return proxy;
}
