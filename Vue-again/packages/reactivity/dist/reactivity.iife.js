var VueReactivity = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/reactivity/src/index.ts
  var src_exports = {};
  __export(src_exports, {
    computed: () => computed,
    effect: () => effect,
    reactive: () => reactive
  });

  // packages/reactivity/src/effect.ts
  var activeEffect;
  var ReactiveEffect = class {
    constructor(fn, scheduler) {
      this.fn = fn;
      this.scheduler = scheduler;
      this.deps = /* @__PURE__ */ new Set();
      this.active = true;
    }
    run() {
      if (!this.active)
        return this.fn();
      try {
        this.parent = activeEffect;
        activeEffect = this;
        return this.fn();
      } finally {
        activeEffect = this.parent;
        this.parent = null;
      }
    }
    stop() {
      this.active = false;
    }
  };
  function effect(fn, options = {}) {
    const _effect = new ReactiveEffect(fn, options.scheduler);
    _effect.run();
    const runner = _effect.run.bind(_effect);
    runner.effect = _effect;
    return runner;
  }
  var targetMap = /* @__PURE__ */ new Map();
  function track(target, key) {
    let objMap = targetMap.get(target);
    if (!objMap) {
      targetMap.set(target, objMap = /* @__PURE__ */ new Map());
    }
    let keyMap = objMap.get(key);
    if (!keyMap) {
      objMap.set(key, keyMap = /* @__PURE__ */ new Set());
    }
    trackEffects(keyMap);
  }
  function trackEffects(keyMap) {
    const shouldTrack = !keyMap.has(activeEffect);
    if (shouldTrack && activeEffect) {
      keyMap.add(activeEffect);
      activeEffect.deps.add(keyMap);
    }
  }
  function trigger(target, key) {
    const objMap = targetMap.get(target);
    if (objMap) {
      const keySet = objMap.get(key);
      triggerEffects(keySet);
    }
  }
  function triggerEffects(keySet) {
    if (keySet) {
      keySet.forEach((effect2) => {
        if (effect2 !== activeEffect) {
          if (effect2.scheduler) {
            effect2.scheduler();
          } else {
            effect2.run();
          }
        }
      });
    }
  }

  // packages/reactivity/src/reactive.ts
  var cachSet = /* @__PURE__ */ new Set();
  function reactive(target) {
    if (target["__is__reactive" /* isReactive */]) {
      return target;
    }
    if (cachSet.has(target)) {
      return target;
    }
    cachSet.add(target);
    const proxy = new Proxy(target, {
      get(target2, key, receiver) {
        if (key === "__is__reactive" /* isReactive */) {
          return true;
        }
        track(target2, key);
        return Reflect.get(target2, key, receiver);
      },
      set(target2, key, value, receiver) {
        const r = Reflect.set(target2, key, value, receiver);
        trigger(target2, key);
        return r;
      }
    });
    return proxy;
  }

  // packages/shared/src/index.ts
  function isObject(v) {
    return typeof v === "object" && v != null;
  }

  // packages/reactivity/src/computed.ts
  var ComputedImpl = class {
    constructor(getter, setter) {
      this.getter = getter;
      this.setter = setter;
      this._dirty = true;
      this.dep = /* @__PURE__ */ new Set();
      const callback = () => {
        trackEffects(this.dep);
        if (!this._dirty) {
          this._dirty = true;
        }
      };
      this.effect = new ReactiveEffect(getter, callback);
      this._value = this.effect.run();
    }
    get value() {
      if (this._dirty) {
        this._value = this.effect.run();
        this._dirty = false;
        triggerEffects(this.dep);
      }
      return this._value;
    }
    set value(v) {
      this.setter(this._value);
    }
  };
  function computed(getterOrOptions) {
    let getter = getterOrOptions;
    let setter = () => {
    };
    if (isObject(getterOrOptions)) {
      getter = getter.get;
      setter = getter.set;
    }
    return new ComputedImpl(getter, setter);
  }
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=reactivity.iife.js.map
