import { VNode } from "./vnode.model";

export interface Props {
  [props: string]: any;
}

export type Component = (props: Props) => VNode;
