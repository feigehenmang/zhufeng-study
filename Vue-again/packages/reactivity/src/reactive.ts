import { track, trigger } from "./effect"

const cachSet = new Set()

export const enum ReactiveFlags {
    isReactive = '__is__reactive'
}
export function reactive(target) {
    if(target[ReactiveFlags.isReactive]) {
        return target
    }
    if(cachSet.has(target)) {
        return target
    }
    cachSet.add(target)

    const proxy = new Proxy(target, {
        get(target, key, receiver){
            if(key === ReactiveFlags.isReactive) {
                return true
            }
            track(target, key)
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
            
            const r = Reflect.set(target, key, value, receiver)
            trigger(target, key)
            return r
        }
    })
    return proxy
}