export let activeEffect
export class ReactiveEffect {
    parent
    deps = new Set
    active = true
    constructor(public fn, public scheduler) {

    }

    run() {
        if (!this.active) return this.fn()
        try {
            this.parent = activeEffect
            activeEffect = this
            return this.fn()
        } finally {
            activeEffect = this.parent
            this.parent = null
        }
    }

    stop() {
        this.active = false
    }
}
export function effect(fn, options: any = {}) {
    const _effect = new ReactiveEffect(fn, (options.scheduler))
    _effect.run()
    const runner = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
}

const targetMap = new Map()
export function track(target, key) {
    // Map {target: Map{key: Set<activeEffect>}}
    let objMap = targetMap.get(target)
    if (!objMap) {
        targetMap.set(target, (objMap = new Map()))
    }
    let keyMap = objMap.get(key)
    if (!keyMap) {
        objMap.set(key, (keyMap = new Set))
    }
    trackEffects(keyMap)
}
export function trackEffects(keyMap) {
    const shouldTrack = !keyMap.has(activeEffect)
    if (shouldTrack && activeEffect) {
        keyMap.add(activeEffect)
        activeEffect.deps.add(keyMap)
    }
}

export function trigger(target, key) {
    const objMap = targetMap.get(target)
    if (objMap) {
        const keySet = objMap.get(key)
        triggerEffects(keySet)
    }
}

export function triggerEffects(keySet) {
    if (keySet) {
        keySet.forEach((effect) => {
            // 当前effect中触发修改了同一effect 
            if(effect !== activeEffect) {

                if(effect.scheduler) {
                    effect.scheduler()
                } else {
                    effect.run()
                }
            }
        })
    }
}