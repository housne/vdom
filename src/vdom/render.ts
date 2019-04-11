import { VNode } from "./vnode.model";

export function render(vNode?: VNode): HTMLElement | Text {
  if (!vNode) {
    return null;
  }
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }
  const el = document.createElement(vNode.tag);
  if (vNode.properties) {
    for (let prop in vNode.properties) {
      if (prop === "className") {
        el.setAttribute("class", vNode.properties[prop]);
      } else {
        el.setAttribute(prop, vNode.properties[prop]);
      }
    }
  }
  if (Array.isArray(vNode.children)) {
    vNode.children.map(render).forEach(el.appendChild.bind(el));
  } else {
    el.appendChild(render(vNode.children));
  }
  return el;
}
