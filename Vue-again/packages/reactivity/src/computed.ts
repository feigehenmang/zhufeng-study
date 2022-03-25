import { ReactiveEffect, trackEffects, triggerEffects } from './effect';
import { isObject } from '@vue/shared';
export class ComputedImpl {
    effect
    _dirty = true
    _value
    dep = new Set
    constructor(public getter, public setter) {
        const callback = () => {
            // console.log(1)
            trackEffects(this.dep)
            if (!this._dirty) {
                this._dirty = true
            }
        }
        this.effect = new ReactiveEffect(getter, callback)
        // this._value = this.effect.run()
    }
    // 在此时总共有两个effect
    // 一个是computed 一个是获取value值得
    // 我们要给他俩确立关联关系
    // 即 获取value值的effect要存储effect
    // computed的effect的schedule 要在value值变化时触发
    get value() {
        triggerEffects(this.dep)
        if (this._dirty) {
            this._value = this.effect.run()
            this._dirty = false
        }
        return this._value
    }

    set value(v) {
        this.setter(this._value)
    }
}
export function computed(getterOrOptions) {
    let getter = getterOrOptions
    let setter = () => { }
    if (isObject(getterOrOptions)) {
        getter = getter.get
        setter = getter.set
    }
    return new ComputedImpl(getter, setter)
}