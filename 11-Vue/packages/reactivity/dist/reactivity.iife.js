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
    reactive: () => reactive,
    ref: () => ref,
    toRef: () => toRef,
    toRefs: () => toRefs,
    watch: () => watch
  });

  // packages/reactivity/src/effect.ts
  function cleanupEffect(effect2) {
    const effects = effect2.deps;
    for (let index = 0; index < effects.length; index++) {
      effects[index].delete(effect2);
    }
    effect2.deps.length = 0;
  }
  var activeEffect = void 0;
  var ActiveEffect = class {
    constructor(fn, scheduler) {
      this.fn = fn;
      this.scheduler = scheduler;
      this.active = true;
      this.parent = void 0;
      this.deps = [];
    }
    run() {
      if (!this.active) {
        return this.fn();
      }
      try {
        this.parent = activeEffect;
        activeEffect = this;
        cleanupEffect(activeEffect);
        return this.fn();
      } finally {
        activeEffect = this.parent;
        this.parent = void 0;
      }
    }
    stop() {
      if (this.active) {
        cleanupEffect(this);
        this.active = false;
      }
    }
  };
  function effect(cb, options = {}) {
    const effectInstance = new ActiveEffect(cb, options.scheduler);
    effectInstance.run();
    const runner = effectInstance.run.bind(effectInstance);
    runner.effect = effectInstance;
    return runner;
  }
  var targetMap = /* @__PURE__ */ new WeakMap();
  function track(target, type, key) {
    if (activeEffect) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      let effectSet = depsMap.get(key);
      if (!effectSet) {
        depsMap.set(key, effectSet = /* @__PURE__ */ new Set());
      }
      trackEffects(effectSet);
    }
  }
  function trackEffects(effectSet) {
    let shouldTrack = !effectSet.has(activeEffect);
    if (shouldTrack) {
      effectSet.add(activeEffect);
      activeEffect.deps.push(effectSet);
    }
  }
  function trigger(target, type, key) {
    const map = targetMap.get(target);
    if (map) {
      let effects = map.get(key);
      triggerEffects(effects);
    }
  }
  function triggerEffects(effects) {
    effects = new Set(effects);
    effects && effects.forEach((effect2) => {
      if (effect2 !== activeEffect) {
        if (effect2.scheduler) {
          effect2.scheduler();
        } else {
          effect2.run();
        }
      }
    });
  }

  // packages/shared/src/is-object.ts
  function isObject(v) {
    return typeof v === "object" && v != null;
  }

  // packages/reactivity/src/reactive.ts
  var cache = /* @__PURE__ */ new WeakMap();
  var mutableHandlers = {
    get(target, key, recevie) {
      if (key === "__is__reactive" /* ISReactive */) {
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
    }
  };
  function reactive(v) {
    const exitProxy = cache.get(v);
    if (exitProxy) {
      return exitProxy;
    }
    if (v["__is__reactive" /* ISReactive */]) {
      return v;
    }
    const proxy = new Proxy(v, mutableHandlers);
    cache.set(v, proxy);
    return proxy;
  }

  // packages/reactivity/src/computed.ts
  var ComputedRefImpl = class {
    constructor(getter, setter) {
      this.getter = getter;
      this.setter = setter;
      this._dirty = true;
      this.dep = /* @__PURE__ */ new Set();
      this.effect = new ActiveEffect(getter, () => {
        if (!this._dirty) {
          this._dirty = true;
          triggerEffects(this.dep);
        }
      });
    }
    get value() {
      if (activeEffect) {
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
  };
  function computed(getterOrOptions) {
    let getter = getterOrOptions;
    let setter = () => {
    };
    if (isObject(getterOrOptions)) {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    return new ComputedRefImpl(getter, setter);
  }

  // packages/reactivity/src/watch.ts
  var tranverse = (obj, set = /* @__PURE__ */ new Set()) => {
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
  function isReactive(v) {
    return !!(v && v["__is__reactive" /* ISReactive */]);
  }
  function watch(objOrFn, callback) {
    let getter;
    if (isReactive(objOrFn)) {
      getter = () => {
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
      const newValue = effect2.run();
      callback(newValue, oldValue, cleanup);
      oldValue = newValue;
    };
    const effect2 = new ActiveEffect(getter, cb);
    oldValue = effect2.run();
  }

  // packages/reactivity/src/ref.ts
  var toReactive = (v) => {
    return isObject(v) ? reactive(v) : v;
  };
  var RefImpl = class {
    constructor(rawValue) {
      this.rawValue = rawValue;
      this.dep = /* @__PURE__ */ new Set();
      this.__v_isRef = true;
      this._value = toReactive(rawValue);
    }
    get value() {
      if (activeEffect) {
        trackEffects(this.dep);
      }
      return this._value;
    }
    set value(v) {
      this._value = v;
      triggerEffects(this.dep);
    }
  };
  function ref(v) {
    return new RefImpl(v);
  }
  var ObjectRefImpl = class {
    constructor(target, key) {
      this.target = target;
      this.key = key;
      this.__v_isRef = true;
    }
    get value() {
      return this.target[this.key];
    }
    set value(v) {
      this.target[this.key] = v;
    }
  };
  function toRef(target, key) {
    return new ObjectRefImpl(target, key);
  }
  function toRefs(v) {
    const result = Array.isArray(v) ? [] : {};
    for (const key in v) {
      result[key] = toRef(v, key);
    }
    return result;
  }
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=reactivity.iife.js.map
