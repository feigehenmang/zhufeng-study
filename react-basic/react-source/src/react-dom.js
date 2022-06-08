import { REACT_FORWARD_REF, REACT_TEXT } from "./constants";
import { addEvent } from "./event";

function render(vdom, container) {
  mount(vdom, container);
}
function mount(vdom, container) {
  let newDom = createDom(vdom);
  container.appendChild(newDom);
}
function createDom(vdom) {
  const { type, props, ref } = vdom;
  let dom;
  if (type && type.$$typeof === REACT_FORWARD_REF) {
    return mountForwardRefComponent(vdom);
  } else if (type === REACT_TEXT) {
    dom = document.createTextNode(props);
  } else if (typeof type === "function") {
    if (type.isReactComponent) {
      return mountClassComponent(vdom);
    }
    return mountFunctionComponent(vdom);
  } else {
    dom = document.createElement(type);
  }

  if (props) {
    updateProps(dom, {}, props);
    if (typeof props.children == "object" && props.children.type) {
      mount(props.children, dom);
    } else if (Array.isArray(props.children)) {
      reconcileChildren(props.children, dom);
    }
  }
  vdom.dom = dom;
  if (ref) ref.current = dom;
  return dom;
}

function mountForwardRefComponent(vdom) {
  const { type, props, ref } = vdom;
  const renderVdom = type.render(props, ref);
  vdom.oldRenderVdom = renderVdom;
  return createDom(renderVdom);
}

function mountClassComponent(vdom) {
  let { type, props, ref } = vdom;
  let classInstance = new type(props);
  if (ref) ref.current = classInstance;
  let renderVdom = classInstance.render();
  classInstance.oldRenderVdom = renderVdom;
  let dom = createDom(renderVdom);
  return dom;
}
function mountFunctionComponent(vdom) {
  const { type, props, ref } = vdom;
  const dom = type(props);
  vdom.oldRenderVdom = dom;
  return createDom(dom);
}
function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === "children") {
      continue;
    } else if (key === "style") {
      let styleObj = newProps[key];
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (/^on[A-Z].*/.test(key)) {
      //   dom[key.toLowerCase()] = newProps[key];
      addEvent(dom, key.toLowerCase(), newProps[key]);
    } else {
      dom[key] = newProps[key];
    }
  }
  for (let key in oldProps) {
    if (!newProps.hasOwnProperty(key)) {
      dom[key] = null;
    }
  }
}
function reconcileChildren(childrenVdom, parentDOM) {
  for (let i = 0; i < childrenVdom.length; i++) {
    mount(childrenVdom[i], parentDOM);
  }
}

export function findDOM(vdom) {
  if (!vdom) return null;
  if (vdom.dom) {
    return vdom.dom;
  } else {
    let renderVdom = vdom.renderVdom;
    if (renderVdom) {
      return findDOM(renderVdom);
    }
  }
}
export function compareTwoVDom(parentDom, oldVdom, newVdom) {
  let oldDom = findDOM(oldVdom);
  let newDom = createDom(newVdom);
  parentDom.replaceChild(newDom, oldDom);
}
const ReactDOM = {
  render,
};
export default ReactDOM;
