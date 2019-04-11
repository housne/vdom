import zip from "lodash.zip";
import { VNode } from "./vnode.model";
import {
  Patch,
  ElementPatchType,
  PropsPatchType,
  Type,
  PatchAction
} from "./patch.model";
import { patch } from "./patch";
import { render } from "./render";
import { Properties } from "./vnode.model";

export function diff(oldVNode: VNode, newVNode: VNode): PatchAction {
  if (typeof oldVNode !== "string" && typeof newVNode !== "string") {
    if (newVNode.tag !== oldVNode.tag) {
      return createPatchAction({
        type: Type.ELEMENT,
        patchType: ElementPatchType.REPLACE,
        node: render(newVNode)
      });
    }
    if (!newVNode) {
      return createPatchAction({
        type: Type.ELEMENT,
        patchType: ElementPatchType.REMOVE
      });
    }
    if (!oldVNode && newVNode) {
      return createPatchAction({
        type: Type.ELEMENT,
        patchType: ElementPatchType.INSERT,
        node: render(newVNode)
      });
    }
    const patchProps = diffProps(oldVNode.properties, newVNode.properties);
    const patchChildren = diffChildren(oldVNode.children, newVNode.children);

    return (el: HTMLElement) => {
      patchProps(el);
      patchChildren(el);
      return el;
    };
  } else {
    if (oldVNode !== newVNode) {
      return createPatchAction({
        type: Type.ELEMENT,
        patchType: ElementPatchType.REPLACE,
        node: render(newVNode)
      });
    }
    return (el: HTMLElement) => el;
  }
}

function diffChildren(
  oldChildren: VNode[] = [],
  newChildren: VNode[] = []
): PatchAction {
  const patches: PatchAction[] = [];
  oldChildren.forEach((oldChild, i) => {
    const patch = diff(oldChild, newChildren[i]);
    patches.push(patch);
  });
  const newChildPatches: PatchAction[] = [];
  for (const newChild of newChildren.slice(oldChildren.length)) {
    const patch = diff(undefined, newChild);
    newChildPatches.push(patch);
  }
  return (el: HTMLElement) => {
    for (const [patch, child] of zip(patches, el.childNodes)) {
      patch(child as HTMLElement);
    }
    for (const patch of newChildPatches) {
      patch(el);
    }
    return el;
  };
}

function diffProps(
  oldProps: Properties = {},
  newProps: Properties = {}
): PatchAction {
  const patches: PatchAction[] = [];
  if (!oldProps) {
    oldProps = {};
  }
  if (!newProps) {
    newProps = {};
  }

  for (const [k, v] of Object.entries(newProps)) {
    patches.push(
      createPatchAction({
        type: Type.PROPS,
        patchType: PropsPatchType.ADD,
        key: k,
        value: v
      })
    );
  }

  for (const k in oldProps) {
    if (!(k in newProps)) {
      patches.push(
        createPatchAction({
          type: Type.PROPS,
          patchType: PropsPatchType.REMOVE,
          key: k
        })
      );
    }
  }

  return (el: HTMLElement) => {
    for (const patch of patches) {
      patch(el);
    }
  };
}

function createPatchAction(patchData: Patch): PatchAction {
  return (el: HTMLElement) => {
    return patch(el, patchData);
  };
}
