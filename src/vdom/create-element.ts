import { VNode, Properties } from "./vnode.model";
import { Component, Props } from "./component.model";

export function createElement(
  tagName: string | Component,
  properties: Properties | Props = {},
  ...children: VNode[]
): VNode {
  if (typeof tagName !== "string") {
    return tagName(properties as Props);
  }
  return {
    tag: tagName,
    properties,
    children
  };
}
