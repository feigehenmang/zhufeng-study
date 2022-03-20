import { isObject } from "@vue/shared";
import {
  activeEffect,
  ActiveEffect,
  trackEffects,
  triggerEffects,
} from "./effect";
class ComputedRefImpl {
  _dirty = true;
  _value;
  effect;
  dep = new Set();
  constructor(public getter, public setter) {
    // 此时调用ActiveEffect 是为了执行getter方法，使effect收集依赖，有哪些对象的属性变化之后触发effect
    this.effect = new ActiveEffect(getter, () => {
      // 一旦getter中涉及到的值发生变化了 就会触发scheduler这个时候将dirty设为true 并执行
      if (!this._dirty) {
        this._dirty = true;
        // dep 中存储的是和计算属性value相关的effect 所以要批量执行
        triggerEffects(this.dep);
      }
    });
  }

  get value() {
    //   get时 要将当前activeEffect存储到dep中
    if (activeEffect) {
      // 将当前的effect存储到dep中
      trackEffects(this.dep);
    }
    if (this._dirty) {
      this._dirty = false;
      this._value = this.effect.run();
    }
    return this._value;
  }
  set value(v) {
    this.setter(v);
  }
}

export function computed(getterOrOptions) {
  let getter = getterOrOptions;
  let setter = () => {};
  if (isObject(getterOrOptions)) {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  return new ComputedRefImpl(getter, setter);
}
