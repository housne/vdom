import { VNode } from "./vnode.model";

export enum ElementPatchType {
  REMOVE,
  INSERT,
  REPLACE
}

export enum PropsPatchType {
  ADD,
  REMOVE
}

export enum Type {
  ELEMENT,
  PROPS
}

export type PatchType = ElementPatchType | PropsPatchType;

export interface ElementPatch {
  type: Type.ELEMENT;
  patchType: ElementPatchType;
  node?: HTMLElement | Text;
}

export interface PropsPatch {
  type: Type.PROPS;
  patchType: PropsPatchType;
  key?: string;
  value?: string;
}

export type Patch = ElementPatch | PropsPatch | void;

export type PatchAction = (el: HTMLElement) => HTMLElement | Text | void;
