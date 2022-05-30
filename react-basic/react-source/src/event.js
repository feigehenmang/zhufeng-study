import { updateQueue } from "./Component";

export function addEvent(dom, eventType, handler) {
  let store = dom.store || (dom.store = {});
  store[eventType] = handler;
  if (!document[eventType]) {
    document[eventType] = dispatchEvent;
  }
}
// 事件委托函数
function dispatchEvent(event) {
  const { target, type } = event;
  const eventType = `on${type}`;
  const syntheticEvent = createSyntheticEvent(event);
  updateQueue.isBatchingUpdate = true;
  let current = target;
  while (current) {
    let store = current.store;
    let handler = store && store[eventType];
    handler && handler(syntheticEvent);
    if (syntheticEvent.isPropagationStopped) {
      break;
    }
    current = current.parentNode;
  }
  updateQueue.batchUpdate();
}
function createSyntheticEvent(event) {
  let syntheticEvent = {};
  for (let key in event) {
    //把原生事件上的属性拷贝到合成事件对象上去
    let value = event[key];
    if (typeof value === "function") value = value.bind(event);
    syntheticEvent[key] = event[key];
  }
  syntheticEvent.nativeEvent = event;
  syntheticEvent.isDefaultPrevented = false;
  syntheticEvent.isPropagationStopped = false;
  syntheticEvent.preventDefault = preventDefault;
  syntheticEvent.stopPropagation = stopPropagation;
  return syntheticEvent;
}

function preventDefault() {
  this.defaultPrevented = true;
  const event = this.nativeEvent;
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    //IE
    event.returnValue = false;
  }
  this.isDefaultPrevented = true;
}

function stopPropagation() {
  const event = this.nativeEvent;
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    //IE
    event.cancelBubble = true;
  }
  this.isPropagationStopped = true;
}
