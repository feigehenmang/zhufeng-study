import { isObject } from "@vue/shared";
import { reactive } from "./reactive";
import { activeEffect, trackEffects, triggerEffects } from "./effect";
const toReactive = (v) => {
  return isObject(v) ? reactive(v) : v;
};
class RefImpl {
  _value;
  dep = new Set();
  __v_isRef = true;
  constructor(public rawValue) {
    this._value = toReactive(rawValue);
  }

  get value() {
    if (activeEffect) {
      // 收集依赖
      trackEffects(this.dep);
    }
    return this._value;
  }
  set value(v) {
    this._value = v;
    //   触发依赖
    triggerEffects(this.dep);
  }
}
export function ref(v) {
  return new RefImpl(v);
}

class ObjectRefImpl {
  public __v_isRef = true;
  constructor(public target, public key) {}
  get value() {
    return this.target[this.key];
  }
  set value(v) {
    this.target[this.key] = v;
  }
}

export function toRef(target, key) {
  return new ObjectRefImpl(target, key);
}

export function toRefs(v) {
  const result = Array.isArray(v) ? [] : {};
  for (const key in v) {
    result[key] = toRef(v, key);
  }
  return result;
}
