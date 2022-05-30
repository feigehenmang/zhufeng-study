import { compareTwoVDom, findDOM } from "./react-dom";
export const updateQueue = {
  isBatchingUpdate: false, // true 批量更新  false 正常更新
  updater: new Set(),
  batchUpdate() {
    updateQueue.isBatchingUpdate = false;
    updateQueue.updater.forEach((update) => {
      update.updateComponent();
    });
    updateQueue.updater.clear();
  },
};
export class Updater {
  constructor(instance) {
    this.classInstance = instance;
    this.pendStates = [];
    this.callbacks = [];
  }
  addState(partialState, callback) {
    this.pendStates.push(partialState);
    if (typeof callback === "function") {
      this.callbacks.push(callback);
    }
    this.emitUpdate();
  }
  emitUpdate() {
    if (updateQueue.isBatchingUpdate) {
      updateQueue.updater.add(this);
    } else {
      this.updateComponent();
    }
  }

  updateComponent() {
    const { classInstance, pendStates } = this;
    if (pendStates.length > 0) {
      shouldUpdate(classInstance, this.getState());
    }
  }

  getState() {
    let { classInstance, pendStates } = this;
    let { state } = classInstance;
    for (let i = 0; i < pendStates.length; i++) {
      let nextState = pendStates[i];
      if (typeof pendStates[i] === "function") {
        nextState = nextState(state);
      }
      //   console.log(state, nextState);
      state = { ...state, ...nextState };
    }
    pendStates.length = 0;
    return state;
  }
}

function shouldUpdate(instance, state) {
  instance.state = state;
  instance.forceUpdate();
}
export class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }
  setState(partialState, callback) {
    this.updater.addState(partialState, callback);
  }
  forceUpdate() {
    console.log("forceUpdate");
    let oldRenderVdom = this.oldRenderVdom;
    let oldDom = findDOM(oldRenderVdom);
    let newRenderDom = this.render();
    compareTwoVDom(oldDom.parentNode, oldRenderVdom, newRenderDom);
    this.oldRenderVdom = newRenderDom;
  }
}
