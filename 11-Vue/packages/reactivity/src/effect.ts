// 这个函数用与  当要重新收集一个effect的依赖时， 清空这个effect上关于当前effect的记录
function cleanupEffect(effect) {
  const effects = effect.deps;
  for (let index = 0; index < effects.length; index++) {
    effects[index].delete(effect);
  }
  effect.deps.length = 0;
}
export let activeEffect = undefined;
export class ActiveEffect {
  active = true;
  parent = undefined;
  deps = []; // Set[activeEffect] deps中存储了涉及到当前effect的属性
  constructor(public fn, public scheduler) { }
  run() {
    if (!this.active) {
      return this.fn();
    }
    try {
      // 这一步主要是为了在effect嵌套情况下，存储上一次activeEffect
      this.parent = activeEffect;
      activeEffect = this;
      cleanupEffect(activeEffect);
      return this.fn();
    } finally {
      // 在当前effect执行完成之后再将activeEffect指向回activeEffect
      activeEffect = this.parent;
      this.parent = undefined;
    }
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      this.active = false;
    }
  }
}

export function effect(cb, options: any = {}) {
  // console.log(options);
  const effectInstance = new ActiveEffect(cb, options.scheduler);
  effectInstance.run();

  const runner = effectInstance.run.bind(effectInstance);
  runner.effect = effectInstance;
  return runner;
}

const targetMap = new WeakMap();
// targetMap的格式
// {对象: {key: Set[activeEffect]}}
export function track(target, type, key) {
  if (activeEffect) {
    // 获取对应对象的Map对象
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      // Map对象不存在则创建map并存储
      targetMap.set(target, (depsMap = new Map()));
    }
    // 通过属性之获取set
    let effectSet = depsMap.get(key);
    if (!effectSet) {
      // Set不存在则创建set并存储
      depsMap.set(key, (effectSet = new Set()));
    }
    trackEffects(effectSet);
  }
}
export function trackEffects(effectSet) {
  // 性能优化点 虽然set可以去重，但是如果明知道是重复的，还往里面加不行
  let shouldTrack = !effectSet.has(activeEffect);
  if (shouldTrack) {
    // 将当前活动的effect放入缓存
    effectSet.add(activeEffect);
    activeEffect.deps.push(effectSet); // 当前活动的effect涉及到了那些属性，都收集到deps中
  }
}

export function trigger(target, type, key) {
  const map = targetMap.get(target);
  if (map) {
    let effects = map.get(key);
    triggerEffects(effects);
  }
}

export function triggerEffects(effects) {
  effects = new Set(effects);
  effects &&
    effects.forEach((effect) => {
      // console.log(effect === activeEffect);
      // 防止effect触发本身effect 无限循环
      if (effect !== activeEffect) {
        if (effect.scheduler) {
          effect.scheduler();
        } else {
          effect.run();
        }
      }
    });
}
