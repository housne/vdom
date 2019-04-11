import {
  PatchType,
  Patch,
  ElementPatchType,
  PropsPatchType,
  ElementPatch,
  PropsPatch,
  Type
} from "./patch.model";

export function patch(
  el: HTMLElement,
  patchData: Patch
): HTMLElement | Text | void {
  if (!patchData) {
    return el;
  }
  if (patchData.type === Type.ELEMENT) {
    const { patchType, node } = patchData;
    if (patchType === ElementPatchType.REPLACE) {
      el.replaceWith(node);
      return node;
    }
    if (patchType === ElementPatchType.REMOVE) {
      el.remove();
      return undefined;
    }
  }
  if (patchData.type === Type.PROPS) {
    const { patchType, key, value } = patchData;
    if (patchType === PropsPatchType.ADD) {
      el.setAttribute(key, value);
    }
    if (patchType === PropsPatchType.REMOVE) {
      el.removeAttribute(key);
    }
    return el;
  }
}
